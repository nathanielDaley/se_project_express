const { UNIQUE_CONFLICT } = require("../utils/errors");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNIQUE_CONFLICT;
  }
}

module.exports = ConflictError;
