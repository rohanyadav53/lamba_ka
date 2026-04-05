// server/index.js
// ShikshaVision Backend — Express.js Entry Point

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/env');

const app = express();

// ── Security ─────────────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      config.FRONTEND_URL,
      'http://localhost:8080',
      'http://localhost:5173',
      'http://localhost:3000',
      // Production domains
      'https://shikshavision.com',
      'https://www.shikshavision.com',
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── Request Logging (development) ───────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
  });
}

// ── Routes ───────────────────────────────────────────────────────────────────
// IMPORTANT: Download routes must come before lead routes (more specific first)
const downloadRoutes = require('./routes/downloadRoutes');
const leadRoutes = require('./routes/leadRoutes');
const otpRoutes = require('./routes/otpRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api', downloadRoutes);   // GET /api/leads/download
app.use('/api', leadRoutes);       // POST /api/lead, GET /api/leads, PUT /api/lead/:id
app.use('/api', otpRoutes);        // POST /api/otp/send, /api/otp/verify
app.use('/api', adminRoutes);      // POST /api/admin/login, /api/admin/reset-password

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// ── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { error: err.message }),
  });
});

// ── Start Server (only when NOT running on Vercel) ───────────────────────────
// On Vercel, the app is imported as a serverless function — no .listen() needed
if (!process.env.VERCEL) {
  app.listen(config.PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════╗
║                                                  ║
║   🚀 ShikshaVision Backend Running               ║
║                                                  ║
║   Local:    http://localhost:${config.PORT}              ║
║   Health:   http://localhost:${config.PORT}/api/health   ║
║                                                  ║
║   Admin:    ${config.ADMIN_EMAIL}      ║
║                                                  ║
╚══════════════════════════════════════════════════╝
    `);
  });
}

// Export for Vercel serverless function
module.exports = app;
