const { AUTHENTICATION_ERROR_STATUS } = require("../utils/errors");

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTHENTICATION_ERROR_STATUS;
  }
}

module.exports = AuthenticationError;
