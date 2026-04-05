// server/services/airtableService.js
// Abstracted data layer — uses Airtable when configured, falls back to in-memory store
// Easily replaceable with PostgreSQL/MongoDB later — all DB operations go through this service

const config = require('../config/env');

// Check if Airtable is properly configured
const isAirtableConfigured =
  config.AIRTABLE_API_KEY &&
  config.AIRTABLE_BASE_ID &&
  !config.AIRTABLE_API_KEY.includes('YOUR_') &&
  !config.AIRTABLE_BASE_ID.includes('YOUR_');

let table = null;

if (isAirtableConfigured) {
  const Airtable = require('airtable');
  const base = new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base(config.AIRTABLE_BASE_ID);
  table = base(config.AIRTABLE_TABLE_NAME);
  console.log('✅ Airtable connected');
} else {
  console.log('📦 Using in-memory lead storage (configure Airtable in .env for persistence)');
}

// ── In-Memory Fallback Store ─────────────────────────────────────────────────
const memoryStore = [];
let memoryIdCounter = 1;

function generateMemoryId() {
  return `rec_mem_${memoryIdCounter++}`;
}

// ── CREATE ───────────────────────────────────────────────────────────────────

async function createLead(leadData) {
  if (isAirtableConfigured) {
    const record = await table.create([
      {
        fields: {
          Name: leadData.name,
          Email: leadData.email,
          Phone: leadData.phone,
          University: leadData.university,
          Course: leadData.course,
          Source: leadData.source || 'Popup',
          Status: leadData.status || 'New',
          AssignedCounselor: leadData.assignedCounselor || '',
          ContactedBy: leadData.contactedBy || '',
          Notes: leadData.notes || '',
          CreatedAt: leadData.createdAt || new Date().toISOString(),
        },
      },
    ]);
    return formatAirtableRecord(record[0]);
  }

  // In-memory fallback
  const lead = {
    id: generateMemoryId(),
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone,
    university: leadData.university,
    course: leadData.course,
    source: leadData.source || 'Popup',
    status: leadData.status || 'New',
    assignedCounselor: leadData.assignedCounselor || '',
    contactedBy: leadData.contactedBy || '',
    notes: leadData.notes || '',
    createdAt: leadData.createdAt || new Date().toISOString(),
  };
  memoryStore.unshift(lead); // Add to front (newest first)
  return lead;
}

// ── FIND BY PHONE ────────────────────────────────────────────────────────────

async function findLeadByPhone(phone) {
  if (isAirtableConfigured) {
    const records = await table
      .select({
        filterByFormula: `{Phone} = '${sanitizeForFormula(phone)}'`,
        maxRecords: 10,
        sort: [{ field: 'CreatedAt', direction: 'desc' }],
      })
      .firstPage();
    return records.map(formatAirtableRecord);
  }

  return memoryStore.filter((l) => l.phone === phone);
}

// ── FIND RECENT BY PHONE (24h duplicate check) ──────────────────────────────

async function findRecentLeadByPhone(phone) {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  if (isAirtableConfigured) {
    const records = await table
      .select({
        filterByFormula: `AND({Phone} = '${sanitizeForFormula(phone)}', {CreatedAt} >= '${cutoff}')`,
        maxRecords: 1,
      })
      .firstPage();
    return records.map(formatAirtableRecord);
  }

  return memoryStore.filter((l) => l.phone === phone && l.createdAt >= cutoff);
}

// ── GET ALL LEADS (paginated + filtered) ─────────────────────────────────────

async function getAllLeads(options = {}) {
  const { university, course, status, search, page = 1, limit = 20 } = options;

  if (isAirtableConfigured) {
    const conditions = [];
    if (university) conditions.push(`{University} = '${sanitizeForFormula(university)}'`);
    if (course) conditions.push(`{Course} = '${sanitizeForFormula(course)}'`);
    if (status) conditions.push(`{Status} = '${sanitizeForFormula(status)}'`);
    if (search) {
      const s = sanitizeForFormula(search);
      conditions.push(`OR(FIND('${s}', {Phone}), FIND('${s}', {Email}), FIND('${s}', LOWER({Name})))`);
    }

    const filterByFormula = conditions.length > 0
      ? (conditions.length === 1 ? conditions[0] : `AND(${conditions.join(', ')})`)
      : '';

    const allRecords = [];
    await table
      .select({ filterByFormula, sort: [{ field: 'CreatedAt', direction: 'desc' }] })
      .eachPage((records, fetchNextPage) => {
        allRecords.push(...records);
        fetchNextPage();
      });

    const totalCount = allRecords.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;

    return {
      leads: allRecords.slice(startIndex, startIndex + limit).map(formatAirtableRecord),
      totalCount,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages,
    };
  }

  // In-memory fallback with filtering
  let filtered = [...memoryStore];

  if (university) filtered = filtered.filter((l) => l.university === university);
  if (course) filtered = filtered.filter((l) => l.course === course);
  if (status) filtered = filtered.filter((l) => l.status === status);
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (l) => l.name.toLowerCase().includes(s) || l.email.toLowerCase().includes(s) || l.phone.includes(s)
    );
  }

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / limit) || 1;
  const startIndex = (page - 1) * limit;

  return {
    leads: filtered.slice(startIndex, startIndex + limit),
    totalCount,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    totalPages,
  };
}

