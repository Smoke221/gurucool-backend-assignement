const rateLimit = require("express-rate-limit");

// Rate limiting for user login and registration
const loginRegisterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Max 5 requests per IP per hour
  message:
    "Too many login/register attempts from this IP. Please wait for an hour before trying again.",
});

// Rate limiting for quiz
const quizLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Max 10 requests per IP per hour
  message:
    "Too many quiz attempts from this IP. Please wait for an hour before trying again.",
});

module.exports = {
  loginRegisterLimiter,
  quizLimiter,
};