// server/config/env.js
// Centralized environment variable loading and validation

const dotenv = require('dotenv');
const path = require('path');

// Load .env from server directory
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const requiredVars = [
  'MONGO_URI',
  'JWT_SECRET',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD_HASH',
];

function validateEnv() {
  const missing = requiredVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`\n❌ Missing required environment variables:\n   ${missing.join('\n   ')}`);
    console.error(`\n   Copy .env.example to .env and fill in your values.\n`);
    process.exit(1);
  }
}

validateEnv();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
  PORT: parseInt(process.env.PORT, 10) || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:8080',
  WHATSAPP_ENABLED: process.env.WHATSAPP_ENABLED === 'true',
  WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || '919256925671',
};
