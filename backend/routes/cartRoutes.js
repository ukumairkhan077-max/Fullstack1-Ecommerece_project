const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// Looks up the correct cart for this request: a user's cart if userId was
// sent, otherwise a guest cart identified by guestId.
async function findCart({ userId, guestId }) {
  if (userId) return Cart.findOne({ user: userId });
  if (guestId) return Cart.findOne({ guestId });
  return null;
}

// Recomputes the cart total from its line items. Call this any time
// `products` changes before saving.
function recalcTotal(cart) {
  cart.total = cart.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

// @route   GET /api/cart?userId=...  OR  ?guestId=...
// @desc    Get the current cart
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { userId, guestId } = req.query;
    const cart = await findCart({ userId, guestId });
    res.json(cart || { products: [], total: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/cart
// @desc    Add a product to the cart (creating the cart if it doesn't exist yet)
// @body    { userId? , guestId?, productId, quantity, size, color }
// @access  Public (works for both guests and logged-in users)
router.post("/", async (req, res) => {
  try {
    const { userId, guestId, productId, quantity = 1, size, color } = req.body;

    if (!userId && !guestId) {
      return res.status(400).json({ message: "userId or guestId is required" });
    }

    // A non-ObjectId productId (e.g. a SKU string like "VNECK-CLS-010")
    // means this item was added while the frontend was in its offline/local
    // demo mode. Return a clear error instead of letting Product.findById
    // throw a raw Mongoose CastError below.
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "This item was added to your cart while offline. Please remove it and add it again.",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await findCart({ userId, guestId });
    if (!cart) {
      cart = new Cart({
        user: userId || null,
        guestId: userId ? null : guestId,
        products: [],
      });
    }

    const existingItem = cart.products.find(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({
        productId: product._id,
        name: product.name,
        image: product.images?.[0]?.url || "",
        price: product.discountPrice || product.price,
        size,
        color,
        quantity,
      });
    }

    recalcTotal(cart);
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Empty the entire cart
// @body    { userId?, guestId? }
// @access  Public
// NOTE: declared BEFORE "/:productId" so the literal word "clear" isn't
// swallowed by the dynamic :productId route below.
router.delete("/clear", async (req, res) => {
  try {
    const { userId, guestId } = req.body;
    const cart = await findCart({ userId, guestId });
    if (!cart) {
      return res.json({ message: "Cart is already empty" });
    }

    cart.products = [];
    cart.total = 0;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/cart/:productId
// @desc    Update the quantity of one cart line item
// @body    { userId?, guestId?, quantity, size, color }
// @access  Public
router.put("/:productId", async (req, res) => {
  try {
    const { userId, guestId, quantity, size, color } = req.body;

    const cart = await findCart({ userId, guestId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.products.find(
      (i) =>
        i.productId.toString() === req.params.productId &&
        i.size === size &&
        i.color === color
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    recalcTotal(cart);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/cart/:productId
// @desc    Remove a single line item from the cart
// @body    { userId?, guestId?, size, color }
// @access  Public
router.delete("/:productId", async (req, res) => {
  try {
    const { userId, guestId, size, color } = req.body;

    const cart = await findCart({ userId, guestId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (i) =>
        !(
          i.productId.toString() === req.params.productId &&
          i.size === size &&
          i.color === color
        )
    );

    recalcTotal(cart);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
