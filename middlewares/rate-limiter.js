const { rateLimit } = require("express-rate-limit");

const {
  LIMITER_WINDOW_MS,
  LIMITER_REQUEST_LIMIT_PER_WINDOW,
  LIMITER_STANDARD_HEADERS,
  LIMITER_LEGACY_HEADERS,
} = require("../utils/config");

const limiter = rateLimit({
  windowMs: LIMITER_WINDOW_MS, // 15 minutes
  limit: LIMITER_REQUEST_LIMIT_PER_WINDOW, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: LIMITER_STANDARD_HEADERS, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: LIMITER_LEGACY_HEADERS, // Disable the `X-RateLimit-*` headers
});

module.exports = { limiter };
