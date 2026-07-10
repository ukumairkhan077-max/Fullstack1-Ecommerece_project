// Forces Node to try IPv4 before IPv6 when resolving hostnames. Without
// this, some networks (very commonly on Windows) cause Node's default
// "Happy Eyeballs" IPv6-first DNS resolution to silently stall for 10-30+
// seconds against MongoDB Atlas's mongodb+srv:// hostname before falling
// back to IPv4 — even though a direct IPv4 connection works instantly.
// This must run before anything else does a DNS lookup (like Mongoose).
require("dns").setDefaultResultOrder("ipv4first");

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const cartRoutes = require("./routes/cartRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// 1. Connect to MongoDB (see config/db.js)
connectDB().then(() => ensureDemoAdmin());

// Makes sure the demo admin account (admin@example.com / admin123) always
// exists once the DB is connected — even if someone deletes it directly in
// the database, editing the users collection by hand, etc. This is what
// the "Demo admin" credentials mentioned in the README/admin login page
// rely on always working.
async function ensureDemoAdmin() {
  try {
    const existing = await User.findOne({ email: "admin@example.com" });
    if (!existing) {
      await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      });
      console.log("✅ Demo admin account created: admin@example.com / admin123");
    } else if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
      console.log("✅ Demo admin account role restored to 'admin'");
    }
  } catch (error) {
    // Non-fatal — e.g. runs before Mongo is actually connected in some
    // startup orderings. The app keeps running either way.
    console.warn(`⚠️  Could not verify/create the demo admin account: ${error.message}`);
  }
}

// 2. Global middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json()); // parses incoming JSON request bodies (req.body)

// 3. Health check — useful to confirm the API is up
app.get("/", (req, res) => {
  res.json({ message: "🐰 Rabbit Store API is running" });
});

// 4. Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/products", productAdminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/newsletter", newsletterRoutes);

// 5. Error handling (must be registered LAST)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
