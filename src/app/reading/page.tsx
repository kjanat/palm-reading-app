'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import ImageUpload from '../../components/ImageUpload';
import PalmReading from '../../components/PalmReading';
import { analyzePalmImage, PalmReadingResult } from '../../lib/palmAnalysis';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Loader2, Hand, Sparkles, AlertTriangle } from 'lucide-react';

const ReadingPage: React.FC = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [reading, setReading] = useState<PalmReadingResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user, userProfile, updateUserProfile } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleImageUpload = async (imageUrl: string) => {
        setUploadedImageUrl(imageUrl);
        setError(null);
        
        // Check if user has remaining free readings
        if (!userProfile?.isPremium && (userProfile?.readingsUsed || 0) >= (userProfile?.maxFreeReadings || 1)) {
            setError('You have used all your free readings. Please upgrade to premium for unlimited readings.');
            return;
        }

        setIsAnalyzing(true);

        try {
            // Analyze the palm image
            const result = await analyzePalmImage(imageUrl);
            setReading(result);

            // Save the reading to Firestore
            await addDoc(collection(db, 'readings'), {
                userId: user?.uid,
                imageUrl,
                reading: result,
                createdAt: new Date(),
                isPremium: userProfile?.isPremium || false
            });

            // Update user's reading count
            if (!userProfile?.isPremium) {
                await updateUserProfile({
                    readingsUsed: (userProfile?.readingsUsed || 0) + 1
                });
            }

        } catch (err) {
            console.error('Error analyzing palm:', err);
            setError('Failed to analyze your palm. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const canUseFreeReading = userProfile?.isPremium || 
                             (userProfile?.readingsUsed || 0) < (userProfile?.maxFreeReadings || 1);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin h-8 w-8 text-purple-300" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <Hand className="h-12 w-12 text-purple-300 mr-4" />
                        <h1 className="text-4xl font-bold text-purple-100">
                            Mystical Palm Reading
                        </h1>
                        <Hand className="h-12 w-12 text-purple-300 ml-4 scale-x-[-1]" />
                    </div>
                    <p className="text-purple-300 text-lg mb-4">
                        Discover the secrets hidden in your palm through ancient wisdom and modern AI
                    </p>
                    
                    {/* Reading Count Display */}
                    <div className="inline-flex items-center bg-purple-800/30 rounded-lg px-4 py-2">
                        <Sparkles className="h-4 w-4 text-purple-300 mr-2" />
                        {userProfile?.isPremium ? (
                            <span className="text-purple-200">Premium Member - Unlimited Readings</span>
                        ) : (
                            <span className="text-purple-200">
                                Free Readings: {(userProfile?.readingsUsed || 0)} / {userProfile?.maxFreeReadings || 1}
                            </span>
                        )}
                    </div>
                </div>

                {/* Warning for non-premium users who have used their free reading */}
                {!canUseFreeReading && (
                    <div className="bg-amber-900/50 border border-amber-500 rounded-lg p-6 mb-8">
                        <div className="flex items-center mb-3">
                            <AlertTriangle className="h-6 w-6 text-amber-400 mr-3" />
                            <h3 className="text-lg font-semibold text-amber-100">
                                Free Reading Limit Reached
                            </h3>
                        </div>
                        <p className="text-amber-200 mb-4">
                            You've used your free reading. Upgrade to premium for unlimited palm readings, 
                            detailed analysis, compatibility readings, and more spiritual insights.
                        </p>
                        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                            Upgrade to Premium
                        </button>
                    </div>
                )}

                {/* Main Content */}
                {!reading ? (
                    <div className="space-y-8">
                        {/* Upload Section */}
                        <div className="bg-purple-800/20 rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-purple-100 mb-6 text-center">
                                Upload Your Palm Image
                            </h2>
                            
                            {canUseFreeReading ? (
                                <>
                                    <ImageUpload onImageUpload={handleImageUpload} />
                                    
                                    {/* Tips */}
                                    <div className="mt-6 bg-purple-700/30 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-purple-100 mb-3">
                                            📸 Tips for Best Results:
                                        </h3>
                                        <ul className="text-purple-200 space-y-1 text-sm">
                                            <li>• Use good lighting - natural light works best</li>
                                            <li>• Keep your palm flat and open</li>
                                            <li>• Take the photo straight on, not at an angle</li>
                                            <li>• Make sure all major lines are clearly visible</li>
                                            <li>• Use your dominant hand for the most accurate reading</li>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <Hand className="h-16 w-16 text-purple-400 mx-auto mb-4 opacity-50" />
                                    <p className="text-purple-300">
                                        Upgrade to premium to continue your spiritual journey
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Analysis in Progress */}
                        {isAnalyzing && (
                            <div className="bg-purple-800/30 rounded-xl p-8 text-center">
                                <Loader2 className="animate-spin h-12 w-12 text-purple-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-purple-100 mb-2">
                                    Analyzing Your Palm...
                                </h3>
                                <p className="text-purple-300">
                                    Our spiritual AI is reading the energy patterns in your palm. 
                                    This may take a moment.
                                </p>
                            </div>
                        )}

                        {/* Error Display */}
                        {error && (
                            <div className="bg-red-900/50 border border-red-500 rounded-lg p-6">
                                <div className="flex items-center mb-2">
                                    <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                                    <h3 className="text-lg font-semibold text-red-100">Error</h3>
                                </div>
                                <p className="text-red-200">{error}</p>
                                <button 
                                    onClick={() => {
                                        setError(null);
                                        setUploadedImageUrl(null);
                                    }}
                                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Reading Results */
                    <div className="space-y-8">
                        <div className="text-center">
                            <button
                                onClick={() => {
                                    setReading(null);
                                    setUploadedImageUrl(null);
                                    setError(null);
                                }}
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Get Another Reading
                            </button>
                        </div>
                        
                        <PalmReading 
                            reading={reading} 
                            isPreview={!userProfile?.isPremium}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReadingPage;