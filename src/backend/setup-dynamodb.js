/**
 * @file setup-dynamodb.js
 * @author Huy Le (huyisme-005)
 * @description Setup script for DynamoDB table and environment configuration
 */

require('dotenv').config();
const AWS = require('aws-sdk');
const { createTable } = require('./config/database');
const { addAuthorizedUser, ACCESS_LEVELS } = require('./config/userAccess');

// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

/**
 * Setup DynamoDB table and initial configuration
 */
async function setupDynamoDB() {
  console.log('🚀 Setting up DynamoDB for ReWear...\n');

  try {
    // Step 1: Create DynamoDB table
    console.log('📋 Step 1: Creating DynamoDB table...');
    await createTable();
    console.log('✅ DynamoDB table created successfully!\n');

    // Step 2: Verify environment variables
    console.log('🔧 Step 2: Verifying environment variables...');
    const requiredEnvVars = [
      'AWS_REGION',
      'AWS_ACCESS_KEY_ID', 
      'AWS_SECRET_ACCESS_KEY',
      'DYNAMODB_TABLE_NAME',
      'JWT_SECRET'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.log('❌ Missing environment variables:');
      missingVars.forEach(varName => console.log(`   - ${varName}`));
      console.log('\nPlease add these to your .env file and run the setup again.\n');
      return;
    }

    console.log('✅ Environment variables verified!\n');

    // Step 3: Test DynamoDB connection
    console.log('🔗 Step 3: Testing DynamoDB connection...');
    const dynamodb = new AWS.DynamoDB();
    await dynamodb.listTables().promise();
    console.log('✅ DynamoDB connection successful!\n');

    // Step 4: Setup initial admin user (if not already set)
    console.log('👤 Step 4: Setting up initial admin user...');
    
    // Check if admin user already exists
    const adminKey = process.env.ADMIN_ACCESS_KEY_ID;
    if (adminKey && adminKey !== 'your-admin-access-key') {
      addAuthorizedUser(adminKey, {
        accessLevel: ACCESS_LEVELS.ADMIN,
        name: 'System Admin',
        email: process.env.ADMIN_EMAIL || 'admin@rewear.com'
      });
      console.log('✅ Admin user configured!\n');
    } else {
      console.log('⚠️  No admin access key found. Please set ADMIN_ACCESS_KEY_ID in your .env file.\n');
    }

    console.log('🎉 DynamoDB setup completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Add team members using the admin API');
    console.log('2. Test the API endpoints');
    console.log('3. Monitor usage in AWS Console');
    console.log('\n💰 Free Tier Limits:');
    console.log('- 25 GB storage');
    console.log('- 25 WCU/RCU per month');
    console.log('- Set up billing alerts to avoid charges');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your AWS credentials');
    console.log('2. Verify your .env file configuration');
    console.log('3. Ensure you have DynamoDB permissions');
  }
}

/**
 * Add a team member to the system
 */
async function addTeamMember(accessKeyId, name, email, accessLevel = 'developer') {
  try {
    const success = addAuthorizedUser(accessKeyId, {
      accessLevel,
      name,
      email
    });

    if (success) {
      console.log(`✅ Team member ${name} added successfully with ${accessLevel} access`);
    } else {
      console.log('❌ Failed to add team member - access key may already exist');
    }
  } catch (error) {
    console.error('❌ Error adding team member:', error.message);
  }
}

/**
 * List current team members
 */
function listTeamMembers() {
  const { getAuthorizedUsers } = require('./config/userAccess');
  const users = getAuthorizedUsers();
  
  console.log('\n👥 Current Team Members:');
  if (users.length === 0) {
    console.log('No team members configured yet.');
  } else {
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - ${user.accessLevel}`);
    });
  }
}

/**
 * List DynamoDB tables
 */
async function listDynamoDBTables() {
  console.log('📋 Listing DynamoDB tables...\n');
  
  try {
    const dynamodb = new AWS.DynamoDB();
    const result = await dynamodb.listTables().promise();
    
    console.log('🏗️  DynamoDB Tables:');
    if (result.TableNames.length === 0) {
      console.log('No tables found in this region.');
    } else {
      result.TableNames.forEach((tableName, index) => {
        console.log(`${index + 1}. ${tableName}`);
      });
    }
    
    // Check if our Users table exists
    const usersTableExists = result.TableNames.includes('Users');
    console.log(`\n✅ Users table exists: ${usersTableExists ? 'YES' : 'NO'}`);
    
  } catch (error) {
    console.error('❌ Error listing tables:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your AWS credentials in .env file');
    console.log('2. Verify your AWS region is correct');
    console.log('3. Ensure you have DynamoDB permissions');
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'setup':
      setupDynamoDB();
      break;
    case 'add-member':
      const [accessKeyId, name, email, accessLevel] = args.slice(1);
      if (!accessKeyId || !name || !email) {
        console.log('Usage: node setup-dynamodb.js add-member <accessKeyId> <name> <email> [accessLevel]');
        process.exit(1);
      }
      addTeamMember(accessKeyId, name, email, accessLevel);
      break;
    case 'list-members':
      listTeamMembers();
      break;
    case 'list-tables':
      listDynamoDBTables();
      break;
    default:
      console.log('ReWear DynamoDB Setup Script\n');
      console.log('Usage:');
      console.log('  node setup-dynamodb.js setup                    - Setup DynamoDB table and environment');
      console.log('  node setup-dynamodb.js add-member <key> <name> <email> [level] - Add team member');
      console.log('  node setup-dynamodb.js list-members             - List current team members');
      console.log('  node setup-dynamodb.js list-tables              - List DynamoDB tables');
      console.log('\nAccess levels: admin, developer, viewer, readonly');
  }
}

module.exports = {
  setupDynamoDB,
  addTeamMember,
  listTeamMembers,
  listDynamoDBTables
}; 