// server/routes/downloadRoutes.js
const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const { authenticateAdmin } = require('../middleware/auth');

// Protected — Download leads as CSV with optional filters
router.get('/leads/download', authenticateAdmin, downloadController.downloadLeads);

module.exports = router;
