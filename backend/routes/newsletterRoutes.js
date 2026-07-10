const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { subscribe, getAllSubscribers } = require("../controllers/subscriberController");

const router = express.Router();

// @route   POST /api/newsletter
router.post("/", subscribe);

// @route   GET /api/newsletter  (admin — view all subscribers)
router.get("/", protect, admin, getAllSubscribers);

module.exports = router;
