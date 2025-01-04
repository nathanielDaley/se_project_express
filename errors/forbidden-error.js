const { INSUFFICIENT_PERMISSIONS } = require("../utils/errors");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INSUFFICIENT_PERMISSIONS;
  }
}

module.exports = ForbiddenError;
