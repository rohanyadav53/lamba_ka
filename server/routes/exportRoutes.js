// server/routes/exportRoutes.js
// GET /api/leads/export — Public CSV export using MongoDB
const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

/**
 * GET /api/leads/export
 * Public endpoint to fetch all leads from MongoDB and return a CSV string.
 */
router.get('/leads/export', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();

    if (leads.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No leads found in database.',
      });
    }

    // Build CSV manually
    const csvFields = ['Name', 'Email', 'Phone', 'Course', 'University', 'Source', 'Status', 'CreatedAt'];
    const csvHeader = csvFields.join(',');

    const csvRows = leads.map((record) => {
      return [
        `"${String(record.name || '').replace(/"/g, '""')}"`,
        `"${String(record.email || '').replace(/"/g, '""')}"`,
        `"${String(record.phone || '').replace(/"/g, '""')}"`,
        `"${String(record.course || '').replace(/"/g, '""')}"`,
        `"${String(record.university || '').replace(/"/g, '""')}"`,
        `"${String(record.source || '').replace(/"/g, '""')}"`,
        `"${String(record.status || '').replace(/"/g, '""')}"`,
        `"${(record.createdAt ? new Date(record.createdAt).toISOString() : '').replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvString = [csvHeader, ...csvRows].join('\n');
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `shikshavision-leads-${dateStr}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(csvString);
  } catch (error) {
    console.error('Export leads error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal error while exporting leads.',
    });
  }
});

module.exports = router;
