import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';
import { auth } from '../../../lib/firebase';

export async function POST(request: NextRequest) {
    try {
        const { priceId, userId } = await request.json();

        if (!priceId || !userId) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
            client_reference_id: userId,
            metadata: {
                userId: userId,
            },
            customer_email: undefined, // Will be filled by Stripe
            allow_promotion_codes: true,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
