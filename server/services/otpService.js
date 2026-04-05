// server/services/otpService.js
// In-memory OTP service (mock for development)
// Replace with Twilio/MSG91/Fast2SMS in production

const crypto = require('crypto');

// In-memory OTP store: Map<phone, { otp, expiresAt, attempts }>
const otpStore = new Map();

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const MAX_VERIFY_ATTEMPTS = 5;

/**
 * Generate and store a 6-digit OTP for a phone number
 * @param {string} phone
 * @returns {Object} { success, message, otp (only in dev) }
 */
function generateOTP(phone) {
  // Generate cryptographically random 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + OTP_EXPIRY_MS;

  otpStore.set(phone, { otp, expiresAt, attempts: 0 });

  // In production, send via SMS gateway here
  console.log(`\n📱 OTP for ${phone}: ${otp} (expires in 5 min)\n`);

  return {
    success: true,
    message: 'OTP sent successfully',
    // Only expose OTP in development
    ...(process.env.NODE_ENV !== 'production' && { otp }),
  };
}

/**
 * Verify an OTP for a phone number
 * @param {string} phone
 * @param {string} otp
 * @returns {Object} { success, message }
 */
function verifyOTP(phone, otp) {
  const stored = otpStore.get(phone);

  if (!stored) {
    return { success: false, message: 'No OTP found. Please request a new one.' };
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(phone);
    return { success: false, message: 'OTP has expired. Please request a new one.' };
  }

  if (stored.attempts >= MAX_VERIFY_ATTEMPTS) {
    otpStore.delete(phone);
    return { success: false, message: 'Too many failed attempts. Please request a new OTP.' };
  }

  if (stored.otp !== otp) {
    stored.attempts += 1;
    return { success: false, message: 'Invalid OTP. Please try again.' };
  }

  // Success — delete the OTP
  otpStore.delete(phone);
  return { success: true, message: 'OTP verified successfully' };
}

// Cleanup expired OTPs every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [phone, data] of otpStore.entries()) {
    if (now > data.expiresAt) {
      otpStore.delete(phone);
    }
  }
}, 10 * 60 * 1000);

module.exports = {
  generateOTP,
  verifyOTP,
};
