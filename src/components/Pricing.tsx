'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PRICING_PLANS } from '../lib/stripe';
import { Check, Crown, Sparkles, Zap } from 'lucide-react';

interface PricingProps {
  onSelectPlan?: (planId: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const { user, userProfile } = useAuth();

  const handleSelectPlan = async (planId: string) => {
    if (!user) return;
    
    setLoading(planId);
    
    try {
      if (onSelectPlan) {
        onSelectPlan(planId);
      } else {
        // Default behavior - redirect to checkout
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId,
            userId: user.uid,
            email: user.email,
          }),
        });

        const { url } = await response.json();
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error selecting plan:', error);
    } finally {
      setLoading(null);
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free':
        return <Sparkles className="h-8 w-8" />;
      case 'premium':
        return <Crown className="h-8 w-8" />;
      case 'deluxe':
        return <Zap className="h-8 w-8" />;
      default:
        return <Sparkles className="h-8 w-8" />;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'free':
        return 'from-purple-500 to-blue-500';
      case 'premium':
        return 'from-purple-600 to-pink-600';
      case 'deluxe':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-purple-500 to-blue-500';
    }
  };

  const isCurrentPlan = (planId: string) => {
    if (planId === 'free') {
      return !userProfile?.isPremium;
    }
    // In a real app, you'd check the user's current subscription
    return false;
  };

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-100 mb-4">
            Choose Your Spiritual Journey
          </h2>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Unlock the mysteries of your palm with our AI-powered readings. 
            From free insights to comprehensive spiritual guidance.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.id === 'premium';
            const isCurrent = isCurrentPlan(plan.id);
            
            return (
              <div
                key={plan.id}
                className={`relative bg-purple-800/30 rounded-2xl p-8 border-2 transition-all duration-200 hover:scale-105 ${
                  isPopular
                    ? 'border-purple-400 shadow-lg shadow-purple-400/20'
                    : 'border-purple-700/50 hover:border-purple-500'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${getPlanColor(plan.id)} mb-4`}>
                    <div className="text-white">
                      {getPlanIcon(plan.id)}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-100 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-white mb-1">
                    ${plan.price}
                    {plan.price > 0 && <span className="text-lg text-purple-300">/month</span>}
                  </div>
                  {plan.price === 0 && (
                    <p className="text-purple-300">Forever free</p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-purple-200">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrent || loading === plan.id || (plan.id === 'free' && !user)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    isCurrent
                      ? 'bg-green-600 text-white cursor-default'
                      : isPopular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  } ${
                    loading === plan.id ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading === plan.id ? (
                    'Loading...'
                  ) : isCurrent ? (
                    'Current Plan'
                  ) : plan.id === 'free' ? (
                    'Get Started Free'
                  ) : (
                    `Upgrade to ${plan.name}`
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-purple-300 mb-4">
            All plans include secure payments and can be canceled anytime.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-purple-400">
            <span>✨ 30-day money-back guarantee</span>
            <span>🔒 Secure & encrypted</span>
            <span>📱 Works on all devices</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
