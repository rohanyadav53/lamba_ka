// server/controllers/adminController.js
// Admin authentication controller

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/env');
const analyticsService = require('../services/analyticsService');

// In-memory admin password hash (can be updated at runtime via reset)
let currentPasswordHash = config.ADMIN_PASSWORD_HASH;

/**
 * POST /api/admin/login — Admin login with email + password
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Verify email
    if (email.toLowerCase() !== config.ADMIN_EMAIL.toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, currentPasswordHash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Generate admin JWT
    const token = jwt.sign(
      { email: config.ADMIN_EMAIL, role: 'admin' },
      config.JWT_SECRET,
      { expiresIn: '24h' }
    );

    analyticsService.trackEvent('admin_login', {
      email: config.ADMIN_EMAIL,
    });

    return res.status(200).json({
      success: true,
      message: 'Admin login successful!',
      data: {
        token,
        user: {
          email: config.ADMIN_EMAIL,
          role: 'admin',
        },
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
    });
  }
}

/**
 * POST /api/admin/reset-password — Reset admin password
 * Requires current admin JWT
 */
async function resetPassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, currentPasswordHash);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect.',
      });
    }

    // Hash new password and update in-memory
    const newHash = await bcrypt.hash(newPassword, 10);
    currentPasswordHash = newHash;

    analyticsService.trackEvent('admin_password_reset', {
      email: req.admin.email,
    });

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully. Note: This change is in-memory and will reset on server restart.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Password reset failed.',
    });
  }
}

/**
 * GET /api/admin/me — Get current admin info
 */
async function getMe(req, res) {
  return res.status(200).json({
    success: true,
    data: {
      email: req.admin.email,
      role: req.admin.role,
    },
  });
}

module.exports = {
  login,
  resetPassword,
  getMe,
};
