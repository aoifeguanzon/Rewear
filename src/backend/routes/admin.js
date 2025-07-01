/**
 * @file admin.js
 * @author Huy Le (huyisme-005)
 * @module routes/admin
 * @description Admin routes for managing user access and system administration.
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const { 
  validateAccess, 
  canManageUsers, 
  canViewLogs, 
  logAccess 
} = require('../middleware/accessControl');
const {
  addAuthorizedUser,
  removeAuthorizedUser,
  getAuthorizedUsers,
  updateUserAccessLevel,
  ACCESS_LEVELS
} = require('../config/userAccess');

const router = express.Router();

/**
 * @function
 * @name GET /api/admin/users
 * @description Get all authorized users (admin only).
 * @access Private (Admin)
 */
router.get('/users', validateAccess, canManageUsers, logAccess, async (req, res) => {
  try {
    const users = getAuthorizedUsers();
    res.json({
      success: true,
      users,
      total: users.length
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to retrieve users'
    });
  }
});

/**
 * @function
 * @name POST /api/admin/users
 * @description Add a new authorized user (admin only).
 * @access Private (Admin)
 */
router.post('/users', [
  validateAccess,
  canManageUsers,
  logAccess,
  body('accessKeyId').notEmpty().withMessage('Access Key ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('accessLevel').isIn(Object.values(ACCESS_LEVELS)).withMessage('Invalid access level')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { accessKeyId, name, email, accessLevel } = req.body;

    const success = addAuthorizedUser(accessKeyId, {
      name,
      email,
      accessLevel
    });

    if (!success) {
      return res.status(409).json({
        error: 'User already exists',
        message: 'A user with this Access Key ID already exists'
      });
    }

    res.status(201).json({
      success: true,
      message: 'User added successfully',
      user: {
        accessKeyId: accessKeyId.substring(0, 8) + '...',
        name,
        email,
        accessLevel
      }
    });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to add user'
    });
  }
});

/**
 * @function
 * @name PUT /api/admin/users/:accessKeyId
 * @description Update user access level (admin only).
 * @access Private (Admin)
 */
router.put('/users/:accessKeyId', [
  validateAccess,
  canManageUsers,
  logAccess,
  body('accessLevel').isIn(Object.values(ACCESS_LEVELS)).withMessage('Invalid access level')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { accessKeyId } = req.params;
    const { accessLevel } = req.body;

    const success = updateUserAccessLevel(accessKeyId, accessLevel);

    if (!success) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with this Access Key ID not found'
      });
    }

    res.json({
      success: true,
      message: 'User access level updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to update user'
    });
  }
});

/**
 * @function
 * @name DELETE /api/admin/users/:accessKeyId
 * @description Remove authorized user (admin only).
 * @access Private (Admin)
 */
router.delete('/users/:accessKeyId', validateAccess, canManageUsers, logAccess, async (req, res) => {
  try {
    const { accessKeyId } = req.params;

    const success = removeAuthorizedUser(accessKeyId);

    if (!success) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with this Access Key ID not found'
      });
    }

    res.json({
      success: true,
      message: 'User removed successfully'
    });
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to remove user'
    });
  }
});

/**
 * @function
 * @name GET /api/admin/access-levels
 * @description Get available access levels (admin only).
 * @access Private (Admin)
 */
router.get('/access-levels', validateAccess, canManageUsers, logAccess, async (req, res) => {
  try {
    res.json({
      success: true,
      accessLevels: ACCESS_LEVELS
    });
  } catch (error) {
    console.error('Error getting access levels:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to retrieve access levels'
    });
  }
});

/**
 * @function
 * @name GET /api/admin/system-info
 * @description Get system information (admin only).
 * @access Private (Admin)
 */
router.get('/system-info', validateAccess, canViewLogs, logAccess, async (req, res) => {
  try {
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      systemInfo
    });
  } catch (error) {
    console.error('Error getting system info:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to retrieve system information'
    });
  }
});

module.exports = router; 