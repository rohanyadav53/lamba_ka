// server/validators/otpValidator.js
const Joi = require('joi');

const sendOtpSchema = Joi.object({
  phone: Joi.string().trim().pattern(/^[6-9]\d{9}$/).required()
    .messages({ 'string.pattern.base': 'Please enter a valid 10-digit Indian mobile number' }),
});

const verifyOtpSchema = Joi.object({
  phone: Joi.string().trim().pattern(/^[6-9]\d{9}$/).required()
    .messages({ 'string.pattern.base': 'Please enter a valid 10-digit Indian mobile number' }),

  otp: Joi.string().trim().length(6).pattern(/^\d{6}$/).required()
    .messages({ 'string.pattern.base': 'OTP must be a 6-digit number' }),
});

module.exports = {
  sendOtpSchema,
  verifyOtpSchema,
};
