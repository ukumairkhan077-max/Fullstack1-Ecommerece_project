const express = require("express");
const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// All routes in this file are admin-only product management endpoints
// (create/update/delete). Public, read-only product routes live in
// routes/productRoutes.js — both files are mounted at "/api/products" in
// server.js, so the public API surface the frontend calls doesn't change.

// Deletes every Cloudinary image attached to a product (used when a
// product itself is deleted, so we don't leave orphaned images behind).
async function deleteProductImages(product) {
  const deletions = (product.images || [])
    .filter((img) => img.publicId)
    .map((img) => cloudinary.uploader.destroy(img.publicId).catch(() => null));
  await Promise.all(deletions);
}

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
// @desc    Update an existing product. If the images array changed and an
//          old image had a Cloudinary publicId that's no longer present in
//          the new images array, that old image is deleted from Cloudinary
//          so replaced photos don't pile up in your Cloudinary account.
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const oldImages = product.images || [];

    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    if (Array.isArray(req.body.images)) {
      const newPublicIds = new Set(
        req.body.images.map((img) => img.publicId).filter(Boolean)
      );
      const removedImages = oldImages.filter(
        (img) => img.publicId && !newPublicIds.has(img.publicId)
      );
      await Promise.all(
        removedImages.map((img) =>
          cloudinary.uploader.destroy(img.publicId).catch(() => null)
        )
      );
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product (and any Cloudinary images it owned)
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await deleteProductImages(product);
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
