# ReWear Backend

A Node.js backend API for the ReWear application with DynamoDB integration, user authentication, and team collaboration features.

## 🚀 Quick Start

### For Windows Users
```bash
# Run the quick start script
quick-start.bat
```

### For Mac/Linux Users
```bash
# Make script executable and run
chmod +x quick-start.sh
./quick-start.sh
```

### Manual Setup
```bash
# Install dependencies
npm install

# Create .env file (see Environment Variables section)
# Run setup
npm run setup

# Start development server
npm run dev
```

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **AWS Account** with DynamoDB access
- **Git** for version control

## 🔧 Environment Variables

Create a `.env` file in the `src/backend/` directory:

### Generating a Secure JWT Secret Key

You must set a strong, random JWT secret for token signing. To generate a secure key, run one of the following commands in your terminal:

```bash
# Using Node.js (recommended)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or using OpenSSL
openssl rand -hex 64
```

Copy the output and use it as your `JWT_SECRET` value in the `.env` file:

```env
JWT_SECRET=your-generated-super-secret-key
```

> ⚠️ **Caution:**
> - Never share your JWT secret or commit it to version control.
> - Use a different secret for development and production.
> - If the secret is ever leaked, change it immediately (all existing tokens will become invalid).
> - Rotate your JWT secret periodically as a security best practice.

```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
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

# Optional: Admin Configuration
ADMIN_ACCESS_KEY_ID=admin-access-key
ADMIN_EMAIL=admin@rewear.com
```

## 🏗️ Project Structure

```
src/backend/
├── config/
│   ├── database.js      # DynamoDB configuration and operations
│   ├── email.js         # Email service configuration
│   └── userAccess.js    # Access control and permissions
├── middleware/
│   ├── accessControl.js # Permission validation middleware
│   └── auth.js          # Authentication middleware
├── routes/
│   ├── admin.js         # Admin API endpoints
│   └── auth.js          # Authentication API endpoints
├── utils/
│   └── auth.js          # Authentication utilities
├── server.js            # Main server file
├── setup-dynamodb.js    # Setup and management script
├── SETUP_GUIDE.md       # Detailed setup guide
├── TEAM_SETUP.md        # Team collaboration guide
└── README.md            # This file
```

## 🗄️ Database Schema

### Users Table
- **Partition Key**: `userId` (String)
- **Attributes**:
  - `email` (String) - User's email address
  - `username` (String) - Username
  - `password` (String) - Hashed password
  - `isVerified` (Boolean) - Email verification status
  - `createdAt` (String) - Account creation timestamp
  - `updatedAt` (String) - Last update timestamp

## 🔐 Access Control

### Access Levels
- **Admin**: Full CRUD + User Management
- **Developer**: Create, Read, Update (no delete)
- **Viewer**: Read-only access
- **Readonly**: Read-only access (backup)

### Adding Team Members
```bash
# Add a new team member
npm run add-member <accessKeyId> <name> <email> [accessLevel]

# List current team members
npm run list-members
```

## 📡 API Endpoints

### Authentication Endpoints
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Verify email address
- `GET /api/auth/me` - Get current user profile

### Admin Endpoints
- `GET /api/admin/users` - List all authorized users
- `POST /api/admin/users` - Add new authorized user
- `PUT /api/admin/users/:accessKeyId` - Update user access level
- `DELETE /api/admin/users/:accessKeyId` - Remove authorized user
- `GET /api/admin/access-levels` - Get available access levels
- `GET /api/admin/system-info` - Get system information

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with auto-restart
npm start           # Start production server

# Setup and Management
npm run setup       # Initialize DynamoDB table and environment
npm run add-member  # Add team member to access control
npm run list-members # List current team members

# Testing
npm test            # Run test suite
```

## 💰 AWS Free Tier

This project is designed to work within AWS Free Tier limits:

- **DynamoDB**: 25 GB storage, 25 WCU/RCU per month
- **IAM**: Free for basic usage
- **CloudWatch**: Basic monitoring included
- **Estimated Cost**: $0 (within free tier limits)

### Cost Monitoring
- Set up billing alerts at $1, $5, and $10
- Monitor usage in AWS Cost Explorer
- Use CloudWatch to track DynamoDB metrics

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication (see Environment Variables section for secure key generation and rotation advice)
- **Password Hashing**: bcrypt for password security
- **Access Control**: Role-based permissions
- **Input Validation**: Request validation and sanitization
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Cross-origin resource sharing protection

## 🚨 Troubleshooting

### Common Issues

1. **Access Denied Error**
   - Check if user is in authorized users list
   - Verify access key ID is correct
   - Ensure user has required permissions

2. **Permission Denied Error**
   - Check user's access level
   - Verify endpoint requires specific permission
   - Contact admin to update permissions

3. **DynamoDB Connection Error**
   - Verify AWS credentials
   - Check IAM user permissions
   - Ensure region is correct

4. **Email Service Error**
   - Verify email credentials
   - Check Gmail app password setup
   - Ensure 2FA is enabled for Gmail

### Getting Help
1. Check `SETUP_GUIDE.md` for detailed setup instructions
2. Review `TEAM_SETUP.md` for team collaboration guidelines
3. Check server logs for error details
4. Contact team admin for access issues

## 📚 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Detailed setup instructions
- [Team Setup Guide](TEAM_SETUP.md) - Team collaboration guidelines
- [API Documentation](API_DOCS.md) - Complete API reference

## 🤝 Contributing

1. Follow the team collaboration guidelines in `TEAM_SETUP.md`
2. Use feature branches for new development
3. Coordinate schema changes with the team
4. Test locally before pushing changes
5. Monitor DynamoDB usage to stay within free tier

## 📞 Support

- **Technical Issues**: Check troubleshooting section above
- **Access Issues**: Contact team admin
- **AWS Issues**: Check AWS documentation and support

---

**Remember**: This is a shared resource. Be respectful of other team members and the free tier limits! 