require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// 1. Connect to MongoDB (see config/db.js)
connectDB();

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
app.use("/api/cart", cartRoutes);

// 5. Error handling (must be registered LAST)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
