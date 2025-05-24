#!/bin/bash

# Palm Reading App Setup Script
echo "🔮 Setting up your Mystic Palm Reading App..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📋 Copying environment variables template..."
    cp .env.local.example .env.local
    echo "✅ Created .env.local file"
    echo "⚠️  Please update .env.local with your actual credentials:"
    echo "   - Firebase configuration"
    echo "   - OpenAI API key"
    echo "   - Stripe keys and price IDs"
    echo ""
else
    echo "✅ .env.local already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
if command -v pnpm &> /dev/null; then
    pnpm install
elif command -v npm &> /dev/null; then
    npm install
else
    echo "❌ Please install Node.js and npm first"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Update .env.local with your credentials"
echo "   2. Set up Firebase project (Authentication, Firestore, Storage)"
echo "   3. Get OpenAI API key"
echo "   4. Configure Stripe account and create pricing plans"
echo "   5. Run 'npm run dev' to start development server"
echo ""
echo "📚 Check README.md for detailed setup instructions"
echo "🌙 Visit http://localhost:3000 after starting the dev server"
