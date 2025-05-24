'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import AuthForm from '../../components/AuthForm';
import { Eye, Star, Moon } from 'lucide-react';

const AuthPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loading } = useAuth();
    
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        const mode = searchParams.get('mode');
        setIsLogin(mode !== 'signup');
    }, [searchParams]);

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen mystical-bg flex items-center justify-center">
                <div className="text-center">
                    <Eye className="h-12 w-12 mx-auto mb-4 text-mystical-gold animate-pulse" />
                    <p className="text-white font-spiritual">Connecting to the mystical realm...</p>
                </div>
            </div>
        );
    }

    if (user) {
        return null;
    }

    return (
        <div className="min-h-screen mystical-bg flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Mystical Content */}
                <div className="text-center lg:text-left">
                    <div className="flex justify-center lg:justify-start items-center mb-6">
                        <Eye className="h-10 w-10 mr-3 text-mystical-gold" />
                        <h1 className="text-4xl font-mystical mystical-text">
                            Mystic Palm
                        </h1>
                    </div>
                    
                    <h2 className="text-3xl font-mystical mystical-text mb-6">
                        {isLogin ? 'Welcome Back, Seeker' : 'Begin Your Mystical Journey'}
                    </h2>
                    
                    <p className="text-xl font-spiritual text-white/90 mb-8 leading-relaxed">
                        {isLogin 
                            ? 'Return to discover more secrets hidden within your palms. The ancient wisdom awaits your presence.'
                            : 'Unlock the ancient secrets of palmistry with AI-powered readings that reveal your destiny, personality, and life path.'
                        }
                    </p>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-center lg:justify-start space-x-3">
                            <Star className="h-6 w-6 text-mystical-gold" />
                            <span className="font-spiritual text-white/80">AI-Powered Mystical Readings</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start space-x-3">
                            <Moon className="h-6 w-6 text-mystical-gold" />
                            <span className="font-spiritual text-white/80">Ancient Palmistry Wisdom</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start space-x-3">
                            <Eye className="h-6 w-6 text-mystical-gold" />
                            <span className="font-spiritual text-white/80">Personalized Spiritual Guidance</span>
                        </div>
                    </div>

                    {/* Social Proof */}
                    <div className="crystal-card bg-white/5 border-white/10">
                        <div className="text-center">
                            <div className="flex justify-center space-x-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-mystical-gold fill-current" />
                                ))}
                            </div>
                            <p className="font-spiritual text-white/80 text-sm">
                                "The most accurate palm reading I've ever received. Truly mystical!"
                            </p>
                            <p className="font-spiritual text-white/60 text-xs mt-1">
                                - Sarah M., Premium Member
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Auth Form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="crystal-card">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-mystical mystical-text mb-2">
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </h3>
                            <p className="font-spiritual text-white/70">
                                {isLogin 
                                    ? 'Continue your mystical journey'
                                    : 'Start your spiritual awakening'
                                }
                            </p>
                        </div>

                        <AuthForm isLogin={isLogin} />

                        <div className="mt-6 text-center">
                            <p className="font-spiritual text-white/70">
                                {isLogin ? "New to the mystical realm?" : "Already have an account?"}
                            </p>
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-mystical-gold hover:text-white transition-colors font-spiritual underline ml-1"
                            >
                                {isLogin ? 'Create your account' : 'Sign in here'}
                            </button>
                        </div>

                        {!isLogin && (
                            <div className="mt-6 p-4 bg-mystical-gold/10 rounded-lg border border-mystical-gold/20">
                                <p className="text-sm font-spiritual text-white/80 text-center">
                                    🌟 Get your first palm reading absolutely free when you sign up!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-6 text-center">
                        <p className="text-xs font-spiritual text-white/50 mb-2">
                            Trusted by thousands of spiritual seekers worldwide
                        </p>
                        <div className="flex justify-center space-x-6 opacity-50">
                            <div className="text-xs">🔒 Secure</div>
                            <div className="text-xs">⚡ Instant</div>
                            <div className="text-xs">🌙 Mystical</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
