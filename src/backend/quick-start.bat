@echo off
REM ReWear DynamoDB Quick Start Script for Windows
REM This script helps team members set up their development environment

echo 🚀 ReWear DynamoDB Quick Start
echo ================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed

REM Check if .env file exists
if not exist ".env" (
    echo 📝 Creating .env file...
    (
        echo # AWS Configuration
        echo AWS_REGION=us-east-1
        echo AWS_ACCESS_KEY_ID=your-access-key-here
        echo AWS_SECRET_ACCESS_KEY=your-secret-key-here
        echo DYNAMODB_TABLE_NAME=Users
        echo.
        echo # JWT Configuration
        echo JWT_SECRET=your-super-secret-jwt-key
        echo.
        echo # Email Configuration
        echo EMAIL_HOST=smtp.gmail.com
        echo EMAIL_PORT=587
        echo EMAIL_USER=your-email@gmail.com
        echo EMAIL_PASS=your-app-password
        echo EMAIL_FROM=noreply@rewear.com
        echo.
        echo # Application Configuration
        echo FRONTEND_URL=http://localhost:5173
    ) > .env
    echo ⚠️  Please update the .env file with your actual credentials
) else (
    echo ✅ .env file already exists
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Run setup
echo 🔧 Running DynamoDB setup...
npm run setup

echo.
echo 🎉 Setup complete!
echo.
echo 📝 Next steps:
echo 1. Update your .env file with your AWS credentials
echo 2. Contact your team admin to get access credentials
echo 3. Run 'npm run dev' to start the development server
echo 4. Check 'TEAM_SETUP.md' for detailed instructions
echo.
echo 💰 Remember: This uses AWS Free Tier (25 GB storage, 25 WCU/RCU/month)
pause 