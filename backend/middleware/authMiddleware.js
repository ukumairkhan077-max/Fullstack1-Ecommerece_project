const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * protect
 * Reads the "Authorization: Bearer <token>" header, verifies the JWT,
 * and attaches the corresponding user (without the password) to req.user.
 * Any route that uses this middleware requires the user to be logged in.
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User belonging to this token no longer exists" });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token provided" });
};

/**
 * admin
 * Must be used AFTER `protect`. Only allows the request through if the
 * logged-in user's role is "admin".
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Not authorized as an admin" });
};

module.exports = { protect, admin };
