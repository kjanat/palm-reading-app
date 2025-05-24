# 🚀 Deployment Guide - Mystic Palm Reading App

This guide will help you deploy your palm reading app to production using Vercel.

## 📋 Pre-Deployment Checklist

### 1. Environment Variables Setup
Ensure your `.env.local` file contains all required variables:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Stripe Price IDs
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_premium_monthly
NEXT_PUBLIC_STRIPE_DELUXE_PRICE_ID=price_deluxe_monthly

# App Configuration (UPDATE FOR PRODUCTION)
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 2. Firebase Production Setup

#### Authentication
1. Go to Firebase Console → Authentication → Settings
2. Add your production domain to authorized domains
3. Configure email templates for production

#### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Palm readings - users can only access their own
    match /readings/{readingId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

#### Storage Security Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Only authenticated users can upload palm images
    match /palm-images/{userId}/{imageId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3. Stripe Production Setup

#### Create Products and Prices
1. Go to Stripe Dashboard → Products
2. Create "Premium Plan" - $9.99/month recurring
3. Create "Deluxe Plan" - $19.99/month recurring
4. Copy the price IDs to your environment variables

#### Webhook Configuration
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## 🌐 Vercel Deployment

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: complete palm reading app"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add all variables from your `.env.local` file
   - **Important**: Update `NEXT_PUBLIC_APP_URL` to your Vercel domain

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel --prod
   ```

3. **Add Environment Variables**
   ```bash
   vercel env add OPENAI_API_KEY production
   vercel env add STRIPE_SECRET_KEY production
   # ... add all other variables
   ```

## 🔧 Post-Deployment Configuration

### 1. Update Stripe Webhook URL
- Go to Stripe Dashboard → Webhooks
- Update endpoint URL to your Vercel domain
- Test webhook delivery

### 2. Update Firebase Configuration
- Add your Vercel domain to Firebase authorized domains
- Test authentication flows

### 3. Test Critical Flows
- [ ] User registration/login
- [ ] Image upload functionality
- [ ] Palm reading analysis
- [ ] Payment processing
- [ ] Webhook handling

## 📊 Production Monitoring

### Vercel Analytics
1. Enable Vercel Analytics in project settings
2. Monitor performance and usage

### Error Tracking (Optional)
Add Sentry for error monitoring:

```bash
npm install @sentry/nextjs
```

```javascript
// next.config.js
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig({
  // Your existing config
}, {
  // Sentry configuration
});
```

### Performance Monitoring
- Monitor OpenAI API usage and costs
- Track Stripe transaction volumes
- Monitor Firebase usage quotas

## 🔒 Security Best Practices

### Environment Variables
- Never commit `.env.local` to git
- Use different API keys for development/production
- Regularly rotate sensitive keys

### API Rate Limiting
Consider adding rate limiting to your API routes:

```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Add rate limiting logic
  return NextResponse.next();
}
```

### Content Security Policy
Add CSP headers in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ];
  }
};
```

## 🚨 Troubleshooting

### Common Issues

**Build Errors**
- Check TypeScript errors: `npm run type-check`
- Verify all environment variables are set
- Check for missing dependencies

**Authentication Issues**
- Verify Firebase config is correct
- Check authorized domains in Firebase
- Test with Firebase Auth emulator first

**Payment Issues**
- Verify Stripe keys (test vs. production)
- Check webhook URL and events
- Test with Stripe test mode first

**Image Upload Issues**
- Check Firebase Storage rules
- Verify CORS settings
- Monitor Firebase Storage quotas

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)
- [Stripe Integration Guide](https://stripe.com/docs/payments/checkout)

## 📈 Scaling Considerations

### Performance Optimization
- Implement image optimization
- Add caching strategies
- Use CDN for static assets

### Database Optimization
- Index Firestore queries
- Implement pagination
- Monitor read/write quotas

### Cost Management
- Monitor OpenAI API usage
- Implement usage quotas
- Set up billing alerts

---

🎉 **Congratulations!** Your mystical palm reading app is now live and ready to help users discover their destiny! 🔮
