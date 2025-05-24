'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Eye, 
    Camera, 
    Clock, 
    Crown, 
    Star, 
    Calendar,
    TrendingUp,
    Heart,
    Sparkles,
    User,
    Settings
} from 'lucide-react';

interface ReadingHistory {
    id: string;
    timestamp: string;
    imageUrl: string;
    type: 'basic' | 'premium' | 'deluxe';
    summary: string;
}

const DashboardPage: React.FC = () => {
    const { user, userProfile, loading } = useAuth();
    const router = useRouter();
    const [readingHistory, setReadingHistory] = useState<ReadingHistory[]>([]);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth?mode=login');
        }
    }, [user, loading, router]);

    // Mock reading history for demo - in real app, fetch from Firebase
    useEffect(() => {
        if (user) {
            setReadingHistory([
                {
                    id: '1',
                    timestamp: '2024-01-15T14:30:00Z',
                    imageUrl: '/api/placeholder/100/100',
                    type: 'basic',
                    summary: 'Your life line reveals strong vitality and determination...'
                },
                {
                    id: '2',
                    timestamp: '2024-01-10T09:15:00Z',
                    imageUrl: '/api/placeholder/100/100',
                    type: 'premium',
                    summary: 'Deep analysis of your heart line shows emotional depth...'
                }
            ]);
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen mystical-bg flex items-center justify-center">
                <div className="text-center">
                    <Eye className="h-12 w-12 mx-auto mb-4 text-mystical-gold animate-pulse" />
                    <p className="text-white font-spiritual">Loading your mystical dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const formatDate = (timestamp: string) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getReadingTypeIcon = (type: string) => {
        switch (type) {
            case 'basic': return <Star className="h-4 w-4 text-gray-400" />;
            case 'premium': return <Crown className="h-4 w-4 text-mystical-gold" />;
            case 'deluxe': return <Sparkles className="h-4 w-4 text-purple-400" />;
            default: return <Star className="h-4 w-4" />;
        }
    };

    return (
        <div className="min-h-screen mystical-bg">
            {/* Header */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="crystal-card p-3">
                            <User className="h-8 w-8 text-mystical-gold" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-mystical mystical-text">
                                Welcome back, {userProfile?.displayName || user.email}
                            </h1>
                            <p className="text-white/70 font-spiritual">
                                {userProfile?.isPremium ? (
                                    <span className="flex items-center">
                                        <Crown className="h-4 w-4 mr-1 text-mystical-gold" />
                                        Premium Member
                                    </span>
                                ) : (
                                    <span>Free Account - Upgrade for unlimited readings</span>
                                )}
                            </p>
                        </div>
                    </div>
                    <Link 
                        href="/reading" 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-spiritual hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center space-x-2"
                    >
                        <Camera className="h-5 w-5" />
                        <span>New Reading</span>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="crystal-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/70 font-spiritual">Total Readings</p>
                                <p className="text-2xl font-mystical text-mystical-gold">
                                    {readingHistory.length}
                                </p>
                            </div>
                            <Eye className="h-8 w-8 text-mystical-gold" />
                        </div>
                    </div>

                    <div className="crystal-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/70 font-spiritual">Free Readings Left</p>
                                <p className="text-2xl font-mystical text-mystical-gold">
                                    {userProfile?.isPremium ? '∞' : Math.max(0, 1 - (userProfile?.readingsUsed || 0))}
                                </p>
                            </div>
                            <Star className="h-8 w-8 text-mystical-gold" />
                        </div>
                    </div>

                    <div className="crystal-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/70 font-spiritual">Member Since</p>
                                <p className="text-sm font-spiritual text-mystical-gold">
                                    {userProfile?.createdAt ? 
                                        formatDate(new Date(userProfile.createdAt).toISOString()) : 
                                        'Recently'
                                    }
                                </p>
                            </div>
                            <Calendar className="h-8 w-8 text-mystical-gold" />
                        </div>
                    </div>

                    <div className="crystal-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/70 font-spiritual">Spiritual Growth</p>
                                <p className="text-2xl font-mystical text-mystical-gold">
                                    {readingHistory.length * 25}%
                                </p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-mystical-gold" />
                        </div>
                    </div>
                </div>

                {/* Reading History */}
                <div className="crystal-card">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-mystical mystical-text">Your Reading History</h2>
                        <Clock className="h-6 w-6 text-mystical-gold" />
                    </div>

                    {readingHistory.length === 0 ? (
                        <div className="text-center py-12">
                            <Eye className="h-16 w-16 mx-auto mb-4 text-white/30" />
                            <h3 className="text-lg font-mystical text-white/70 mb-2">
                                No readings yet
                            </h3>
                            <p className="text-white/50 font-spiritual mb-6">
                                Start your mystical journey with your first palm reading
                            </p>
                            <Link 
                                href="/reading"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-spiritual hover:from-purple-700 hover:to-pink-700 transition-all inline-flex items-center space-x-2"
                            >
                                <Camera className="h-5 w-5" />
                                <span>Get Your First Reading</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {readingHistory.map((reading) => (
                                <div key={reading.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                                    <div className="flex items-start space-x-4">
                                        <img 
                                            src={reading.imageUrl} 
                                            alt="Palm reading" 
                                            className="w-16 h-16 rounded-lg object-cover border border-white/20"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                {getReadingTypeIcon(reading.type)}
                                                <span className="text-sm font-spiritual text-white/70 capitalize">
                                                    {reading.type} Reading
                                                </span>
                                                <span className="text-sm text-white/50">
                                                    {formatDate(reading.timestamp)}
                                                </span>
                                            </div>
                                            <p className="text-white font-spiritual line-clamp-2">
                                                {reading.summary}
                                            </p>
                                        </div>
                                        <button className="text-mystical-gold hover:text-white transition-colors">
                                            <Eye className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Upgrade Section for Free Users */}
                {!userProfile?.isPremium && (
                    <div className="mt-8 crystal-card bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-400/30">
                        <div className="text-center">
                            <Crown className="h-12 w-12 mx-auto mb-4 text-mystical-gold" />
                            <h3 className="text-xl font-mystical mystical-text mb-2">
                                Unlock Your Full Potential
                            </h3>
                            <p className="text-white/80 font-spiritual mb-6">
                                Upgrade to Premium for unlimited readings, detailed analysis, 
                                and exclusive mystical insights.
                            </p>
                            <Link 
                                href="/pricing"
                                className="bg-gradient-to-r from-mystical-gold to-yellow-500 text-purple-900 px-8 py-3 rounded-lg font-spiritual hover:from-yellow-400 hover:to-mystical-gold transition-all transform hover:scale-105 inline-flex items-center space-x-2"
                            >
                                <Sparkles className="h-5 w-5" />
                                <span>Upgrade Now</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;