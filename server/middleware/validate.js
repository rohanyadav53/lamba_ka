// server/middleware/validate.js
// Generic Joi validation middleware factory

/**
 * Creates a validation middleware for a given Joi schema
 * @param {Joi.ObjectSchema} schema - Joi validation schema
 * @returns {Function} Express middleware
 */
function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,    // Return all errors, not just the first
      stripUnknown: true,   // Remove unknown fields (input sanitization)
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/"/g, ''),
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    // Replace body with validated and sanitized data
    req.body = value;
    next();
  };
}

module.exports = { validate };
