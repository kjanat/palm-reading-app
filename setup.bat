@echo off
echo 🔮 Setting up your Mystic Palm Reading App...

REM Check if .env.local exists
if not exist .env.local (
    echo 📋 Copying environment variables template...
    copy .env.local.example .env.local >nul
    echo ✅ Created .env.local file
    echo ⚠️  Please update .env.local with your actual credentials:
    echo    - Firebase configuration
    echo    - OpenAI API key
    echo    - Stripe keys and price IDs
    echo.
) else (
    echo ✅ .env.local already exists
)

REM Install dependencies
echo 📦 Installing dependencies...
where pnpm >nul 2>nul
if %ERRORLEVEL% == 0 (
    pnpm install
) else (
    where npm >nul 2>nul
    if %ERRORLEVEL% == 0 (
        npm install
    ) else (
        echo ❌ Please install Node.js and npm first
        pause
        exit /b 1
    )
)

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo    1. Update .env.local with your credentials
echo    2. Set up Firebase project (Authentication, Firestore, Storage)
echo    3. Get OpenAI API key
echo    4. Configure Stripe account and create pricing plans
echo    5. Run 'npm run dev' to start development server
echo.
echo 📚 Check README.md for detailed setup instructions
echo 🌙 Visit http://localhost:3000 after starting the dev server
pause
