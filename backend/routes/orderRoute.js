const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

// NOTE ON ROUTE ORDER: "/mine" must be declared before "/:id", otherwise
// Express would treat the literal word "mine" as an :id.

// @route   GET /api/orders/mine
router.get("/mine", protect, getMyOrders);

// @route   GET /api/orders  (admin — list every order)
router.get("/", protect, admin, getAllOrders);

// @route   GET /api/orders/:id
router.get("/:id", protect, getOrderById);

// @route   PUT /api/orders/:id/status  (admin only)
router.put("/:id/status", protect, admin, updateOrderStatus);

// @route   DELETE /api/orders/:id  (admin only)
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;
