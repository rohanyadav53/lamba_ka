// server/config/env.js
// Centralized environment variable loading and validation

const dotenv = require('dotenv');
const path = require('path');

// Load .env from server directory
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const requiredVars = [
  'JWT_SECRET',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD_HASH',
];

const optionalVars = [
  'AIRTABLE_API_KEY',
  'AIRTABLE_BASE_ID',
];

function validateEnv() {
  const missing = requiredVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`\n❌ Missing required environment variables:\n   ${missing.join('\n   ')}`);
    console.error(`\n   Copy .env.example to .env and fill in your values.\n`);
    process.exit(1);
  }

  // Warn about optional Airtable config
  const missingOptional = optionalVars.filter(
    (key) => !process.env[key] || process.env[key].includes('YOUR_') || process.env[key].includes('_HERE')
  );
  if (missingOptional.length > 0) {
    console.warn(`\n⚠️  Airtable not configured yet. Lead storage will use in-memory fallback.`);
    console.warn(`   Fill in these .env values to enable Airtable: ${missingOptional.join(', ')}\n`);
  }
}

validateEnv();

module.exports = {
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
  AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME || 'Leads',
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
  PORT: parseInt(process.env.PORT, 10) || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:8080',
  WHATSAPP_ENABLED: process.env.WHATSAPP_ENABLED === 'true',
  WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || '919256925671',
};
