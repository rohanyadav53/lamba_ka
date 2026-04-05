// server/routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { authenticateAdmin } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { createLeadSchema, updateLeadSchema } = require('../validators/leadValidator');
const { leadRateLimiter } = require('../middleware/rateLimiter');

// Public — Submit a lead (rate limited)
router.post('/lead', leadRateLimiter, validate(createLeadSchema), leadController.createLead);

// Admin — Get leads with pagination and filters
router.get('/leads', authenticateAdmin, leadController.getLeads);

// Admin — Get filter options for dropdowns
router.get('/leads/filters', authenticateAdmin, leadController.getFilterOptions);

// Admin — Update a lead
router.put('/lead/:id', authenticateAdmin, validate(updateLeadSchema), leadController.updateLead);

module.exports = router;
