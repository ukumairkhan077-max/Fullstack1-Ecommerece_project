// Vercel serverless entry point. Vercel treats any file in /api as a
// serverless function; an Express app instance is itself a valid request
// handler (it's just a function of (req, res)), so we can export it
// directly — no extra wrapping needed.
module.exports = require("../server");