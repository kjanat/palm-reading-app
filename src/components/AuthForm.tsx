'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Star, Moon } from 'lucide-react';

interface AuthFormProps {
    isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { signIn, signUp } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isLogin) {
                await signIn(email, password);
            } else {
                await signUp(email, password, displayName);
            }
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen mystical-bg flex items-center justify-center px-4">
            <div className="crystal-card w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center mb-4">
                        {isLogin ? (
                            <Moon className="h-10 w-10 text-mystical-gold" />
                        ) : (
                            <Star className="h-10 w-10 text-mystical-gold" />
                        )}
                    </div>
                    <h2 className="text-3xl font-mystical text-white">
                        {isLogin ? 'Welcome Back' : 'Begin Your Journey'}
                    </h2>
                    <p className="text-white/80 mt-2">
                        {isLogin 
                            ? 'Continue your mystical path' 
                            : 'Create your account to unlock the secrets of your palm'
                        }
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-6">
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div>
                            <label htmlFor="displayName" className="block text-white/90 text-sm font-medium mb-2">
                                Display Name
                            </label>
                            <input
                                type="text"
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-mystical-gold focus:border-transparent"
                                placeholder="Enter your mystical name"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-mystical-gold focus:border-transparent"
                            placeholder="your.email@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-white/90 text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-mystical-gold focus:border-transparent pr-12"
                                placeholder="Enter your secret passphrase"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full spiritual-button py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                {isLogin ? 'Signing In...' : 'Creating Account...'}
                            </div>
                        ) : (
                            isLogin ? 'Enter the Mystic Realm' : 'Begin Your Journey'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-white/70">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <a
                            href={isLogin ? '/signup' : '/login'}
                            className="text-mystical-gold hover:text-yellow-300 ml-2 font-medium"
                        >
                            {isLogin ? 'Start your journey' : 'Sign in here'}
                        </a>
                    </p>
                </div>

                {!isLogin && (
                    <div className="mt-6 text-center">
                        <div className="text-xs text-white/60">
                            ✨ Your first reading is completely free ✨
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
