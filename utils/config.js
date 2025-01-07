const { JWT_SECRET = "project-what-to-wear-secret" } = process.env;
const SALT_LENGTH = 10;
const TOKEN_EXPIRATION = "7d";

module.exports = { JWT_SECRET, SALT_LENGTH, TOKEN_EXPIRATION };
