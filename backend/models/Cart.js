const mongoose = require("mongoose");

// A single line item inside a cart
const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    size: { type: String },
    color: { type: String },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    // Exactly one of `user` / `guestId` will be set:
    //  - `user`    → a logged-in user's cart
    //  - `guestId` → an anonymous/guest cart (identified by a client-generated id)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    guestId: {
      type: String,
      default: null,
    },
    products: {
      type: [cartItemSchema],
      default: [],
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
