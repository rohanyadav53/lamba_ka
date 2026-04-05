// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { adminLoginSchema, resetPasswordSchema } = require('../validators/adminValidator');
const { loginRateLimiter } = require('../middleware/rateLimiter');

// Public — Admin login (rate limited)
router.post('/admin/login', loginRateLimiter, validate(adminLoginSchema), adminController.login);

// Protected — Reset admin password
router.post('/admin/reset-password', authenticateAdmin, validate(resetPasswordSchema), adminController.resetPassword);

// Protected — Get admin profile
router.get('/admin/me', authenticateAdmin, adminController.getMe);

module.exports = router;
