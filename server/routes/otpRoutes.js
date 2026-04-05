// server/routes/otpRoutes.js
const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');
const { validate } = require('../middleware/validate');
const { sendOtpSchema, verifyOtpSchema } = require('../validators/otpValidator');
const { otpRateLimiter } = require('../middleware/rateLimiter');

// Public — Send OTP (rate limited)
router.post('/otp/send', otpRateLimiter, validate(sendOtpSchema), otpController.sendOtp);

// Public — Verify OTP
router.post('/otp/verify', validate(verifyOtpSchema), otpController.verifyOtp);

module.exports = router;
