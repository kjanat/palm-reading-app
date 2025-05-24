'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { Check, Crown, Star, Sparkles, Eye, Moon } from 'lucide-react';

const PricingPage: React.FC = () => {
    const { user, userProfile } = useAuth();

    const handleUpgrade = async (priceId: string) => {
        if (!user) {
            // Redirect to auth if not logged in
            window.location.href = '/auth?mode=signup';
            return;
        }

        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: priceId,
                    userId: user.uid,
                }),
            });

            const { sessionId } = await response.json();

            // Redirect to Stripe Checkout
            const stripe = (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    const plans = [
        {
            id: 'free',
            name: 'Mystic Seeker',
            price: 'Free',
            period: '',
            description: 'Begin your spiritual journey',
            features: [
                '1 Free palm reading',
                'Basic life line analysis',
                'General personality insights',
                'Limited spiritual guidance',
                'Community access'
            ],
            icon: <Star className="h-8 w-8" />,
            buttonText: 'Current Plan',
            priceId: null,
            popular: false,
            current: !userProfile?.isPremium
        },
        {
            id: 'premium',
            name: 'Mystic Oracle',
            price: '$9.99',
            period: '/month',
            description: 'Unlock deeper mystical insights',
            features: [
                'Unlimited palm readings',
                'Detailed line analysis (Life, Heart, Head)',
                'Mount interpretations',
                'Personality & destiny insights',
                'Love compatibility readings',
                'Premium spiritual guidance',
                'Reading history & tracking',
                'Priority support'
            ],
            icon: <Crown className="h-8 w-8" />,
            buttonText: 'Upgrade to Oracle',
            priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
            popular: true,
            current: userProfile?.isPremium && userProfile?.subscriptionTier === 'premium'
        },
        {
            id: 'deluxe',
            name: 'Mystic Master',
            price: '$19.99',
            period: '/month',
            description: 'Master the ancient arts',
            features: [
                'Everything in Mystic Oracle',
                'Advanced palmistry techniques',
                'Career & wealth predictions',
                'Health & wellness insights',
                'Spiritual awakening guidance',
                'Chakra alignment readings',
                'Monthly mystical consultations',
                'Exclusive master community',
                'Custom ritual recommendations'
            ],
            icon: <Sparkles className="h-8 w-8" />,
            buttonText: 'Become a Master',
            priceId: process.env.NEXT_PUBLIC_STRIPE_DELUXE_PRICE_ID,
            popular: false,
            current: userProfile?.isPremium && userProfile?.subscriptionTier === 'deluxe'
        }
    ];

    return (
        <div className="min-h-screen mystical-bg">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex justify-center items-center mb-6">
                        <Moon className="h-8 w-8 mr-3 text-mystical-gold" />
                        <h1 className="text-4xl font-mystical mystical-text">
                            Choose Your Mystical Path
                        </h1>
                        <Moon className="h-8 w-8 ml-3 text-mystical-gold" />
                    </div>
                    <p className="text-xl font-spiritual text-white/90 max-w-3xl mx-auto">
                        Select the perfect plan to unlock your destiny and embrace the ancient wisdom of palmistry
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan) => (
                        <div 
                            key={plan.id}
                            className={`relative crystal-card ${
                                plan.popular 
                                    ? 'ring-2 ring-mystical-gold shadow-lg shadow-mystical-gold/20' 
                                    : ''
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-gradient-to-r from-mystical-gold to-yellow-500 text-purple-900 px-4 py-1 rounded-full text-sm font-spiritual">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <div className="flex justify-center mb-4 text-mystical-gold">
                                    {plan.icon}
                                </div>
                                <h3 className="text-2xl font-mystical mystical-text mb-2">
                                    {plan.name}
                                </h3>
                                <p className="text-white/70 font-spiritual mb-4">
                                    {plan.description}
                                </p>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-4xl font-mystical text-mystical-gold">
                                        {plan.price}
                                    </span>
                                    <span className="text-white/70 font-spiritual ml-1">
                                        {plan.period}
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="h-5 w-5 text-mystical-gold mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-white font-spiritual text-sm">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => plan.priceId && handleUpgrade(plan.priceId)}
                                disabled={plan.current || !plan.priceId}
                                className={`w-full py-3 px-6 rounded-lg font-spiritual transition-all transform hover:scale-105 ${
                                    plan.current
                                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                        : plan.popular
                                        ? 'bg-gradient-to-r from-mystical-gold to-yellow-500 text-purple-900 hover:from-yellow-400 hover:to-mystical-gold'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                                }`}
                            >
                                {plan.current ? 'Current Plan' : plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-mystical mystical-text text-center mb-12">
                        Mystical Questions & Ancient Answers
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="crystal-card">
                            <h3 className="text-lg font-mystical text-mystical-gold mb-2">
                                How accurate are the AI palm readings?
                            </h3>
                            <p className="text-white/80 font-spiritual">
                                Our AI combines thousands of years of palmistry wisdom with modern machine learning. 
                                While we strive for accuracy, remember that palm reading is a spiritual art that 
                                offers guidance rather than absolute predictions.
                            </p>
                        </div>

                        <div className="crystal-card">
                            <h3 className="text-lg font-mystical text-mystical-gold mb-2">
                                Can I cancel my subscription anytime?
                            </h3>
                            <p className="text-white/80 font-spiritual">
                                Yes, you can cancel your subscription at any time. Your premium features will 
                                remain active until the end of your current billing period.
                            </p>
                        </div>

                        <div className="crystal-card">
                            <h3 className="text-lg font-mystical text-mystical-gold mb-2">
                                What makes premium readings different?
                            </h3>
                            <p className="text-white/80 font-spiritual">
                                Premium readings include detailed analysis of all major palm lines, mounts, 
                                and patterns. You'll also receive compatibility insights, spiritual guidance, 
                                and access to our exclusive mystic community.
                            </p>
                        </div>

                        <div className="crystal-card">
                            <h3 className="text-lg font-mystical text-mystical-gold mb-2">
                                Is my palm photo data secure?
                            </h3>
                            <p className="text-white/80 font-spiritual">
                                Absolutely. We use enterprise-grade security to protect your images and personal data. 
                                Your photos are encrypted and stored securely, and we never share your information 
                                with third parties.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <div className="crystal-card bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-400/30">
                        <Eye className="h-12 w-12 mx-auto mb-4 text-mystical-gold" />
                        <h3 className="text-2xl font-mystical mystical-text mb-4">
                            Ready to Discover Your Destiny?
                        </h3>
                        <p className="text-white/80 font-spiritual mb-6">
                            Join thousands of seekers who have unlocked the mysteries of their palms
                        </p>
                        <Link 
                            href="/reading"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-spiritual hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 inline-block"
                        >
                            Start Your Journey
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
