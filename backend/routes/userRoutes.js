const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require("../models/Cart");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Signs a JWT that identifies this user for 30 days.
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

/**
 * Merges a guest cart into a user's cart. Called automatically whenever a
 * guestId is sent along with register/login, so shoppers never lose items
 * they added before creating an account or signing in.
 *
 * Flow: Guest adds to cart -> Guest logs in / registers -> guest cart items
 * are copied into (or become) that user's cart, and the guest cart is removed.
 */
async function mergeGuestCart(guestId, userId) {
  if (!guestId) return;

  const guestCart = await Cart.findOne({ guestId });
  if (!guestCart || guestCart.products.length === 0) return;

  const userCart = await Cart.findOne({ user: userId });

  if (!userCart) {
    // No existing cart for this user — simply hand the guest cart over to them
    guestCart.user = userId;
    guestCart.guestId = null;
    await guestCart.save();
    return;
  }

  // Merge line items: combine quantities for matching product+size+color,
  // otherwise append as a new line item.
  guestCart.products.forEach((guestItem) => {
    const match = userCart.products.find(
      (item) =>
        item.productId.toString() === guestItem.productId.toString() &&
        item.size === guestItem.size &&
        item.color === guestItem.color
    );

    if (match) {
      match.quantity += guestItem.quantity;
    } else {
      userCart.products.push(guestItem);
    }
  });

  userCart.total = userCart.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await userCart.save();
  await Cart.deleteOne({ _id: guestCart._id });
}

// @route   POST /api/users/register
// @desc    Create a new user account, hash the password, and return a JWT
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, guestId } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: "A user with this email already exists" });
    }

    // Password hashing happens automatically in the User model's pre-save hook
    const user = await User.create({ name, email, password });

    await mergeGuestCart(guestId, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/users/login
// @desc    Verify credentials and return a JWT
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password, guestId } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Automatically merge any guest cart into this user's cart on login
    await mergeGuestCart(guestId, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/users/profile
// @desc    Get the currently logged-in user's own profile
// @access  Private
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

// @route   GET /api/users
// @desc    List all users (used by the Admin > User Management page)
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/users
// @desc    Admin-created user (from the Admin > User Management "Add New
//          User" form). Same as register, but lets an admin set the role.
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: "A user with this email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role === "admin" ? "admin" : "customer",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/users/:id
// @desc    Update any of a user's info (name, email, role, and optionally
//          password). This is the general-purpose "edit user" endpoint —
//          PUT /api/users/:id/role below is kept as a quick shortcut for
//          just toggling a role from the admin table.
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email.toLowerCase().trim() !== user.email) {
      const emailTaken = await User.findOne({ email: email.toLowerCase().trim() });
      if (emailTaken) {
        return res.status(400).json({ message: "That email is already in use by another user" });
      }
      user.email = email.toLowerCase().trim();
    }

    if (name) user.name = name;
    if (role && ["customer", "admin"].includes(role)) user.role = role;
    if (password) user.password = password; // re-hashed automatically by the pre-save hook

    const updated = await user.save();

    res.json({ _id: updated._id, name: updated.name, email: updated.email, role: updated.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/users/:id/role
// @desc    Change a user's role (customer <-> admin)
// @access  Private/Admin
router.put("/:id/role", protect, admin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!["customer", "admin"].includes(role)) {
      return res.status(400).json({ message: "Role must be 'customer' or 'admin'" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
