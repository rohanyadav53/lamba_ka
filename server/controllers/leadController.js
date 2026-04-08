// server/controllers/leadController.js
const Lead = require('../models/Lead');
const analyticsService = require('../services/analyticsService');
const config = require('../config/env');

/**
 * POST /api/lead — Create a new lead
 */
async function createLead(req, res) {
  try {
    const { name, email, phone, university, course, source } = req.body;

    // Check for duplicate within 24 hours
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentLeads = await Lead.find({ phone, createdAt: { $gte: cutoff } });
    
    if (recentLeads.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'You have already submitted a request recently. Our counselor will contact you soon.',
      });
    }

    // Create the lead
    const lead = new Lead({
      name,
      email,
      phone,
      university,
      course,
      source: source || 'Website',
      status: 'New'
    });
    
    await lead.save();

    // Track analytics event
    analyticsService.trackEvent('lead_submit', {
      university,
      course,
      source: source || 'Website',
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
        id: lead._id,
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

    const query = {};
    if (university) query.university = university;
    if (course) query.course = course;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const totalCount = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .lean();

    // Format for frontend (rename _id to id)
    const formattedLeads = leads.map(l => ({
      ...l,
      id: l._id.toString()
    }));

    return res.status(200).json({
      success: true,
      data: {
        leads: formattedLeads,
        totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalCount / parseInt(limit)) || 1
      },
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

    const lead = await Lead.findByIdAndUpdate(id, updates, { new: true }).lean();
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found.',
      });
    }

    analyticsService.trackEvent('lead_update', {
      leadId: id,
      updatedFields: Object.keys(updates),
      adminEmail: req.admin.email,
    });

    return res.status(200).json({
      success: true,
      message: 'Lead updated successfully.',
      data: { ...lead, id: lead._id.toString() },
    });
  } catch (error) {
    console.error('Update lead error:', error);
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
    const [universities, courses, statuses] = await Promise.all([
      Lead.distinct('university'),
      Lead.distinct('course'),
      Lead.distinct('status')
    ]);

    return res.status(200).json({
      success: true,
      data: {
        universities: universities.filter(Boolean),
        courses: courses.filter(Boolean),
        statuses: statuses.filter(Boolean)
      },
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
