const Subscriber = require("../models/Subscriber");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// @desc    Subscribe an email to the newsletter (footer form)
// @route   POST /api/newsletter
// @access  Public
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await Subscriber.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ message: "This email is already subscribed" });
    }

    const subscriber = await Subscriber.create({ email: normalizedEmail });
    res.status(201).json({ message: "Subscribed successfully", subscriber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    List every newsletter subscriber
// @route   GET /api/newsletter
// @access  Private/Admin
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
