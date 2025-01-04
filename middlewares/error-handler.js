const { DEFAULT_STATUS, DEFAULT_ERROR } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  console.error(err);

  const { statusCode = DEFAULT_STATUS, message } = err;

  res.status(statusCode).send({
    message: statusCode === DEFAULT_STATUS ? DEFAULT_ERROR : message,
  });
};
