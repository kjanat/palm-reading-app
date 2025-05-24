import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';
import { db } from '../../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

// This is your Stripe webhook endpoint
export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'No Stripe signature found' },
            { status: 400 }
        );
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json(
            { error: 'Webhook signature verification failed' },
            { status: 400 }
        );
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                const userId = session.client_reference_id || session.metadata?.userId;

                if (userId) {
                    // Update user's premium status in Firestore
                    const userRef = doc(db, 'users', userId);
                    await updateDoc(userRef, {
                        isPremium: true,
                        stripeCustomerId: session.customer,
                        subscriptionId: session.subscription,
                        subscriptionStatus: 'active',
                        updatedAt: new Date().toISOString(),
                    });

                    console.log(`User ${userId} upgraded to premium`);
                }
                break;

            case 'customer.subscription.updated':
                const subscription = event.data.object;
                const customerId = subscription.customer;

                // Find user by Stripe customer ID and update subscription status
                // This would require a more complex query in a real app
                console.log(`Subscription ${subscription.id} updated for customer ${customerId}`);
                break;

            case 'customer.subscription.deleted':
                const deletedSubscription = event.data.object;
                const deletedCustomerId = deletedSubscription.customer;

                // Find user and downgrade to free plan
                console.log(`Subscription ${deletedSubscription.id} cancelled for customer ${deletedCustomerId}`);
                break;

            case 'invoice.payment_succeeded':
                const invoice = event.data.object;
                console.log(`Payment succeeded for invoice ${invoice.id}`);
                break;

            case 'invoice.payment_failed':
                const failedInvoice = event.data.object;
                console.log(`Payment failed for invoice ${failedInvoice.id}`);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}
