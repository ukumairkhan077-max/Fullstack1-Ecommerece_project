const mongoose = require("mongoose");

// A single line item inside a checkout (same shape as a cart item)
const checkoutItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    size: { type: String },
    color: { type: String },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

// Matches the fields collected on the frontend's Checkout page
// (see frontend/src/pages/checkout/CheckoutPage.jsx)
const shippingAddressSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const checkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // checkout requires a logged-in user (see checkout auth guard)
    },
    checkoutItems: {
      type: [checkoutItemSchema],
      default: [],
      validate: (items) => items.length > 0,
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "Pending", // the real method (JazzCash/Easypaisa) is set later via PUT /:id/pay
    },
    itemsPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },

    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    paymentResult: {
      status: { type: String },
      transactionId: { type: String },
      paymentMethod: { type: String },
    },

    isFinalized: { type: Boolean, default: false },
    finalizedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Checkout", checkoutSchema);
