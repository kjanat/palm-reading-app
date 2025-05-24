'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { Eye, Star, Moon, Sparkles } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user, userProfile } = useAuth();

  return (
    <div className="min-h-screen mystical-bg">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <Eye className="h-12 w-12 mr-4 text-mystical-gold" />
            <h1 className="text-6xl font-mystical mystical-text">
              Mystic Palm Readings
            </h1>
            <Eye className="h-12 w-12 ml-4 text-mystical-gold" />
          </div>
          <p className="text-xl font-spiritual text-white/90 max-w-3xl mx-auto leading-relaxed">
            Unlock the ancient secrets hidden within your palms. Our AI-powered mystical readings 
            reveal your destiny, personality, and life path through the sacred art of palmistry.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="crystal-card text-center">
            <Star className="h-12 w-12 mx-auto mb-4 text-mystical-gold" />
            <h3 className="text-xl font-mystical mb-2">AI-Powered Readings</h3>
            <p className="text-white/80">
              Advanced AI analyzes your palm lines, mounts, and patterns to provide 
              accurate mystical insights.
            </p>
          </div>
          
          <div className="crystal-card text-center">
            <Moon className="h-12 w-12 mx-auto mb-4 text-mystical-gold" />
            <h3 className="text-xl font-mystical mb-2">Ancient Wisdom</h3>
            <p className="text-white/80">
              Our readings are based on thousands of years of palmistry tradition 
              and mystical knowledge.
            </p>
          </div>
          
          <div className="crystal-card text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-mystical-gold" />
            <h3 className="text-xl font-mystical mb-2">Premium Features</h3>
            <p className="text-white/80">
              Unlock compatibility readings, detailed analysis, and personalized 
              spiritual guidance.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          {user ? (
            <div className="space-y-4">
              <h2 className="text-3xl font-mystical mb-4">
                Welcome back, {userProfile?.displayName || 'Seeker'}
              </h2>
              <div className="flex justify-center space-x-6">
                <Link href="/dashboard">
                  <button className="spiritual-button">
                    Your Dashboard
                  </button>
                </Link>
                <Link href="/reading">
                  <button className="spiritual-button">
                    New Reading
                  </button>
                </Link>
              </div>
              {userProfile?.isPremium && (
                <div className="premium-badge mt-4">
                  ✨ Premium Member ✨
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-3xl font-mystical mb-4">
                Begin Your Mystical Journey
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Join thousands of seekers who have discovered their destiny through palm reading
              </p>
              <div className="flex justify-center space-x-6">
                <Link href="/signup">
                  <button className="spiritual-button">
                    Start Your Reading
                  </button>
                </Link>
                <Link href="/login">
                  <button className="spiritual-button bg-gradient-to-r from-mystical-gold to-yellow-400 text-mystical-bronze">
                    Sign In
                  </button>
                </Link>
              </div>
              <div className="text-sm text-white/70 mt-4">
                Your first reading is completely free ✨
              </div>
            </div>
          )}
        </div>

        {/* Pricing Preview */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-mystical mb-8">Choose Your Path</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="crystal-card">
              <h4 className="text-xl font-mystical mb-4">Free Reading</h4>
              <div className="text-3xl font-bold mb-4">$0</div>
              <ul className="text-white/80 space-y-2 mb-6">
                <li>✓ One palm reading</li>
                <li>✓ Basic life line analysis</li>
                <li>✓ Personality insights</li>
                <li>✗ Compatibility readings</li>
                <li>✗ Detailed reports</li>
              </ul>
              <button className="spiritual-button w-full">Get Started</button>
            </div>
            
            <div className="crystal-card relative">
              <div className="premium-badge absolute -top-3 left-1/2 transform -translate-x-1/2">
                Most Popular
              </div>
              <h4 className="text-xl font-mystical mb-4">Premium Mystical</h4>
              <div className="text-3xl font-bold mb-4">$9.99<span className="text-sm">/month</span></div>
              <ul className="text-white/80 space-y-2 mb-6">
                <li>✓ Unlimited palm readings</li>
                <li>✓ Detailed life analysis</li>
                <li>✓ Compatibility with others</li>
                <li>✓ Love & relationship insights</li>
                <li>✓ Career guidance</li>
                <li>✓ Health indicators</li>
              </ul>
              <button className="spiritual-button w-full bg-gradient-to-r from-mystical-gold to-yellow-400 text-mystical-bronze">
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;