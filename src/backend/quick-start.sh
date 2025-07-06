#!/bin/bash

# ReWear DynamoDB Quick Start Script
# This script helps team members set up their development environment

echo "🚀 ReWear DynamoDB Quick Start"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-here
AWS_SECRET_ACCESS_KEY=your-secret-key-here
DYNAMODB_TABLE_NAME=Users

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@rewear.com

# Application Configuration
FRONTEND_URL=http://localhost:5173
EOF
    echo "⚠️  Please update the .env file with your actual credentials"
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run setup
echo "🔧 Running DynamoDB setup..."
npm run setup

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update your .env file with your AWS credentials"
echo "2. Contact your team admin to get access credentials"
echo "3. Run 'npm run dev' to start the development server"
echo "4. Check 'TEAM_SETUP.md' for detailed instructions"
echo ""
echo "💰 Remember: This uses AWS Free Tier (25 GB storage, 25 WCU/RCU/month)" 