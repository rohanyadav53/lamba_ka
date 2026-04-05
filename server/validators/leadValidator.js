// server/validators/leadValidator.js
const Joi = require('joi');

const createLeadSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required()
    .messages({ 'string.empty': 'Name is required', 'string.min': 'Name must be at least 2 characters' }),

  email: Joi.string().trim().email().required()
    .messages({ 'string.email': 'Please enter a valid email address' }),

  phone: Joi.string().trim().pattern(/^[6-9]\d{9}$/).required()
    .messages({ 'string.pattern.base': 'Please enter a valid 10-digit Indian mobile number' }),

  university: Joi.string().trim().min(1).max(200).required()
    .messages({ 'string.empty': 'University is required' }),

  course: Joi.string().trim().min(1).max(200).required()
    .messages({ 'string.empty': 'Course is required' }),

  source: Joi.string().trim().max(200).default('Popup'),
});

const updateLeadSchema = Joi.object({
  status: Joi.string().valid('New', 'Contacted', 'Converted').optional(),
  notes: Joi.string().trim().max(2000).allow('').optional(),
  assignedCounselor: Joi.string().trim().max(200).allow('').optional(),
  contactedBy: Joi.string().trim().max(200).allow('').optional(),
}).min(1).messages({ 'object.min': 'At least one field must be provided to update' });

module.exports = {
  createLeadSchema,
  updateLeadSchema,
};
