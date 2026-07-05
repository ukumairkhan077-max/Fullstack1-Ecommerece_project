const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// NOTE ON ROUTE ORDER: Express matches routes top-to-bottom, and "/:id" would
// otherwise swallow requests to "/bestsellers" and "/new-arrivals" (treating
// those words as an :id). That's why those two specific routes are declared
// BEFORE the generic "/:id" route below.

// @route   GET /api/products/bestsellers
// @desc    Return the highest-rated products
// @access  Public
router.get("/bestsellers", async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/new-arrivals
// @desc    Return the most recently created products
// @access  Public
router.get("/new-arrivals", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products
// @desc    Get all products. Supports optional query filters:
//            ?keyword=shirt        (case-insensitive name search)
//            ?category=Top Wear
//            ?gender=Men
//            ?minPrice=20&maxPrice=80
//            ?sort=priceAsc|priceDesc|newest
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { keyword, category, gender, minPrice, maxPrice, sort } = req.query;

    const filter = {};

    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    if (gender) {
      filter.gender = gender;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let query = Product.find(filter);

    if (sort === "priceAsc") query = query.sort({ price: 1 });
    else if (sort === "priceDesc") query = query.sort({ price: -1 });
    else if (sort === "newest") query = query.sort({ createdAt: -1 });

    const products = await query;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get a single product by its Mongo _id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update an existing product
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
