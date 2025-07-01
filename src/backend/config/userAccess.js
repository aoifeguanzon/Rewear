/**
 * @file userAccess.js
 * @author Huy Le (huyisme-005)
 * @module config/userAccess
 * @description Manages user access permissions for DynamoDB table access.
 */

/**
 * Access levels for different user types
 */
const ACCESS_LEVELS = {
  ADMIN: 'admin',
  DEVELOPER: 'developer',
  VIEWER: 'viewer',
  READONLY: 'readonly'
};

/**
 * Permissions for each access level
 */
const PERMISSIONS = {
  [ACCESS_LEVELS.ADMIN]: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
    canManageUsers: true,
    canViewLogs: true
  },
  [ACCESS_LEVELS.DEVELOPER]: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: false,
    canManageUsers: false,
    canViewLogs: false
  },
  [ACCESS_LEVELS.VIEWER]: {
    canCreate: false,
    canRead: true,
    canUpdate: false,
    canDelete: false,
    canManageUsers: false,
    canViewLogs: false
  },
  [ACCESS_LEVELS.READONLY]: {
    canCreate: false,
    canRead: true,
    canUpdate: false,
    canDelete: false,
    canManageUsers: false,
    canViewLogs: false
  }
};

/**
 * Authorized users with their access levels
 * In production, this should be stored in a secure database
 */
const AUTHORIZED_USERS = new Map([
  // Format: [accessKeyId, { accessLevel, name, email, lastAccess }]
  ['your-admin-access-key', { 
    accessLevel: ACCESS_LEVELS.ADMIN, 
    name: 'Admin User',
    email: 'admin@rewear.com',
    lastAccess: null
  }],
  ['your-developer-access-key', { 
    accessLevel: ACCESS_LEVELS.DEVELOPER, 
    name: 'Developer User',
    email: 'dev@rewear.com',
    lastAccess: null
  }],
  ['your-viewer-access-key', { 
    accessLevel: ACCESS_LEVELS.VIEWER, 
    name: 'Viewer User',
    email: 'viewer@rewear.com',
    lastAccess: null
  }]
]);

/**
 * Validates if a user has access to the system
 * @param {string} accessKeyId - The AWS access key ID
 * @returns {Object|null} User info if authorized, null otherwise
 */
const validateUserAccess = (accessKeyId) => {
  const user = AUTHORIZED_USERS.get(accessKeyId);
  if (user) {
    user.lastAccess = new Date().toISOString();
    return user;
  }
  return null;
};

/**
 * Checks if a user has specific permission
 * @param {string} accessKeyId - The AWS access key ID
 * @param {string} permission - The permission to check
 * @returns {boolean} True if user has permission
 */
const hasPermission = (accessKeyId, permission) => {
  const user = validateUserAccess(accessKeyId);
  if (!user) return false;
  
  const userPermissions = PERMISSIONS[user.accessLevel];
  return userPermissions && userPermissions[permission] === true;
};

/**
 * Adds a new authorized user
 * @param {string} accessKeyId - The AWS access key ID
 * @param {Object} userInfo - User information
 * @returns {boolean} True if added successfully
 */
const addAuthorizedUser = (accessKeyId, userInfo) => {
  if (AUTHORIZED_USERS.has(accessKeyId)) {
    return false; // User already exists
  }
  
  AUTHORIZED_USERS.set(accessKeyId, {
    accessLevel: userInfo.accessLevel || ACCESS_LEVELS.VIEWER,
    name: userInfo.name,
    email: userInfo.email,
    lastAccess: null
  });
  
  return true;
};

/**
 * Removes an authorized user
 * @param {string} accessKeyId - The AWS access key ID
 * @returns {boolean} True if removed successfully
 */
const removeAuthorizedUser = (accessKeyId) => {
  return AUTHORIZED_USERS.delete(accessKeyId);
};

/**
 * Gets all authorized users (admin only)
 * @returns {Array} List of authorized users
 */
const getAuthorizedUsers = () => {
  const users = [];
  for (const [accessKeyId, userInfo] of AUTHORIZED_USERS.entries()) {
    users.push({
      accessKeyId: accessKeyId.substring(0, 8) + '...', // Mask for security
      ...userInfo
    });
  }
  return users;
};

/**
 * Updates user access level
 * @param {string} accessKeyId - The AWS access key ID
 * @param {string} newAccessLevel - New access level
 * @returns {boolean} True if updated successfully
 */
const updateUserAccessLevel = (accessKeyId, newAccessLevel) => {
  const user = AUTHORIZED_USERS.get(accessKeyId);
  if (!user || !PERMISSIONS[newAccessLevel]) {
    return false;
  }
  
  user.accessLevel = newAccessLevel;
  return true;
};

module.exports = {
  ACCESS_LEVELS,
  PERMISSIONS,
  validateUserAccess,
  hasPermission,
  addAuthorizedUser,
  removeAuthorizedUser,
  getAuthorizedUsers,
  updateUserAccessLevel
}; 