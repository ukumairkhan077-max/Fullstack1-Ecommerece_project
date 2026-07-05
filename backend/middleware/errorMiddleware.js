// Catches requests to routes that don't exist and forwards a 404 error
// to the errorHandler below.
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Central error handler. Any route/middleware that calls next(error), or
// any thrown error inside an async route (once caught), ends up here.
// Keep this registered LAST in server.js, after all other app.use()/routes.
const errorHandler = (err, req, res, next) => {
  // If a route set a 2xx status but still threw, default to 500 instead
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Server Error",
    // Only leak the stack trace outside of production, for easier debugging
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = { notFound, errorHandler };
