/**
 * @file auth.js
 * @author Huy Le (huyisme-005)
 * @module middleware/auth
 * @description Express middleware for authentication and authorization using JWT.
 */
const { verifyToken } = require('../utils/auth');
const { getUserById } = require('../config/database');

/**
 * Middleware to verify JWT token in Authorization header.
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      error: 'Access token required',
      message: 'Please provide a valid authentication token' 
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ 
      error: 'Invalid token',
      message: 'Your session has expired. Please log in again.' 
    });
  }

  // Fetch user from DB and attach to req.user
  try {
    const user = await getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found', message: 'User does not exist' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Server error', message: 'Failed to fetch user from database' });
  }
};

/**
 * Middleware to check if user is verified (email confirmed).
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const requireVerifiedUser = (req, res, next) => {
  if (!req.user.isEmailVerified) {
    return res.status(403).json({ 
      error: 'Email not verified',
      message: 'Please verify your email address before accessing this resource' 
    });
  }
  next();
};

/**
 * Middleware for optional authentication (attaches user if token is present).
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
    }
  }

  next();
};

module.exports = {
  authenticateToken,
  requireVerifiedUser,
  optionalAuth
}; 