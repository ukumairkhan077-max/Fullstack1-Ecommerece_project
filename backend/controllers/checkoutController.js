const mongoose = require("mongoose");
const Checkout = require("../models/Checkout");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// @desc    Create a new checkout (temporarily holds the items/address/total
//          before an order is actually placed)
// @route   POST /api/checkout
// @access  Private (requires a logged-in user — see authMiddleware.protect)
exports.createCheckout = async (req, res) => {
  try {
    const { checkoutItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
      return res.status(400).json({ message: "No items to check out" });
    }
    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    // Guard against stale/offline-demo cart items whose "productId" is
    // actually a SKU string (e.g. "VNECK-CLS-010") rather than a real
    // MongoDB _id — this happens if the cart was built while the backend
    // was briefly unreachable. Returning a clear 400 here (instead of
    // letting Mongoose throw a raw CastError) points shoppers at the fix:
    // clear the cart and re-add the items now that the backend is up.
    const invalidItem = checkoutItems.find(
      (item) => !mongoose.Types.ObjectId.isValid(item.productId)
    );
    if (invalidItem) {
      return res.status(400).json({
        message:
          `"${invalidItem.name || invalidItem.productId}" was added to your cart while offline and can't be checked out. ` +
          "Please clear your cart and add your items again.",
      });
    }

    const checkout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json(checkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single checkout by id (only its owner can view it)
// @route   GET /api/checkout/:id
// @access  Private
exports.getCheckoutById = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    if (checkout.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this checkout" });
    }
    res.json(checkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark a checkout as paid (called after a successful payment,
//          e.g. the JazzCash/Easypaisa demo flow on the frontend)
// @route   PUT /api/checkout/:id/pay
// @access  Private
exports.markCheckoutPaid = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    if (checkout.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this checkout" });
    }

    const { status, transactionId, paymentMethod } = req.body;

    checkout.isPaid = true;
    checkout.paidAt = new Date();
    checkout.paymentResult = { status, transactionId, paymentMethod };

    const updated = await checkout.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Finalize a paid checkout into a real Order, then clear the
//          user's cart
// @route   POST /api/checkout/:id/finalize
// @access  Private
exports.finalizeCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    if (checkout.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to finalize this checkout" });
    }
    if (checkout.isFinalized) {
      return res.status(400).json({ message: "This checkout has already been finalized" });
    }
    if (!checkout.isPaid) {
      return res.status(400).json({ message: "Checkout must be marked as paid before it can be finalized" });
    }

    const order = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      itemsPrice: checkout.itemsPrice,
      shippingPrice: checkout.shippingPrice,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      paymentResult: checkout.paymentResult,
      status: "Pending",
    });

    checkout.isFinalized = true;
    checkout.finalizedAt = new Date();
    await checkout.save();

    // Clear the user's cart now that the order has been placed
    await Cart.findOneAndUpdate(
      { user: checkout.user },
      { products: [], total: 0 }
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
