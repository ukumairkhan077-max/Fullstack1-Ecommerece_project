const mongoose = require("mongoose");

/**
 * Connects to MongoDB using the connection string from .env (MONGO_URI).
 * Called once from server.js when the app starts.
 */
const connectDB = async () => {
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
