const multer = require("multer");

// Stores the uploaded file in memory (as a Buffer) instead of writing it to
// disk — we stream that buffer straight to Cloudinary in routes/uploadRoutes.js
// and never need to keep a local copy on the server.
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, WEBP, or GIF images are allowed"));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

module.exports = upload;
