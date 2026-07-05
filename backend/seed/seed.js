// Populates (or clears) the database with the sample product catalogue that
// used to live only in the frontend (frontend/src/services/product.js).
//
// Usage (from the backend/ folder):
//   npm run seed            -> inserts the sample products (and one demo admin)
//   npm run seed:destroy    -> deletes ALL products and the demo admin user

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const User = require("../models/User");
const products = require("./productsData");

const DEMO_ADMIN = {
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123", // hashed automatically by the User model
  role: "admin",
};

async function seed() {
  await connectDB();

  try {
    if (process.argv.includes("--destroy")) {
      await Product.deleteMany();
      await User.deleteOne({ email: DEMO_ADMIN.email });
      console.log("🗑️  All products and the demo admin user were removed.");
    } else {
      await Product.deleteMany();
      await Product.insertMany(products);
      console.log(`✅ Inserted ${products.length} sample products.`);

      const adminExists = await User.findOne({ email: DEMO_ADMIN.email });
      if (!adminExists) {
        await User.create(DEMO_ADMIN);
        console.log(`✅ Created demo admin user: ${DEMO_ADMIN.email} / ${DEMO_ADMIN.password}`);
      } else {
        console.log("ℹ️  Demo admin user already exists — left untouched.");
      }
    }
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
}

seed();
