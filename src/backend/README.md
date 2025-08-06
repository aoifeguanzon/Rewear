
# ReWear Backend

## How the Backend API Works

The ReWear backend API is the engine that powers all user and admin features for the ReWear platform. It is responsible for:
- **User accounts:** Creating, verifying, and logging in users, as well as managing user data.
- **Authentication:** Making sure only authorized users can access or change data, using secure tokens and access keys.
- **Uploads:** Handling image and product link uploads for item search and discovery.
- **Admin features:** Allowing admins to manage users, permissions, and system settings.
- **Access control:** Enforcing different roles and permissions for admins, developers, and regular users.

### How to Use the API
- **HTTP Endpoints:**
  - The backend exposes a set of URLs (endpoints) you can call using tools like `curl`, Postman, or from your frontend app.
  - Most endpoints start with `/api/auth` (for user actions) or `/api/admin` (for admin actions).
- **Authentication Headers:**
  - Many endpoints require you to include an `x-access-key-id` header with your request. This is your personal or admin access key.
  - Some actions (like login or signup) may not require a key, but admin and sensitive actions always do.
- **Request/Response Format:**
  - All data is sent and received as JSON (Content-Type: application/json).
  - You’ll get clear error messages and status codes if something goes wrong.

### Where to Find Endpoint Details and Examples
- **API Endpoints List:** See the [API Endpoints](#api-endpoints) section below for a summary of available routes.
- **Usage Examples:**
  - The [Account Management: Common Commands](#account-management-common-commands) section at the end of this README shows real example `curl` commands for signup, login, verification, and admin actions.
- **Code Reference:**
  - The `config/` folder contains database, email, and access control setup.
  - The `middleware/` folder contains authentication and permission checks.
  - The `routes/` folder contains the actual API endpoints for authentication and admin features.

If you’re building a new feature or integrating with the frontend, start by checking the endpoints in `routes/`, and look at the usage examples in this README.

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

## Admin Access Key Setup

To enable admin features, you must set the `ADMIN_ACCESS_KEY_ID` environment variable in your `.env` file:

```
ADMIN_ACCESS_KEY_ID=your-secure-admin-key
```

- Replace `your-secure-admin-key` with a strong, unique value (at least 32 random characters).
- Keep this value secret and never commit your `.env` file to version control.
- Rotate the key periodically for security.
- Only use the admin key for initial setup or critical admin operations.

**Example command to generate a strong key:**
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Admin Access Key Usage and Team Access

- The `ADMIN_ACCESS_KEY_ID` is used for admin authentication in the backend application, not for AWS Console or AWS IAM access.
- You can log in as an admin by including the admin access key in your API requests (e.g., in the `x-access-key-id` header), without needing to access the AWS Console.

### Sharing Admin Access with Teammates

If your `.env` file is private, teammates will not have the admin key by default. To allow teammates to log in as admin:

- **Securely share the admin key** (e.g., via a secure password manager, encrypted message, or a secure team vault).
- Each teammate should add the same `ADMIN_ACCESS_KEY_ID` value to their own `.env` file in the backend directory.
- Never share the `.env` file via email, chat, or version control.
- Rotate the admin key if a teammate leaves or if you suspect it has been compromised.

**Best Practice:** Use a team secrets manager (like 1Password, LastPass, Bitwarden, or your organization's vault solution) to distribute and manage sensitive keys.

## Sharing the Users Table Among Teammates

To ensure all team members access the same Users table, use a centralized AWS DynamoDB table and shared credentials.

### 1. Use a Central AWS DynamoDB Table
- Create the Users table in your AWS account (if not already done).
- All teammates should use the same AWS credentials (or IAM roles) with access to this table.

### 2. Share AWS Credentials Securely
- Store these in your `.env` file:
  ```
  AWS_ACCESS_KEY_ID=your-aws-access-key
  AWS_SECRET_ACCESS_KEY=your-aws-secret-key
  AWS_REGION=your-aws-region
  DYNAMODB_TABLE_NAME=Users
  ```
- Do **not** commit `.env` to version control.
- Share credentials securely (e.g., password manager, vault).

### 3. Configure the Backend
- Every teammate’s `.env` should point to the same table and AWS account.
- The backend will use these variables to connect to DynamoDB.

### 4. IAM Permissions
- The AWS user/role must have DynamoDB permissions (`GetItem`, `PutItem`, `UpdateItem`, etc.) on the Users table.

### 5. Best Practices
- Rotate AWS credentials regularly.
- Use IAM roles with least privilege.
- Never share AWS root credentials.
- Use a secrets manager for sharing credentials if possible.

### Summary Table
| What to Share           | How to Share                | Where to Use                |
|------------------------ |----------------------------|-----------------------------|
| AWS credentials         | Secure vault/password mgr   | Each teammate’s `.env`      |
| Table name (`Users`)    | Docs or `.env`              | Each teammate’s `.env`      |
| AWS region              | Docs or `.env`              | Each teammate’s `.env`      |

---
By following these steps, all teammates will read/write to the same shared Users table in AWS DynamoDB.

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
 `POST /api/auth/signup` - Create new user account
  **Example Success Response:**
  ```json
  {
    "success": true,
    "message": "Account created successfully. Please check your email for verification code.",
    "userId": "abc123-uuid"
  }
  ```
  **Example Error Response:**
  ```json
  {
    "error": "User already exists",
    "message": "An account with this email already exists"
  }
  ```
 
 `POST /api/auth/login` - User login
  **Example Success Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "jwt.token.here",
    "user": {
      "userId": "abc123-uuid",
      "username": "newuser",
      "email": "newuser@example.com",
      "isEmailVerified": true
    }
  }
  ```
  **Example Error Response (needs verification):**
  ```json
  {
    "error": "Email not verified",
    "message": "Please verify your email address before logging in",
    "needsVerification": true
  }
  ```
 
 `POST /api/auth/verify-email` - Verify email address
  **Example Success Response:**
  ```json
  {
    "success": true,
    "message": "Email verified successfully",
    "token": "jwt.token.here",
    "user": {
      "userId": "abc123-uuid",
      "username": "newuser",
      "email": "newuser@example.com",
      "isEmailVerified": true
    }
  }
  ```
  **Example Error Response:**
  ```json
  {
    "error": "Invalid code",
    "message": "Invalid verification code"
  }
  ```
 
 `GET /api/auth/me` - Get current user profile
  **Example Success Response:**
  ```json
  {
    "userId": "abc123-uuid",
    "username": "newuser",
    "email": "newuser@example.com",
    "isEmailVerified": true,
    "createdAt": "2025-08-03T12:00:00.000Z"
  }
  ```


 `GET /api/admin/users` - List all authorized users
  **Example Response:**
  ```json
  [
    {
      "accessKeyId": "admin-key-123",
      "name": "Admin User",
      "email": "admin@rewear.com",
      "accessLevel": "Admin"
    },
    {
      "accessKeyId": "dev-key-456",
      "name": "Dev User",
      "email": "dev@rewear.com",
      "accessLevel": "Developer"
    }
  ]
  ```
 
 `POST /api/admin/users` - Add new authorized user
  **Example Success Response:**
  ```json
  {
    "success": true,
    "message": "User added successfully",
    "user": {
      "accessKeyId": "new-key-789",
      "name": "New User",
      "email": "new@rewear.com",
      "accessLevel": "Viewer"
    }
  }
  ```
 
 `PUT /api/admin/users/:accessKeyId` - Update user access level
  **Example Success Response:**
  ```json
  {
    "success": true,
    "message": "User access level updated",
    "user": {
      "accessKeyId": "dev-key-456",
      "accessLevel": "Admin"
    }
  }
  ```
 
 `DELETE /api/admin/users/:accessKeyId` - Remove authorized user
  **Example Success Response:**
  ```json
  {
    "success": true,
    "message": "User removed successfully"
  }
  ```
 
 `GET /api/admin/access-levels` - Get available access levels
  **Example Response:**
  ```json
  ["Admin", "Developer", "Viewer", "Readonly"]
  ```
 
 `GET /api/admin/system-info` - Get system information
  **Example Response:**
  ```json
  {
    "uptime": 123456,
    "usersCount": 42,
    "dynamoStatus": "OK"
  }
  ```
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
   - Verify all email-related environment variables in your `.env` file:
     - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`
   - If using Gmail:
     - Enable 2FA on your Google account
     - Create an App Password and use it as `EMAIL_PASS`
     - Make sure `EMAIL_USER` matches the sending account
   - Check for typos in your email or password
   - Check server logs for errors like `Error sending verification email:`
   - If you see `Invalid login` or `Connection refused`, your credentials or SMTP settings are wrong
   - Test email sending with a simple script:
     ```js
     // Save as test-email.js in backend/config/
     require('dotenv').config({ path: '../.env' });
     const { sendVerificationEmail } = require('./email');
     sendVerificationEmail('your@email.com', '123456').then(console.log).catch(console.error);
     ```
     Then run: `node src/backend/config/test-email.js`
   - If you use a different provider (not Gmail), check their SMTP docs for correct host/port/settings

### Email Debugging Tips

- If emails are not received, check your spam folder.
- Some providers (like Gmail) may block sign-in attempts from new locations/dev servers.
- If you see `Error: Invalid login`, double-check your app password and 2FA settings.
- If you see `Error: connect ECONNREFUSED`, your SMTP host/port is likely wrong or blocked by firewall.
- For more help, see https://nodemailer.com/usage/

### Example .env for Gmail
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@rewear.com
```

---

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

## Account Management: Common Commands

Below are example commands for managing user accounts and admin setup via the API. Replace values in <> as needed.

### 1. Register (Sign Up)
```sh
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -H "x-access-key-id: <your-admin-access-key>" \
  -d '{"username":"newuser","email":"newuser@example.com","password":"StrongPassword123"}'
```

### 2. Resend Verification Code
```sh
curl -X POST http://localhost:5000/api/auth/resend-verification \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com"}'
```

### 3. Verify Email
```sh
curl -X POST http://localhost:5000/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","code":"123456"}'
```

### 4. Login
```sh
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","password":"StrongPassword123"}'
```

### 5. Admin Setup Notes
- Add your admin key to `.env` as `ADMIN_ACCESS_KEY_ID` and to `AUTHORIZED_USERS` in `config/userAccess.js`.
- Use the admin key in the `x-access-key-id` header for protected endpoints.

---
These commands can be run from any terminal with `curl` installed. For more details, see the relevant API documentation sections above. 