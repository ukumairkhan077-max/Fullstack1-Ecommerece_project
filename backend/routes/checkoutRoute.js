const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createCheckout,
  getCheckoutById,
  markCheckoutPaid,
  finalizeCheckout,
} = require("../controllers/checkoutController");

const router = express.Router();

// Every checkout route requires the shopper to be logged in — this is the
// server-side half of the "checkout requires authentication" requirement
// (the frontend also redirects to /login before ever reaching checkout,
// see frontend/src/pages/checkout/CheckoutPage.jsx).
router.post("/", protect, createCheckout);
router.get("/:id", protect, getCheckoutById);
router.put("/:id/pay", protect, markCheckoutPaid);
router.post("/:id/finalize", protect, finalizeCheckout);

module.exports = router;
