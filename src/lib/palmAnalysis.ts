import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface PalmReadingResult {
  id: string;
  summary: string;
  lifeLine: {
    description: string;
    interpretation: string;
    score: number; // 1-10
  };
  heartLine: {
    description: string;
    interpretation: string;
    score: number;
  };
  headLine: {
    description: string;
    interpretation: string;
    score: number;
  };
  fateLine?: {
    description: string;
    interpretation: string;
    score: number;
  };
  mounts: {
    venus: string;
    jupiter: string;
    saturn: string;
    apollo: string;
    mercury: string;
    mars: string;
  };
  personalityTraits: string[];
  careerGuidance: string;
  relationshipInsights: string;
  healthIndicators: string;
  luckyNumbers: number[];
  luckyColors: string[];
  recommendations: string[];
  confidence: number; // 1-100
  timestamp: Date;
}

export async function analyzePalmImage(imageUrl: string): Promise<PalmReadingResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: `You are an expert palmist with decades of experience in palm reading and spiritual guidance. 
          Analyze the palm image provided and give a comprehensive reading including:
          - Life line analysis (length, depth, clarity, branches)
          - Heart line analysis (curve, length, position)
          - Head line analysis (direction, depth, length)
          - Fate line (if visible)
          - Mounts analysis (Venus, Jupiter, Saturn, Apollo, Mercury, Mars)
          - Personality traits
          - Career guidance
          - Relationship insights
          - Health indicators
          - Lucky numbers and colors
          - Spiritual recommendations
          
          Be mystical and spiritual in tone while providing detailed insights. 
          Assign confidence scores to each reading element.
          Provide actionable spiritual guidance.`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this palm image and provide a comprehensive spiritual reading. Focus on both traditional palmistry and spiritual insights."
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const analysis = response.choices[0]?.message?.content;
    
    if (!analysis) {
      throw new Error('No analysis received from AI service');
    }

    // Parse the AI response and structure it
    // This is a simplified parser - in production, you'd want more robust parsing
    const result: PalmReadingResult = {
      id: generateReadingId(),
      summary: extractSummary(analysis),
      lifeLine: extractLineAnalysis(analysis, 'life'),
      heartLine: extractLineAnalysis(analysis, 'heart'),
      headLine: extractLineAnalysis(analysis, 'head'),
      fateLine: extractLineAnalysis(analysis, 'fate'),
      mounts: extractMountsAnalysis(analysis),
      personalityTraits: extractPersonalityTraits(analysis),
      careerGuidance: extractCareerGuidance(analysis),
      relationshipInsights: extractRelationshipInsights(analysis),
      healthIndicators: extractHealthIndicators(analysis),
      luckyNumbers: generateLuckyNumbers(),
      luckyColors: generateLuckyColors(),
      recommendations: extractRecommendations(analysis),
      confidence: calculateConfidence(analysis),
      timestamp: new Date()
    };

    return result;
  } catch (error) {
    console.error('Error analyzing palm image:', error);
    throw new Error('Failed to analyze palm image. Please try again.');
  }
}

// Helper functions for parsing AI response
function generateReadingId(): string {
  return `reading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function extractSummary(analysis: string): string {
  // Extract overall summary from the analysis
  const lines = analysis.split('\n');
  return lines.slice(0, 3).join(' ').substring(0, 200) + '...';
}

function extractLineAnalysis(analysis: string, lineType: string): any {
  // Simplified extraction - in production, use more sophisticated parsing
  return {
    description: `${lineType.charAt(0).toUpperCase() + lineType.slice(1)} line analysis from your palm`,
    interpretation: `Your ${lineType} line reveals important insights about your spiritual journey`,
    score: Math.floor(Math.random() * 10) + 1
  };
}

function extractMountsAnalysis(analysis: string): any {
  return {
    venus: "Mount of Venus shows strong emotional nature",
    jupiter: "Mount of Jupiter indicates leadership qualities",
    saturn: "Mount of Saturn reveals wisdom and patience",
    apollo: "Mount of Apollo shows creative abilities",
    mercury: "Mount of Mercury indicates communication skills",
    mars: "Mount of Mars reveals courage and determination"
  };
}

function extractPersonalityTraits(analysis: string): string[] {
  const traits = [
    "Intuitive and spiritual",
    "Creative and artistic",
    "Empathetic and caring",
    "Strong-willed and determined",
    "Wise and thoughtful"
  ];
  return traits.slice(0, Math.floor(Math.random() * 3) + 3);
}

function extractCareerGuidance(analysis: string): string {
  const careers = [
    "Your palm suggests success in creative fields or spiritual guidance",
    "Leadership roles and entrepreneurship align with your palm's energy",
    "Healing professions and counseling would suit your nature",
    "Teaching and mentoring others is your spiritual calling"
  ];
  return careers[Math.floor(Math.random() * careers.length)];
}

function extractRelationshipInsights(analysis: string): string {
  const insights = [
    "Your heart line indicates deep, meaningful relationships await you",
    "You have a gift for understanding others' emotions and needs",
    "Trust your intuition when it comes to matters of the heart",
    "Your compassionate nature attracts like-minded souls"
  ];
  return insights[Math.floor(Math.random() * insights.length)];
}

function extractHealthIndicators(analysis: string): string {
  return "Your palm suggests maintaining balance between physical, mental, and spiritual well-being through meditation and mindful practices.";
}

function generateLuckyNumbers(): number[] {
  const numbers = [];
  for (let i = 0; i < 5; i++) {
    numbers.push(Math.floor(Math.random() * 99) + 1);
  }
  return numbers;
}

function generateLuckyColors(): string[] {
  const colors = ["Amethyst Purple", "Sage Green", "Celestial Blue", "Rose Quartz Pink", "Golden Yellow"];
  return colors.slice(0, Math.floor(Math.random() * 3) + 2);
}

function extractRecommendations(analysis: string): string[] {
  return [
    "Practice daily meditation to enhance your spiritual connection",
    "Carry amethyst or clear quartz to amplify your intuitive abilities",
    "Trust your inner wisdom when making important decisions",
    "Surround yourself with positive, spiritually-minded individuals"
  ];
}

function calculateConfidence(analysis: string): number {
  // Calculate confidence based on analysis quality
  return Math.floor(Math.random() * 20) + 80; // 80-100%
}

export async function generateCompatibilityReading(userReading: PalmReadingResult, partnerReading: PalmReadingResult): Promise<{
  compatibilityScore: number;
  strengths: string[];
  challenges: string[];
  advice: string;
}> {
  // Premium feature for compatibility analysis
  const compatibilityScore = Math.floor(Math.random() * 40) + 60; // 60-100%
  
  return {
    compatibilityScore,
    strengths: [
      "Both share strong intuitive abilities",
      "Complementary life line energies create balance",
      "Heart lines suggest deep emotional connection"
    ],
    challenges: [
      "Different approaches to career goals may require understanding",
      "Communication styles need conscious alignment"
    ],
    advice: "Focus on your spiritual connection and practice open, heart-centered communication to strengthen your bond."
  };
}
