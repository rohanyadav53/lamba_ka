// server/controllers/otpController.js
// OTP controller for student phone-based authentication

const jwt = require('jsonwebtoken');
const otpService = require('../services/otpService');
const analyticsService = require('../services/analyticsService');
const config = require('../config/env');

/**
 * POST /api/otp/send — Send OTP to phone number
 */
async function sendOtp(req, res) {
  try {
    const { phone } = req.body;

    const result = otpService.generateOTP(phone);

    analyticsService.trackEvent('otp_sent', {
      phone: phone.slice(-4),
    });

    return res.status(200).json({
      success: result.success,
      message: result.message,
      // Include OTP in response only in dev mode
      ...(process.env.NODE_ENV !== 'production' && { otp: result.otp }),
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.',
    });
  }
}

/**
 * POST /api/otp/verify — Verify OTP and return JWT
 */
async function verifyOtp(req, res) {
  try {
    const { phone, otp } = req.body;

    const result = otpService.verifyOTP(phone, otp);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    // Generate JWT for the student
    const token = jwt.sign(
      { phone, role: 'student' },
      config.JWT_SECRET,
      { expiresIn: '7d' }
    );

    analyticsService.trackEvent('student_login', {
      phone: phone.slice(-4),
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        token,
        user: { phone, role: 'student' },
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'Verification failed. Please try again.',
    });
  }
}

module.exports = {
  sendOtp,
  verifyOtp,
};
