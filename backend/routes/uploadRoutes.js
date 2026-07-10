const express = require("express");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/uploadMiddleware");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Uploads a file buffer (from multer's memory storage) to Cloudinary using
// its upload_stream API, wrapped in a Promise so route handlers can just
// await it like any other async call.
function uploadBufferToCloudinary(buffer, folder = "rabbit-store/products") {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

// @route   POST /api/upload
// @desc    Upload a single product image to Cloudinary
// @access  Private/Admin
// @body    multipart/form-data, field name "image"
router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file was provided" });
    }

    const result = await uploadBufferToCloudinary(req.file.buffer);

    res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Image upload failed" });
  }
});

// @route   DELETE /api/upload/:publicId
// @desc    Remove an image from Cloudinary (e.g. an orphaned/replaced one)
// @access  Private/Admin
// NOTE: publicId often contains slashes (folder/filename) — the frontend
// should URL-encode it (encodeURIComponent) before calling this route.
router.delete("/:publicId", protect, admin, async (req, res) => {
  try {
    const publicId = decodeURIComponent(req.params.publicId);
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Image deletion failed" });
  }
});

module.exports = router;
