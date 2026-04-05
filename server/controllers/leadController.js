// server/controllers/leadController.js
// Lead management controller — delegates to airtableService

const airtableService = require('../services/airtableService');
const analyticsService = require('../services/analyticsService');
const config = require('../config/env');

/**
 * POST /api/lead — Create a new lead
 */
async function createLead(req, res) {
  try {
    const { name, email, phone, university, course, source } = req.body;

    // Check for duplicate within 24 hours
    const recentLeads = await airtableService.findRecentLeadByPhone(phone);
    if (recentLeads.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'You have already submitted a request recently. Our counselor will contact you soon.',
      });
    }

    // Create the lead
    const lead = await airtableService.createLead({
      name,
      email,
      phone,
      university,
      course,
      source: source || 'Popup',
      status: 'New',
      createdAt: new Date().toISOString(),
    });

    // Track analytics event
    analyticsService.trackEvent('lead_submit', {
      university,
      course,
      source: source || 'Popup',
      phone: phone.slice(-4), // Only last 4 digits for privacy
    });

    // Build WhatsApp redirect URL if enabled
    let whatsappUrl = null;
    if (config.WHATSAPP_ENABLED) {
      const message = encodeURIComponent(
        `Hi, I am ${name}. I am interested in ${course} from ${university}. Please guide me.`
      );
      whatsappUrl = `https://wa.me/${config.WHATSAPP_NUMBER}?text=${message}`;
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Our counselor will contact you shortly.',
      data: {
        id: lead.id,
        whatsappUrl,
      },
    });
  } catch (error) {
    console.error('Lead creation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
}

/**
 * GET /api/leads — Get all leads with filters and pagination (admin only)
 */
async function getLeads(req, res) {
  try {
    const { university, course, status, search, page = 1, limit = 20 } = req.query;

    const result = await airtableService.getAllLeads({
      university,
      course,
      status,
      search: search ? search.toLowerCase() : undefined,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Get leads error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch leads.',
    });
  }
}

/**
 * PUT /api/lead/:id — Update a lead (admin only)
 */
async function updateLead(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedLead = await airtableService.updateLead(id, updates);

    analyticsService.trackEvent('lead_update', {
      leadId: id,
      updatedFields: Object.keys(updates),
      adminEmail: req.admin.email,
    });

    return res.status(200).json({
      success: true,
      message: 'Lead updated successfully.',
      data: updatedLead,
    });
  } catch (error) {
    console.error('Update lead error:', error);

    if (error.message && error.message.includes('Could not find')) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to update lead.',
    });
  }
}

/**
 * GET /api/leads/filters — Get filter options (admin only)
 */
async function getFilterOptions(req, res) {
  try {
    const options = await airtableService.getFilterOptions();
    return res.status(200).json({
      success: true,
      data: options,
    });
  } catch (error) {
    console.error('Get filter options error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch filter options.',
    });
  }
}

module.exports = {
  createLead,
  getLeads,
  updateLead,
  getFilterOptions,
};
