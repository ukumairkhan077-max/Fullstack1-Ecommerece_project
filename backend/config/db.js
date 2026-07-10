const mongoose = require("mongoose");

/**
 * Connects to MongoDB using the connection string from .env (MONGO_URI).
 * Called from server.js when the app starts.
 *
 * Guards against reconnecting when a connection already exists — this
 * matters most on Vercel/serverless, where a "warm" function invocation
 * reuses the same Node process (and this module's state) as the previous
 * request, so without this check every request would try to open a brand
 * new connection and could exhaust MongoDB Atlas's connection limit.
 */
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return; // already connected — reuse it
  }

  try {
    if (!process.env.MONGO_URI) {
      console.warn(
        "⚠️  MONGO_URI is not set in your .env file — the API will start, " +
          "but any database operation will fail until you add it."
      );
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // We log the error but don't crash the process here so that, in local
    // development, you can still hit routes that don't touch the DB (and
    // see a clear error message) instead of the whole server dying.
    // For production you may prefer: process.exit(1)
    console.error(`❌ MongoDB connection error: ${error.message}`);
  }
};

module.exports = connectDB;