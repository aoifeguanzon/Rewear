/**
 * @file database.js
 * @author Huy Le (huyisme-005)
 * @module config/database
 * @description Provides DynamoDB connection and user CRUD operations for the ReWear app.
 */
/*const AWS = require('aws-sdk');


// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

/**
 * DynamoDB DocumentClient instance for database operations.
 * @type {AWS.DynamoDB.DocumentClient}
 
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * Name of the DynamoDB table for users.
 * @type {string}
 
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'Users';

/**
 * Creates the Users table in DynamoDB if it does not exist.
 * @async
 * @returns {Promise<void>}
 
const createTable = async () => {
  const dynamodbService = new AWS.DynamoDB();
  
  const params = {
    TableName: TABLE_NAME,
    KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' } // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };

  try {
    await dynamodbService.createTable(params).promise();
    console.log(`Table ${TABLE_NAME} created successfully`);
  } catch (error) {
    if (error.code === 'ResourceInUseException') {
      console.log(`Table ${TABLE_NAME} already exists`);
    } else {
      console.error('Error creating table:', error);
    }
  }
};

/**
 * Creates a new user in the Users table.
 * @async
 * @param {Object} userData - The user data to store.
 * @returns {Promise<{success: boolean, user: Object}>}
 
const createUser = async (userData) => {
  const params = {
    TableName: TABLE_NAME,
    Item: userData
  };

  try {
    await dynamodb.put(params).promise();
    return { success: true, user: userData };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Retrieves a user by userId from the Users table.
 * @async
 * @param {string} userId - The user's unique ID.
 * @returns {Promise<Object|undefined>} The user object or undefined if not found.
 
const getUserById = async (userId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { userId }
  };

  try {
    const result = await dynamodb.get(params).promise();
    return result.Item;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

/**
 * Retrieves a user by email from the Users table.
 * @async
 * @param {string} email - The user's email address.
 * @returns {Promise<Object|undefined>} The user object or undefined if not found.
 
const getUserByEmail = async (email) => {
  const params = {
    TableName: TABLE_NAME,
    FilterExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  };

  try {
    const result = await dynamodb.scan(params).promise();
    return result.Items[0]; // Return first match
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
};

/**
 * Updates a user in the Users table.
 * @async
 * @param {string} userId - The user's unique ID.
 * @param {Object} updateData - The fields to update.
 * @returns {Promise<Object>} The updated user attributes.
 
const updateUser = async (userId, updateData) => {
  const updateExpression = [];
  const expressionAttributeValues = {};
  const expressionAttributeNames = {};

  Object.keys(updateData).forEach(key => {
    updateExpression.push(`#${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = updateData[key];
    expressionAttributeNames[`#${key}`] = key;
  });

  const params = {
    TableName: TABLE_NAME,
    Key: { userId },
    UpdateExpression: `SET ${updateExpression.join(', ')}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
    ReturnValues: 'ALL_NEW'
  };

  try {
    const result = await dynamodb.update(params).promise();
    return result.Attributes;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Deletes a user from the Users table.
 * @async
 * @param {string} userId - The user's unique ID.
 * @returns {Promise<{success: boolean}>}
 
const deleteUser = async (userId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { userId }
  };

  try {
    await dynamodb.delete(params).promise();
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

module.exports = {
  createTable,
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  TABLE_NAME
}; */

require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true,
   
    
}).then(() => {
console.log("DB CONNECTED!!!!!");
})
.catch((err) => console.log(err));