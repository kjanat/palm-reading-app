import { NextRequest, NextResponse } from 'next/server';
import { analyzePalmImage } from '../../../lib/palmAnalysis';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    const reading = await analyzePalmImage(imageUrl);

    return NextResponse.json({ reading });
  } catch (error) {
    console.error('Error in palm analysis API:', error);
    return NextResponse.json(
      { error: 'Failed to analyze palm image' },
      { status: 500 }
    );
  }
}
