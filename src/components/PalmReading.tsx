'use client';

import React, { useState } from 'react';
import { PalmReadingResult } from '../lib/palmAnalysis';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  Brain, 
  Zap, 
  Star, 
  Sparkles, 
  Eye,
  Crown,
  Moon,
  Sun
} from 'lucide-react';

interface PalmReadingProps {
  reading: PalmReadingResult;
  isPreview?: boolean;
}

const PalmReading: React.FC<PalmReadingProps> = ({ reading, isPreview = false }) => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const isPremiumUser = userProfile?.isPremium || false;
  const shouldBlurContent = isPreview && !isPremiumUser;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'lines', label: 'Palm Lines', icon: Zap },
    { id: 'mounts', label: 'Mounts', icon: Crown },
    { id: 'guidance', label: 'Guidance', icon: Star },
    { id: 'spiritual', label: 'Spiritual', icon: Moon }
  ];

  const LineAnalysis = ({ line, title, icon: Icon }: { line: any, title: string, icon: any }) => (
    <div className="bg-purple-800/30 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <Icon className="h-5 w-5 text-purple-300 mr-2" />
        <h3 className="text-lg font-semibold text-purple-100">{title}</h3>
        <div className="ml-auto flex items-center">
          <span className="text-sm text-purple-300">Strength: </span>
          <div className="flex ml-2">
            {[...Array(10)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${
                  i < line.score ? 'text-yellow-400 fill-current' : 'text-gray-600'
                }`} 
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-purple-200 mb-2">{line.description}</p>
      <p className="text-purple-100 italic">{line.interpretation}</p>
    </div>
  );

  const PremiumBlur = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      {shouldBlurContent && (
        <div className="absolute inset-0 bg-purple-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <Crown className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-purple-100 font-medium">Premium Feature</p>
            <p className="text-purple-300 text-sm">Upgrade to unlock detailed insights</p>
          </div>
        </div>
      )}
      <div className={shouldBlurContent ? 'filter blur-sm' : ''}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-purple-300 mr-3" />
          <h1 className="text-3xl font-bold text-purple-100">Your Mystical Palm Reading</h1>
          <Sparkles className="h-8 w-8 text-purple-300 ml-3" />
        </div>
        <p className="text-purple-300 text-lg">{reading.summary}</p>
        <div className="flex items-center justify-center mt-4">
          <span className="text-purple-300 mr-2">Reading Confidence:</span>
          <div className="flex items-center">
            <div className="w-32 bg-purple-800 rounded-full h-2 mr-2">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full" 
                style={{ width: `${reading.confidence}%` }}
              ></div>
            </div>
            <span className="text-purple-100 font-semibold">{reading.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-8 space-x-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-800/30 text-purple-300 hover:bg-purple-700/30'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-purple-100 mb-6 flex items-center">
              <Eye className="h-6 w-6 mr-2" />
              Reading Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-800/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-100 mb-4">Personality Traits</h3>
                <div className="space-y-2">
                  {reading.personalityTraits.map((trait, index) => (
                    <div key={index} className="flex items-center">
                      <Sparkles className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-purple-200">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-purple-800/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-100 mb-4">Lucky Elements</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-purple-300 text-sm">Lucky Numbers:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {reading.luckyNumbers.map((num, index) => (
                        <span 
                          key={index} 
                          className="bg-purple-600 text-white px-2 py-1 rounded text-sm"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-purple-300 text-sm">Lucky Colors:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {reading.luckyColors.map((color, index) => (
                        <span 
                          key={index} 
                          className="bg-purple-600 text-white px-2 py-1 rounded text-sm"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lines' && (
          <PremiumBlur>
            <h2 className="text-2xl font-bold text-purple-100 mb-6 flex items-center">
              <Zap className="h-6 w-6 mr-2" />
              Palm Lines Analysis
            </h2>
            <LineAnalysis line={reading.lifeLine} title="Life Line" icon={Heart} />
            <LineAnalysis line={reading.heartLine} title="Heart Line" icon={Heart} />
            <LineAnalysis line={reading.headLine} title="Head Line" icon={Brain} />
            {reading.fateLine && (
              <LineAnalysis line={reading.fateLine} title="Fate Line" icon={Star} />
            )}
          </PremiumBlur>
        )}

        {activeTab === 'mounts' && (
          <PremiumBlur>
            <h2 className="text-2xl font-bold text-purple-100 mb-6 flex items-center">
              <Crown className="h-6 w-6 mr-2" />
              Mounts Analysis
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(reading.mounts).map(([mount, description]) => (
                <div key={mount} className="bg-purple-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-100 mb-2 capitalize">
                    Mount of {mount}
                  </h3>
                  <p className="text-purple-200">{description}</p>
                </div>
              ))}
            </div>
          </PremiumBlur>
        )}

        {activeTab === 'guidance' && (
          <div>
            <h2 className="text-2xl font-bold text-purple-100 mb-6 flex items-center">
              <Star className="h-6 w-6 mr-2" />
              Life Guidance
            </h2>
            <div className="space-y-6">
              <div className="bg-purple-800/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-100 mb-3 flex items-center">
                  <Sun className="h-5 w-5 mr-2" />
                  Career Guidance
                </h3>
                <p className="text-purple-200">{reading.careerGuidance}</p>
              </div>
              <div className="bg-purple-800/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-100 mb-3 flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Relationship Insights
                </h3>
                <p className="text-purple-200">{reading.relationshipInsights}</p>
              </div>
              <div className="bg-purple-800/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-100 mb-3 flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Health Indicators
                </h3>
                <p className="text-purple-200">{reading.healthIndicators}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'spiritual' && (
          <div>
            <h2 className="text-2xl font-bold text-purple-100 mb-6 flex items-center">
              <Moon className="h-6 w-6 mr-2" />
              Spiritual Recommendations
            </h2>
            <div className="bg-purple-800/30 rounded-lg p-6">
              <div className="space-y-4">
                {reading.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start">
                    <Sparkles className="h-5 w-5 text-purple-400 mr-3 mt-0.5" />
                    <p className="text-purple-200">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upgrade CTA for non-premium users */}
      {!isPremiumUser && (
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-center">
          <Crown className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Unlock Your Full Spiritual Journey</h3>
          <p className="text-purple-100 mb-4">
            Get detailed palm line analysis, compatibility readings, and personalized spiritual guidance
          </p>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  );
};

export default PalmReading;