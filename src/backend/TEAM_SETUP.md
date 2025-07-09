# Team Setup Guide for ReWear DynamoDB

## Quick Start for Team Members

### 1. **Prerequisites**
- AWS Account access (shared or individual)
- Node.js installed
- Git repository access

### 2. **Environment Setup**

#### 2.1 Clone and Install Dependencies
```bash
# Clone the repository
git clone <your-repo-url>
cd Rewear/src/backend

# Install dependencies
npm install
```

#### 2.2 Create Environment File
Create a `.env` file in `src/backend/`:

```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-team-access-key
AWS_SECRET_ACCESS_KEY=your-team-secret-key
DYNAMODB_TABLE_NAME=Users

# JWT Configuration
JWT_SECRET=shared-jwt-secret-for-team

# Email Configuration (shared team email)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=team@rewear.com
EMAIL_PASS=team-app-password
EMAIL_FROM=noreply@rewear.com

# Application Configuration
FRONTEND_URL=http://localhost:5173
```

### 3. **Get Your Access Credentials**

#### 3.1 Request Access from Admin
Contact your team admin to:
1. Create an IAM user for you
2. Add you to the authorized users list
3. Provide your access credentials

#### 3.2 IAM User Creation (Admin Task)
The admin will create an IAM user with this policy:

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
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:*:table/Users"
    }
  ]
}
```

### 4. **Initialize Your Setup**

#### 4.1 Run Setup Script
```bash
# Initialize DynamoDB table and verify setup
node setup-dynamodb.js setup
```

#### 4.2 Verify Access
```bash
# Test your access by listing team members
node setup-dynamodb.js list-members
```

### 5. **Start Development**

#### 5.1 Start the Backend Server
```bash
# Development mode with auto-restart
npm run dev

# Or production mode
npm start
```

#### 5.2 Test API Endpoints
```bash
# Test user creation (requires 'canCreate' permission)
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -H "x-access-key-id: YOUR_ACCESS_KEY" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "SecurePass123"
  }'
```

## Team Collaboration Guidelines

### 1. **Access Levels**

| Level | Permissions | Use Case |
|-------|-------------|----------|
| **Admin** | Full CRUD + User Management | Team leads, project managers |
| **Developer** | Create, Read, Update | Active developers |
| **Viewer** | Read-only | QA testers, stakeholders |
| **Readonly** | Read-only | Backup access |

### 2. **Best Practices**

#### 2.1 Data Management
- **Never delete production data** without admin approval
- **Use test data** for development and testing
- **Backup important data** before major changes
- **Document schema changes** in team meetings

#### 2.2 Security
- **Never commit credentials** to version control
- **Use environment variables** for all sensitive data
- **Rotate access keys** regularly
- **Report suspicious activity** immediately

#### 2.3 Development Workflow
- **Test locally** before pushing changes
- **Use feature branches** for new development
- **Coordinate schema changes** with the team
- **Monitor DynamoDB usage** to stay within free tier

### 3. **Monitoring and Alerts**

#### 3.1 Set Up Billing Alerts
1. Go to AWS Billing Console
2. Set up billing alerts at $1, $5, and $10
3. Monitor usage in AWS Cost Explorer

#### 3.2 Track Usage
```bash
# Check current team members and their access
node setup-dynamodb.js list-members

# Monitor API usage in server logs
tail -f server.log
```

### 4. **Troubleshooting**

#### 4.1 Common Issues

**Access Denied Error**
```bash
# Check if you're in the authorized users list
node setup-dynamodb.js list-members

# Verify your access key is correct
echo $AWS_ACCESS_KEY_ID
```

**Permission Denied Error**
- Contact admin to verify your access level
- Check if the endpoint requires specific permissions
- Ensure your IAM user has the correct policy

**DynamoDB Connection Error**
```bash
# Test AWS credentials
aws sts get-caller-identity

# Verify table exists
aws dynamodb list-tables --region us-east-1
```

#### 4.2 Getting Help
1. Check the main `SETUP_GUIDE.md`
2. Review server logs for error details
3. Contact team admin for access issues
4. Use AWS CloudWatch for detailed monitoring

### 5. **Free Tier Management**

#### 5.1 Current Limits
- **Storage**: 25 GB
- **Read/Write Capacity**: 25 WCU/RCU per month
- **Estimated Cost**: $0 (within limits)

#### 5.2 Usage Optimization
- **Use efficient queries** to minimize RCU usage
- **Batch operations** when possible
- **Monitor usage** in AWS Console
- **Plan for growth** beyond free tier

#### 5.3 Cost Monitoring
```bash
# Check current usage (requires AWS CLI)
aws dynamodb describe-table --table-name Users --region us-east-1

# Monitor billing (AWS Console)
# https://console.aws.amazon.com/billing/
```

## Team Communication

### 1. **Access Requests**
When requesting access, provide:
- Your name and role
- Required access level
- Justification for access
- Expected usage patterns

### 2. **Schema Changes**
Before making schema changes:
1. **Propose changes** in team meeting
2. **Get approval** from team lead
3. **Coordinate migration** with team
4. **Update documentation**

### 3. **Incident Reporting**
Report issues immediately:
- **Data corruption** or loss
- **Unauthorized access** attempts
- **Performance issues**
- **Billing concerns**

## Support Contacts

- **Technical Admin**: [Admin Name] - [admin@rewear.com]
- **AWS Account Owner**: [Owner Name] - [owner@rewear.com]
- **Emergency Contact**: [Emergency Contact] - [emergency@rewear.com]

---

**Remember**: This is a shared resource. Be respectful of other team members and the free tier limits! 