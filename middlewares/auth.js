const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const {
  AUTHENTICATION_ERROR_STATUS,
  AUTHORIZATION_ERROR,
} = require("../utils/errors");

module.exports = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return response
      .status(AUTHENTICATION_ERROR_STATUS)
      .send({ message: AUTHORIZATION_ERROR });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return response
      .status(AUTHENTICATION_ERROR_STATUS)
      .send({ message: AUTHORIZATION_ERROR });
  }

  request.user = payload;

  next();
};
