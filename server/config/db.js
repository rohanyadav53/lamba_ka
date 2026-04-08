const mongoose = require('mongoose');
const config = require('./env');

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development and serverless function invocations in production (Vercel).
 * This prevents connections growing exponentially during API calls.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering
    };

    cached.promise = mongoose.connect(config.MONGO_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    }).catch(err => {
      console.error('❌ MongoDB connection error:', err);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise string so next attempt triggers a reconnect
    throw e;
  }

  return cached.conn;
}

module.exports = connectDB;
