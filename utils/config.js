const { JWT_SECRET = "project-what-to-wear-secret" } = process.env;
const SALT_LENGTH = 10;
const TOKEN_EXPIRATION = "7d";

const LIMITER_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LIMITER_REQUEST_LIMIT_PER_WINDOW = 100; // Limit each IP to 100 requests per `window` (here, per 15 minutes)
const LIMITER_STANDARD_HEADERS = true; // Return rate limit info in the `RateLimit-*` headers
const LIMITER_LEGACY_HEADERS = false; // Disable the `X-RateLimit-*` headers

module.exports = {
  JWT_SECRET,
  SALT_LENGTH,
  TOKEN_EXPIRATION,
  LIMITER_WINDOW_MS,
  LIMITER_REQUEST_LIMIT_PER_WINDOW,
  LIMITER_STANDARD_HEADERS,
  LIMITER_LEGACY_HEADERS,
};
