// server/services/analyticsService.js
// Structured analytics logging service
// Designed to be replaceable with a real analytics DB (PostgreSQL, InfluxDB, etc.)

const fs = require('fs');
const path = require('path');

// In-memory event buffer
const eventBuffer = [];
const MAX_BUFFER_SIZE = 1000;

// Log file path
const LOG_DIR = path.resolve(__dirname, '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'analytics.jsonl');

// Ensure log directory exists ONLY if not on Vercel
if (!process.env.VERCEL) {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

/**
 * Track an analytics event
 * @param {string} eventType - e.g. 'lead_submit', 'university_click', 'admin_login'
 * @param {Object} data - Event metadata
 */
function trackEvent(eventType, data = {}) {
  const event = {
    eventType,
    timestamp: new Date().toISOString(),
    data,
  };

  // Add to in-memory buffer
  eventBuffer.push(event);
  if (eventBuffer.length > MAX_BUFFER_SIZE) {
    eventBuffer.shift(); // Remove oldest event
  }

  // File system writing ONLY if not on Vercel
  if (!process.env.VERCEL) {
    try {
      fs.appendFileSync(LOG_FILE, JSON.stringify(event) + '\n');
    } catch (err) {
      console.error('Analytics write error:', err.message);
    }
  }

  // Ensure visibility in serverless (Vercel Runtime Logs) or local dev
  if (process.env.VERCEL || process.env.NODE_ENV !== 'production') {
    console.info(`📊 [Analytics] ${eventType}:`, JSON.stringify(data));
  }
}

/**
 * Get recent events from buffer
 * @param {string} eventType - Optional filter by event type
 * @param {number} limit - Max events to return
 * @returns {Array}
 */
function getRecentEvents(eventType = null, limit = 50) {
  let events = eventBuffer;
  if (eventType) {
    events = events.filter((e) => e.eventType === eventType);
  }
  return events.slice(-limit);
}

/**
 * Get basic analytics summary
 * @returns {Object}
 */
function getSummary() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

  const todayEvents = eventBuffer.filter((e) => e.timestamp >= todayStart);

  return {
    totalEventsInBuffer: eventBuffer.length,
    todayEvents: todayEvents.length,
    todayLeadSubmissions: todayEvents.filter((e) => e.eventType === 'lead_submit').length,
    todayUniversityClicks: todayEvents.filter((e) => e.eventType === 'university_click').length,
  };
}

module.exports = {
  trackEvent,
  getRecentEvents,
  getSummary,
};
