/**
 * @file accessControl.js
 * @author Huy Le (huyisme-005)
 * @module middleware/accessControl
 * @description Middleware for controlling access to DynamoDB operations based on user permissions.
 */

const { validateUserAccess, hasPermission } = require('../config/userAccess');

/**
 * Middleware to validate AWS credentials and user access
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const validateAccess = (req, res, next) => {
  // Extract AWS credentials from request headers or environment
  const accessKeyId = req.headers['x-access-key-id'] || process.env.AWS_ACCESS_KEY_ID;
  
  if (!accessKeyId) {
    return res.status(401).json({
      error: 'Access denied',
      message: 'AWS Access Key ID is required'
    });
  }

  // Validate user access
  const user = validateUserAccess(accessKeyId);
  if (!user) {
    return res.status(403).json({
      error: 'Access denied',
      message: 'User not authorized to access this resource'
    });
  }

  // Attach user info to request
  req.accessUser = user;
  req.accessKeyId = accessKeyId;
  
  next();
};

/**
 * Middleware to check specific permissions
 * @param {string} permission - The permission to check
 * @returns {Function} Express middleware function
 */
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.accessKeyId) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Authentication required'
      });
    }

    if (!hasPermission(req.accessKeyId, permission)) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        message: `Permission '${permission}' is required for this operation`
      });
    }

    next();
  };
};

/**
 * Middleware to check if user can create records
 */
const canCreate = requirePermission('canCreate');

/**
 * Middleware to check if user can read records
 */
const canRead = requirePermission('canRead');

/**
 * Middleware to check if user can update records
 */
const canUpdate = requirePermission('canUpdate');

/**
 * Middleware to check if user can delete records
 */
const canDelete = requirePermission('canDelete');

/**
 * Middleware to check if user can manage other users
 */
const canManageUsers = requirePermission('canManageUsers');

/**
 * Middleware to check if user can view logs
 */
const canViewLogs = requirePermission('canViewLogs');

/**
 * Middleware to log access attempts
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const logAccess = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;
  const user = req.accessUser?.name || 'Unknown';
  const accessLevel = req.accessUser?.accessLevel || 'Unknown';
  // Use req.socket.remoteAddress instead of deprecated req.connection.remoteAddress
  const ip = req.ip || req.socket.remoteAddress;

  console.log(`[${timestamp}] ${method} ${path} - User: ${user} (${accessLevel}) - IP: ${ip}`);
  
  next();
};

module.exports = {
  validateAccess,
  requirePermission,
  canCreate,
  canRead,
  canUpdate,
  canDelete,
  canManageUsers,
  canViewLogs,
  logAccess
}; 