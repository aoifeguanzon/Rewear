/**
 * @file auth.js
 * @author Huy Le (huyisme-005)
 * @module routes/auth
 * @description Express routes for authentication, user registration, email verification, and login.
 */
const express = require('express');
const { body, validationResult } = require('express-validator');
const { 
  hashPassword, 
  comparePassword, 
  generateToken, 
  generateVerificationCode, 
  generateUserId,
  isValidEmail,
  isValidPassword 
} = require('../utils/auth');
const { 
  createUser, 
  getUserByEmail, 
  getUserById, 
  updateUser 
} = require('../config/database');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../config/email');
const { authenticateToken } = require('../middleware/auth');
const { validateAccess, canCreate, canRead, canUpdate, logAccess } = require('../middleware/accessControl');

/**
 * Express router for authentication routes.
 * @type {import('express').Router}
 */
const router = express.Router();

/**
 * @function
 * @name POST /api/auth/signup
 * @description Register a new user and send verification code.
 * @access Public
 */
router.post('/signup', [
  validateAccess,
  canCreate,
  logAccess,
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array() 
      });
    }

    const { username, email, password } = req.body;

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format',
        message: 'Please provide a valid email address' 
      });
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      return res.status(400).json({ 
        error: 'Weak password',
        message: 'Password must be at least 8 characters with uppercase, lowercase, and number' 
      });
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ 
        error: 'User already exists',
        message: 'An account with this email already exists' 
      });
    }

    // Generate user data
    const userId = generateUserId(email);
    const passwordHash = await hashPassword(password);
    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

    const userData = {
      userId,
      username,
      email: email.toLowerCase(),
      passwordHash,
      isEmailVerified: false,
      verificationCode,
      verificationExpires: expiresAt,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    // Create user in database
    await createUser(userData);

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      success: true,
      message: 'Account created successfully. Please check your email for verification code.',
      userId
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to create account. Please try again.' 
    });
  }
});

/**
 * @function
 * @name POST /api/auth/verify-email
 * @description Verify user email with code.
 * @access Public
 */
router.post('/verify-email', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('code').isLength({ min: 6, max: 6 }).withMessage('Verification code must be 6 digits')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array() 
      });
    }

    const { email, code } = req.body;

    // Get user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'No account found with this email address' 
      });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return res.status(400).json({ 
        error: 'Already verified',
        message: 'Email is already verified' 
      });
    }

    // Check if code matches
    if (user.verificationCode !== code) {
      return res.status(400).json({ 
        error: 'Invalid code',
        message: 'Invalid verification code' 
      });
    }

    // Check if code is expired
    if (new Date() > new Date(user.verificationExpires)) {
      return res.status(400).json({ 
        error: 'Code expired',
        message: 'Verification code has expired. Please request a new one.' 
      });
    }

    // Update user to verified
    await updateUser(user.userId, {
      isEmailVerified: true,
      verificationCode: null,
      verificationExpires: null
    });

    // Generate token
    const token = generateToken(user.userId, user.email);

    res.json({
      success: true,
      message: 'Email verified successfully',
      token,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        isEmailVerified: true
      }
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to verify email. Please try again.' 
    });
  }
});

/**
 * @function
 * @name POST /api/auth/resend-verification
 * @description Resend verification code to user's email.
 * @access Public
 */
router.post('/resend-verification', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array() 
      });
    }

    const { email } = req.body;

    // Get user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'No account found with this email address' 
      });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return res.status(400).json({ 
        error: 'Already verified',
        message: 'Email is already verified' 
      });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Update user with new code
    await updateUser(user.userId, {
      verificationCode,
      verificationExpires: expiresAt
    });

    // Send new verification email
    await sendVerificationEmail(email, verificationCode);

    res.json({
      success: true,
      message: 'Verification email sent successfully'
    });

  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to send verification email. Please try again.' 
    });
  }
});

/**
 * @function
 * @name POST /api/auth/login
 * @description Login user and return JWT token if verified.
 * @access Public
 */
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Get user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Invalid email or password' 
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ 
        error: 'Account deactivated',
        message: 'Your account has been deactivated' 
      });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Invalid email or password' 
      });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(403).json({ 
        error: 'Email not verified',
        message: 'Please verify your email address before logging in',
        needsVerification: true
      });
    }

    // Generate token
    const token = generateToken(user.userId, user.email);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to login. Please try again.' 
    });
  }
});

/**
 * @function
 * @name GET /api/auth/me
 * @description Get current user profile (requires authentication).
 * @access Private
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await getUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to get profile. Please try again.' 
    });
  }
});

/**
 * @function
 * @name GET /api/auth/test-auth
 * @description Test route to verify JWT authentication and DB connection.
 * @access Protected
 */
router.get('/test-auth', authenticateToken, (req, res) => {
  res.json({
    message: 'Authenticated and user loaded from DB!',
    user: req.user
  });
});

module.exports = router;