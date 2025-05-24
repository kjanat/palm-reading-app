# 🔮 Mystic Palm - AI-Powered Palm Reading App

A modern, mystical palm reading application built with Next.js, featuring AI-powered analysis, user authentication, and a freemium pricing model.

![Next.js](https://img.shields.io/badge/dynamic/regex?url=https%3A%2F%2Fraw.githubusercontent.com%2Fkjanat%2Fpalm-reading-app%2Fmaster%2Fpackage.json&search=%22next%22%5Cs*%3A%5Cs*%22%5C%5E(%3F%3Cversion%3E%5Cd%2B%5C.%5Cd*).*%22&replace=%24%3Cversion%3E&logo=nextdotjs&label=Nextjs&color=%23000000)
![React](https://img.shields.io/badge/dynamic/regex?url=https%3A%2F%2Fraw.githubusercontent.com%2Fkjanat%2Fpalm-reading-app%2Fmaster%2Fpackage.json&search=%22react%22%5Cs*%3A%5Cs*%22%5C%5E(%3F%3Cversion%3E%5Cd%2B%5C.%5Cd*).*%22&replace=%24%3Cversion%3E&logo=react&label=React&color=%2361DAFB)
![TypeScript](https://img.shields.io/badge/dynamic/regex?url=https%3A%2F%2Fraw.githubusercontent.com%2Fkjanat%2Fpalm-reading-app%2Fmaster%2Fpackage.json&search=%22typescript%22%5Cs*%3A%5Cs*%22%5C%5E(%3F%3Cversion%3E%5Cd%2B%5C.%5Cd*).*%22&replace=%24%3Cversion%3E&logo=typescript&label=TypeScript&color=%233178C6)
![Firebase](https://img.shields.io/badge/dynamic/regex?url=https%3A%2F%2Fraw.githubusercontent.com%2Fkjanat%2Fpalm-reading-app%2Fmaster%2Fpackage.json&search=%22firebase%22%5Cs*%3A%5Cs*%22%5C%5E(%3F%3Cversion%3E%5Cd%2B%5C.%5Cd*).*%22&replace=%24%3Cversion%3E&logo=firebase&label=Firebase&color=%23DD2C00)
![TailwindCSS](https://img.shields.io/badge/dynamic/regex?url=https%3A%2F%2Fraw.githubusercontent.com%2Fkjanat%2Fpalm-reading-app%2Fmaster%2Fpackage.json&search=%22tailwindcss%22%5Cs*%3A%5Cs*%22%5C%5E(%3F%3Cversion%3E%5Cd%2B%5C.%5Cd*).*%22&replace=%24%3Cversion%3E&logo=tailwindcss&label=TailwindCSS&color=%2306B6D4)

## ✨ Features

### 🆓 Free Features
- **One Free Reading**: Get your first palm reading absolutely free
- **Basic Analysis**: Life line interpretation and general personality insights
- **Secure Authentication**: Firebase-powered user accounts
- **Mystical UI**: Beautiful spiritual-themed interface

### 👑 Premium Features
- **Unlimited Readings**: No limits on palm analysis
- **Detailed Analysis**: Complete interpretation of life, heart, and head lines
- **Mount Analysis**: Comprehensive palm mount readings
- **Compatibility Readings**: Relationship and compatibility insights
- **Reading History**: Track and review all your past readings
- **Premium Support**: Priority customer support

### 🌟 Deluxe Features
- **All Premium Features**: Everything from the premium plan
- **Advanced Techniques**: Rare palmistry methods and insights
- **Career Predictions**: Professional and wealth guidance
- **Health Insights**: Wellness and vitality analysis
- **Spiritual Guidance**: Deep mystical and chakra insights
- **Monthly Consultations**: Personal mystical consultations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **File Storage**: Firebase Storage
- **AI**: OpenAI GPT-4 Vision API
- **Payments**: Stripe
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Firebase project
- OpenAI API key
- Stripe account

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd palm-reading-app
pnpm install
```

### 2. Environment Setup
Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

### 3. Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Enable Storage
5. Copy your config to `.env.local`

### 4. OpenAI Setup
1. Get API key from [OpenAI Platform](https://platform.openai.com)
2. Add to `.env.local` as `OPENAI_API_KEY`

### 5. Stripe Setup
1. Create account at [Stripe Dashboard](https://dashboard.stripe.com)
2. Create products and pricing plans:
   - Premium: $9.99/month
   - Deluxe: $19.99/month
3. Copy publishable key, secret key, and price IDs to `.env.local`
4. Set up webhook endpoint: `/api/stripe-webhook`

### 6. Run Development Server
```bash
pnpm dev
```

Visit `http://localhost:3000` to see your mystical palm reading app! 🌙

## 🔮 How It Works

### Palm Analysis Flow
1. **Upload**: User uploads palm photo via drag-drop interface
2. **Validation**: Image is validated and stored in Firebase Storage
3. **AI Analysis**: OpenAI GPT-4 Vision analyzes the palm image
4. **Processing**: Structured data is extracted and formatted
5. **Display**: Results shown in beautiful tabbed interface
6. **Storage**: Reading saved to user's history (premium users)

### Freemium Model
- **Free Users**: 1 reading limit, basic analysis only
- **Premium**: Unlimited readings, full analysis, history
- **Deluxe**: Everything + advanced features and consultations

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy automatically

### Environment Variables for Production
```bash
# Update these for production
NEXT_PUBLIC_APP_URL=https://your-domain.com
STRIPE_WEBHOOK_SECRET=your_production_webhook_secret
```

## 📊 Key Components

- **AuthContext**: Complete user authentication and profile management
- **ImageUpload**: Drag-drop file upload with Firebase Storage
- **PalmReading**: Tabbed interface for displaying AI analysis
- **Pricing**: Stripe-integrated subscription plans
- **Navigation**: Responsive navigation with user state

## 🎨 Mystical Design

The app features a beautiful spiritual theme with:
- Purple/pink gradient backgrounds
- Crystal-like glass card effects
- Custom mystical typography (Cinzel & Crimson Text)
- Golden accents and mystical iconography
- Responsive design for all devices

## 🔧 Configuration

Copy `.env.local.example` to `.env.local` and configure:
- Firebase credentials
- OpenAI API key  
- Stripe keys and price IDs
- App URL

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

-   User authentication (login/signup)
-   Image upload for palm analysis
-   Personalized dashboard
-   Detailed palm reading results and interpretations
-   Spiritual and alternative aesthetic design

## Getting Started

To get started with the Palm Reading App, follow these steps:

1.  **Clone the repository:**

   ```bash
   git clone https://github.com/kjanat/palm-reading-app.git
   cd palm-reading-app
   ```

2.  **Install dependencies:**

   ```bash
   npm install
   ```

3.  **Run the development server:**

   ```bash
   npm run dev
   ```

4.  **Open your browser and navigate to:** [http://localhost:3000](http://localhost:3000)

## Deployment

This application is deployable to Vercel. To deploy, follow these steps:

1.  Push your code to a GitHub repository.
2.  Sign in to [Vercel](https://vercel.com).
3.  Import your GitHub repository.
4.  Follow the prompts to deploy your application.

## Technologies Used

-   Next.js
-   React
-   Tailwind CSS
-   Vercel for deployment

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, please open an issue or submit a pull request.

## License

This project is licensed under the GNU AGPLv3 License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

Special thanks to the community for their support and inspiration in creating this spiritual palm reading experience.
