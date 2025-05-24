'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  isPremium: boolean;
  subscriptionTier?: 'free' | 'premium' | 'deluxe';
  readingsUsed: number;
  maxFreeReadings: number;
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: string;
  createdAt: Date;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await loadUserProfile(user.uid);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadUserProfile = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserProfile({
          uid,
          email: data.email,
          displayName: data.displayName,
          isPremium: data.isPremium || false,
          subscriptionTier: data.subscriptionTier || 'free',
          readingsUsed: data.readingsUsed || 0,
          maxFreeReadings: data.maxFreeReadings || 1,
          stripeCustomerId: data.stripeCustomerId,
          subscriptionId: data.subscriptionId,
          subscriptionStatus: data.subscriptionStatus,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user profile document
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: displayName || '',
        isPremium: false,
        subscriptionTier: 'free',
        readingsUsed: 0,
        maxFreeReadings: 1,
        createdAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
      setUserProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
