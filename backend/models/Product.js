const mongoose = require("mongoose");

// A product can have multiple images, each with its own alt text.
// `publicId` is Cloudinary's identifier for the uploaded file — it's what
// lets us delete the old image from Cloudinary when it gets replaced
// (see routes/productAdminRoutes.js).
const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    altText: { type: String, default: "" },
    publicId: { type: String, default: null },
  },
  { _id: false } // images don't need their own _id
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      default: 0,
    },
    discountPrice: {
      type: Number,
    },
    countInStock: {
      type: Number,
      required: [true, "Stock count is required"],
      default: 0,
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    brand: {
      type: String,
      default: "Rabbit",
    },
    sizes: {
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    collections: {
      type: String,
    },
    material: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
      default: "Unisex",
    },
    images: {
      type: [imageSchema],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    // The admin user who created this product
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
