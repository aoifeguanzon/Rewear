/**
 * @file auth.js
 * @author Huy Le (huyisme-005)
 * @module utils/auth
 * @description Provides authentication utilities: password hashing, JWT, and code generation.
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The plain text password.
 * @returns {Promise<string>} The hashed password.
 */
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compares a password with a hash.
 * @param {string} password - The plain text password.
 * @param {string} hash - The hashed password.
 * @returns {Promise<boolean>} True if match, false otherwise.
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Generates a JWT token for a user.
 * @param {string} userId - The user's ID.
 * @param {string} email - The user's email.
 * @returns {string} The JWT token.
 */
const generateToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token.
 * @returns {Object|null} The decoded token or null if invalid.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Generates a 6-digit verification code as a string.
 * @returns {string} The verification code.
 */
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Generates a secure random token (hex string).
 * @returns {string} The token.
 */
const generateSecureToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Generates a user ID using UUID with email-based seed for consistency.
 * @param {string} email - The user's email (used for seeding UUID generation).
 * @returns {string} The user ID (UUID).
 */
const generateUserId = (email) => {
  // Create a deterministic UUID based on email hash for consistency
  // This ensures the same email always generates the same UUID
  const emailHash = crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex');
  
  // Use the email hash to seed a deterministic UUID v5-like generation
  // This provides UUID benefits while maintaining email-based consistency
  const namespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'; // RFC 4122 namespace
  const name = emailHash;
  
  // Generate a deterministic UUID-like string based on email
  const hash = crypto.createHash('sha1').update(namespace + name).digest();
  
  // Convert to UUID format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  const uuid = [
    hash.subarray(0, 4).toString('hex'),
    hash.subarray(4, 6).toString('hex'),
    (hash[6] & 0x0f | 0x40).toString(16) + hash.subarray(7, 8).toString('hex'),
    (hash[8] & 0x3f | 0x80).toString(16) + hash.subarray(9, 10).toString('hex'),
    hash.subarray(10, 16).toString('hex')
  ].join('-');
  
  return uuid;
};

/**
 * Validates email format.
 * @param {string} email - The email to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength.
 * @param {string} password - The password to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  generateVerificationCode,
  generateSecureToken,
  generateUserId,
  isValidEmail,
  isValidPassword
}; 