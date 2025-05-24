'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, User, LogOut, Crown, Home, Camera, DollarSign, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
    const { user, userProfile, signOut } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut();
            setIsMobileMenuOpen(false);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="w-full bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                        <Eye className="h-8 w-8 text-mystical-gold" />
                        <span className="text-xl font-mystical text-white">Mystic Palm</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="flex items-center space-x-1 text-white hover:text-mystical-gold transition-colors">
                            <Home className="h-4 w-4" />
                            <span className="font-spiritual">Home</span>
                        </Link>
                        
                        {user ? (
                            <>
                                <Link href="/dashboard" className="flex items-center space-x-1 text-white hover:text-mystical-gold transition-colors">
                                    <User className="h-4 w-4" />
                                    <span className="font-spiritual">Dashboard</span>
                                </Link>
                                <Link href="/reading" className="flex items-center space-x-1 text-white hover:text-mystical-gold transition-colors">
                                    <Camera className="h-4 w-4" />
                                    <span className="font-spiritual">New Reading</span>
                                </Link>
                                
                                {!userProfile?.isPremium && (
                                    <Link href="/pricing" className="flex items-center space-x-1 text-mystical-gold hover:text-white transition-colors">
                                        <Crown className="h-4 w-4" />
                                        <span className="font-spiritual">Upgrade</span>
                                    </Link>
                                )}
                                
                                {/* Premium Badge */}
                                {userProfile?.isPremium && (
                                    <div className="flex items-center space-x-1 text-mystical-gold bg-mystical-gold/10 px-3 py-1 rounded-full border border-mystical-gold/20">
                                        <Crown className="h-4 w-4" />
                                        <span className="text-sm font-spiritual">Premium</span>
                                    </div>
                                )}
                                
                                {/* User Menu */}
                                <div className="flex items-center space-x-4 ml-4">
                                    <span className="text-white/80 text-sm font-spiritual">
                                        {userProfile?.displayName || user.email?.split('@')[0]}
                                    </span>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center space-x-1 text-white hover:text-red-300 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span className="font-spiritual">Sign Out</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/pricing" className="flex items-center space-x-1 text-white hover:text-mystical-gold transition-colors">
                                    <DollarSign className="h-4 w-4" />
                                    <span className="font-spiritual">Pricing</span>
                                </Link>
                                <Link href="/auth?mode=login" className="text-white hover:text-mystical-gold transition-colors font-spiritual">
                                    Sign In
                                </Link>
                                <Link 
                                    href="/auth?mode=signup" 
                                    className="bg-gradient-to-r from-mystical-gold to-yellow-500 text-purple-900 px-4 py-2 rounded-lg font-spiritual hover:from-yellow-400 hover:to-mystical-gold transition-all transform hover:scale-105"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button 
                            onClick={toggleMobileMenu}
                            className="text-white hover:text-mystical-gold transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
                        <div className="flex flex-col space-y-4">
                            <Link 
                                href="/" 
                                className="flex items-center space-x-2 text-white hover:text-mystical-gold transition-colors"
                                onClick={closeMobileMenu}
                            >
                                <Home className="h-4 w-4" />
                                <span className="font-spiritual">Home</span>
                            </Link>
                            
                            {user ? (
                                <>
                                    <Link 
                                        href="/dashboard" 
                                        className="flex items-center space-x-2 text-white hover:text-mystical-gold transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        <User className="h-4 w-4" />
                                        <span className="font-spiritual">Dashboard</span>
                                    </Link>
                                    <Link 
                                        href="/reading" 
                                        className="flex items-center space-x-2 text-white hover:text-mystical-gold transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        <Camera className="h-4 w-4" />
                                        <span className="font-spiritual">New Reading</span>
                                    </Link>
                                    
                                    {!userProfile?.isPremium && (
                                        <Link 
                                            href="/pricing" 
                                            className="flex items-center space-x-2 text-mystical-gold hover:text-white transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            <Crown className="h-4 w-4" />
                                            <span className="font-spiritual">Upgrade to Premium</span>
                                        </Link>
                                    )}
                                    
                                    <div className="pt-2 border-t border-white/10">
                                        <p className="text-white/80 text-sm font-spiritual mb-2">
                                            {userProfile?.displayName || user.email}
                                            {userProfile?.isPremium && (
                                                <span className="ml-2 text-mystical-gold">
                                                    <Crown className="h-3 w-3 inline" /> Premium
                                                </span>
                                            )}
                                        </p>
                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center space-x-2 text-white hover:text-red-300 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span className="font-spiritual">Sign Out</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        href="/pricing" 
                                        className="flex items-center space-x-2 text-white hover:text-mystical-gold transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        <DollarSign className="h-4 w-4" />
                                        <span className="font-spiritual">Pricing</span>
                                    </Link>
                                    <Link 
                                        href="/auth?mode=login" 
                                        className="text-white hover:text-mystical-gold transition-colors font-spiritual"
                                        onClick={closeMobileMenu}
                                    >
                                        Sign In
                                    </Link>
                                    <Link 
                                        href="/auth?mode=signup" 
                                        className="bg-gradient-to-r from-mystical-gold to-yellow-500 text-purple-900 px-4 py-2 rounded-lg font-spiritual hover:from-yellow-400 hover:to-mystical-gold transition-all text-center"
                                        onClick={closeMobileMenu}
                                    >
                                        Get Started Free
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;

export default Navigation;