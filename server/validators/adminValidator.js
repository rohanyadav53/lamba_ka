// server/validators/adminValidator.js
const Joi = require('joi');

const adminLoginSchema = Joi.object({
  email: Joi.string().trim().email().required()
    .messages({ 'string.email': 'Please enter a valid email address' }),

  password: Joi.string().trim().min(6).required()
    .messages({ 'string.min': 'Password must be at least 6 characters' }),
});

const resetPasswordSchema = Joi.object({
  currentPassword: Joi.string().trim().min(6).required()
    .messages({ 'string.min': 'Current password must be at least 6 characters' }),

  newPassword: Joi.string().trim().min(8).required()
    .messages({ 'string.min': 'New password must be at least 8 characters' }),
});

module.exports = {
  adminLoginSchema,
  resetPasswordSchema,
};
