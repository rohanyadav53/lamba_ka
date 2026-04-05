// server/controllers/downloadController.js
// CSV export controller for leads

const { Parser } = require('json2csv');
const airtableService = require('../services/airtableService');
const analyticsService = require('../services/analyticsService');

/**
 * GET /api/leads/download — Download leads as CSV with optional filters
 * Query params: university, course, status
 */
async function downloadLeads(req, res) {
  try {
    const { university, course, status } = req.query;

    const leads = await airtableService.getAllLeadsForExport({
      university,
      course,
      status,
    });

    if (leads.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No leads found matching the specified filters.',
      });
    }

    // Define CSV fields
    const fields = [
      { label: 'Name', value: 'name' },
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'University', value: 'university' },
      { label: 'Course', value: 'course' },
      { label: 'Source', value: 'source' },
      { label: 'Status', value: 'status' },
      { label: 'Assigned Counselor', value: 'assignedCounselor' },
      { label: 'Notes', value: 'notes' },
      { label: 'Created At', value: 'createdAt' },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(leads);

    // Generate filename with date
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `shikshavision-leads-${dateStr}.csv`;

    analyticsService.trackEvent('leads_export', {
      format: 'csv',
      count: leads.length,
      filters: { university, course, status },
      adminEmail: req.admin.email,
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(csv);
  } catch (error) {
    console.error('Download leads error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to export leads.',
    });
  }
}

module.exports = {
  downloadLeads,
};
