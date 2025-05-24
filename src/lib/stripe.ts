import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  stripeProductId: string;
  stripePriceId: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Spiritual Seeker',
    price: 0,
    features: [
      '1 Free Palm Reading',
      'Basic Personality Insights',
      'Lucky Numbers & Colors',
      'General Spiritual Guidance'
    ],
    stripeProductId: '',
    stripePriceId: ''
  },
  {
    id: 'premium',
    name: 'Mystic Premium',
    price: 9.99,
    features: [
      'Unlimited Palm Readings',
      'Detailed Line Analysis',
      'Comprehensive Mounts Reading',
      'Advanced Spiritual Guidance',
      'Compatibility Readings',
      'Monthly Spiritual Reports',
      'Priority Support',
      'Reading History & Trends'
    ],
    stripeProductId: 'prod_premium_palm_reading',
    stripePriceId: 'price_premium_monthly'
  },
  {
    id: 'deluxe',
    name: 'Cosmic Master',
    price: 19.99,
    features: [
      'Everything in Premium',
      'AI-Powered Life Predictions',
      'Career & Relationship Deep Dive',
      'Chakra Alignment Analysis',
      'Astrological Cross-Reference',
      'Personal Spiritual Coach',
      'Exclusive Meditation Content',
      'Early Access to New Features'
    ],
    stripeProductId: 'prod_deluxe_palm_reading',
    stripePriceId: 'price_deluxe_monthly'
  }
];

export async function createCheckoutSession(
  userId: string,
  planId: string,
  email: string
): Promise<string> {
  const plan = PRICING_PLANS.find(p => p.id === planId);
  
  if (!plan || plan.id === 'free') {
    throw new Error('Invalid plan selected');
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: plan.stripePriceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
    customer_email: email,
    metadata: {
      userId,
      planId,
    },
  });

  return session.url!;
}

export async function handleWebhook(
  signature: string,
  body: string
): Promise<void> {
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulPayment(session);
      break;
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      await handleCanceledSubscription(subscription);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const { userId, planId } = session.metadata!;
  
  // Update user profile in Firestore
  // This would be implemented to update the user's premium status
  console.log(`User ${userId} upgraded to plan ${planId}`);
}

async function handleCanceledSubscription(subscription: Stripe.Subscription) {
  // Handle subscription cancellation
  console.log(`Subscription ${subscription.id} was canceled`);
}