// ── EXPORT ALL (for CSV) ─────────────────────────────────────────────────────

async function getAllLeadsForExport(filters = {}) {
  const { university, course, status } = filters;

  if (isAirtableConfigured) {
    const conditions = [];
    if (university) conditions.push(`{University} = '${sanitizeForFormula(university)}'`);
    if (course) conditions.push(`{Course} = '${sanitizeForFormula(course)}'`);
    if (status) conditions.push(`{Status} = '${sanitizeForFormula(status)}'`);

    const filterByFormula = conditions.length > 0
      ? (conditions.length === 1 ? conditions[0] : `AND(${conditions.join(', ')})`)
      : '';

    const allRecords = [];
    await table
      .select({ filterByFormula, sort: [{ field: 'CreatedAt', direction: 'desc' }] })
      .eachPage((records, fetchNextPage) => {
        allRecords.push(...records);
        fetchNextPage();
      });

    return allRecords.map(formatAirtableRecord);
  }

  let filtered = [...memoryStore];
  if (university) filtered = filtered.filter((l) => l.university === university);
  if (course) filtered = filtered.filter((l) => l.course === course);
  if (status) filtered = filtered.filter((l) => l.status === status);
  return filtered;
}

// ── UPDATE LEAD ──────────────────────────────────────────────────────────────

async function updateLead(id, updates) {
  if (isAirtableConfigured) {
    const fields = {};
    if (updates.status !== undefined) fields.Status = updates.status;
    if (updates.notes !== undefined) fields.Notes = updates.notes;
    if (updates.assignedCounselor !== undefined) fields.AssignedCounselor = updates.assignedCounselor;
    if (updates.contactedBy !== undefined) fields.ContactedBy = updates.contactedBy;

    const record = await table.update([{ id, fields }]);
    return formatAirtableRecord(record[0]);
  }

  // In-memory fallback
  const lead = memoryStore.find((l) => l.id === id);
  if (!lead) throw new Error('Could not find record');

  if (updates.status !== undefined) lead.status = updates.status;
  if (updates.notes !== undefined) lead.notes = updates.notes;
  if (updates.assignedCounselor !== undefined) lead.assignedCounselor = updates.assignedCounselor;
  if (updates.contactedBy !== undefined) lead.contactedBy = updates.contactedBy;

  return lead;
}

// ── FILTER OPTIONS ───────────────────────────────────────────────────────────

async function getFilterOptions() {
  if (isAirtableConfigured) {
    const allRecords = [];
    await table
      .select({ fields: ['University', 'Course', 'Status'] })
      .eachPage((records, fetchNextPage) => {
        allRecords.push(...records);
        fetchNextPage();
      });

    return {
      universities: [...new Set(allRecords.map((r) => r.get('University')).filter(Boolean))],
      courses: [...new Set(allRecords.map((r) => r.get('Course')).filter(Boolean))],
      statuses: [...new Set(allRecords.map((r) => r.get('Status')).filter(Boolean))],
    };
  }

  return {
    universities: [...new Set(memoryStore.map((l) => l.university).filter(Boolean))],
    courses: [...new Set(memoryStore.map((l) => l.course).filter(Boolean))],
    statuses: [...new Set(memoryStore.map((l) => l.status).filter(Boolean))],
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatAirtableRecord(record) {
  return {
    id: record.id,
    name: record.get('Name') || '',
    email: record.get('Email') || '',
    phone: record.get('Phone') || '',
    university: record.get('University') || '',
    course: record.get('Course') || '',
    source: record.get('Source') || 'Popup',
    status: record.get('Status') || 'New',
    assignedCounselor: record.get('AssignedCounselor') || '',
    contactedBy: record.get('ContactedBy') || '',
    notes: record.get('Notes') || '',
    createdAt: record.get('CreatedAt') || '',
  };
}

function sanitizeForFormula(str) {
  return String(str).replace(/'/g, "\\'");
}

module.exports = {
  createLead,
  findLeadByPhone,
  findRecentLeadByPhone,
  getAllLeads,
  getAllLeadsForExport,
  updateLead,
  getFilterOptions,
};
