# DynamoDB Access Control Setup Guide

# Organization: ReWear

## Table of Contents
- [Overview](#overview)
- [Step 1: Create AWS Account and IAM User](#step-1-create-aws-account-and-iam-user)
- [Step 2: Create DynamoDB Table](#step-2-create-dynamodb-table)
- [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
- [Access Levels](#access-levels)
- [Setup Steps](#setup-steps)
- [API Endpoints](#api-endpoints)
- [Security Features](#security-features)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [Production Considerations](#production-considerations)

## Overview
This guide explains how to set up secure access to the DynamoDB table for multiple users with different permission levels.

---

## Step 1: Create AWS Account and IAM User

### 1.1 Create AWS Account
- [AWS Console](https://aws.amazon.com/)
- Register and log in.

### 1.2 Create IAM User for DynamoDB Access
- [IAM Console](https://console.aws.amazon.com/iam/)
- Go to "Users" > "Add users"
- User name: `rewear-dynamodb-user`
- Access type: Programmatic access
- Attach policy: `AmazonDynamoDBFullAccess` (for development) or a [custom policy](#custom-policy-example) for production
- Save the Access Key ID and Secret Access Key securely (preferrably store it in your local directory and then add it to .gitignore)

---

## Step 2: Create DynamoDB Table

### 2.1 Go to DynamoDB Console
- [DynamoDB Console](https://console.aws.amazon.com/dynamodb/)
- Click "Create table"

### 2.2 Table Settings
- Table name: `Users`
- Partition key: `userId` (String)
- Sort key: (leave empty)
- Capacity mode: On-demand (recommended)
- Point-in-time recovery: Enabled (optional)
- Click "Create table"

### 2.3 Verify Table
- [DynamoDB Tables](https://console.aws.amazon.com/dynamodb/home#tables)
- Ensure `Users` table appears in the list

---

## Step 3: Configure Environment Variables

Create a `.env` file in `src/backend/`:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
DYNAMODB_TABLE_NAME=Users
JWT_SECRET=your-super-secret-jwt-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@rewear.com
FRONTEND_URL=http://localhost:5173
```

Replace the placeholders with your actual values.

---

## Access Levels

### 1. Admin
- **Permissions**: Full CRUD operations, user management, system logs
- **Use Case**: System administrators who need full control

### 2. Developer
- **Permissions**: Create, read, update operations (no delete)
- **Use Case**: Developers working on the application

### 3. Viewer
- **Permissions**: Read-only access
- **Use Case**: Users who need to view data but not modify it

### 4. Readonly
- **Permissions**: Read-only access (same as viewer)
- **Use Case**: Backup access level

## Setup Steps

### Step 1: Configure AWS Credentials
Each user needs their own AWS IAM user with appropriate permissions.

1. **Create IAM User**:
   - Go to AWS IAM Console
   - Create new user with programmatic access
   - Attach custom policy for DynamoDB access

2. **Custom Policy Example**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": "arn:aws:dynamodb:*:*:table/Users"
    }
  ]
}
```

### Step 2: Add Users to the System
Use the admin API endpoints to add users:

```bash
# Add a new developer
curl -X POST http://localhost:5000/api/admin/users \
  -H "Content-Type: application/json" \
  -H "x-access-key-id: YOUR_ADMIN_ACCESS_KEY" \
  -d '{
    "accessKeyId": "AKIA...",
    "name": "John Developer",
    "email": "john@company.com",
    "accessLevel": "developer"
  }'
```

### Step 3: User Environment Setup
Each user should set up their environment:

```env
# .env file for each user
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=their-access-key
AWS_SECRET_ACCESS_KEY=their-secret-key
DYNAMODB_TABLE_NAME=Users
```

### Step 4: API Usage
Users can now access the API with their credentials:

```bash
# Example: Create a user (requires 'canCreate' permission)
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -H "x-access-key-id: USER_ACCESS_KEY" \
  -d '{
    "username": "newuser",
    "email": "user@example.com",
    "password": "SecurePass123"
  }'
```

## API Endpoints

### Admin Endpoints (Admin only)
- `GET /api/admin/users` - List all authorized users
- `POST /api/admin/users` - Add new authorized user
- `PUT /api/admin/users/:accessKeyId` - Update user access level
- `DELETE /api/admin/users/:accessKeyId` - Remove authorized user
- `GET /api/admin/access-levels` - Get available access levels
- `GET /api/admin/system-info` - Get system information

### Auth Endpoints (Permission-based)
- `POST /api/auth/signup` - Create user (requires 'canCreate')
- `POST /api/auth/verify-email` - Verify email (requires 'canUpdate')
- `POST /api/auth/login` - Login (requires 'canRead')
- `GET /api/auth/me` - Get profile (requires 'canRead')

## Security Features

### 1. Access Logging
All API requests are logged with:
- Timestamp
- User information
- IP address
- Request method and path

### 2. Permission Validation
Each endpoint validates user permissions before allowing access.

### 3. Rate Limiting
API requests are rate-limited to prevent abuse.

### 4. Input Validation
All inputs are validated and sanitized.

## Monitoring

### View Access Logs
Check server console for access logs:
```
[2024-01-01T12:00:00.000Z] POST /api/auth/signup - User: John Developer (developer) - IP: 192.168.1.100
```

### Check User Access
Use admin endpoint to view all authorized users:
```bash
curl -H "x-access-key-id: ADMIN_KEY" http://localhost:5000/api/admin/users
```

## Troubleshooting

### Common Issues

1. **Access Denied Error**:
   - Check if user is in AUTHORIZED_USERS list
   - Verify access key ID is correct
   - Ensure user has required permissions

2. **Permission Denied Error**:
   - Check user's access level
   - Verify endpoint requires specific permission
   - Contact admin to update permissions

3. **AWS Credentials Error**:
   - Verify AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
   - Check IAM user permissions
   - Ensure region is correct

## Best Practices

1. **Regular Access Reviews**: Periodically review and update user access
2. **Principle of Least Privilege**: Give users minimum required permissions
3. **Secure Credentials**: Never share or commit access keys
4. **Monitor Logs**: Regularly check access logs for suspicious activity
5. **Rotate Keys**: Regularly rotate AWS access keys

## Production Considerations

1. **Database Storage**: Store authorized users in DynamoDB instead of memory
2. **Encryption**: Encrypt sensitive data at rest and in transit
3. **Backup**: Regular backups of user access configurations
4. **Audit Trail**: Comprehensive logging for compliance
5. **Multi-Factor Authentication**: Consider adding MFA for admin access 