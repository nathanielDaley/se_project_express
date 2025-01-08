const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const { AUTHORIZATION_ERROR } = require("../utils/errors");
const AuthenticationError = require("../errors/authentication-error");

module.exports = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new AuthenticationError(AUTHORIZATION_ERROR));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error(error);
    next(new AuthenticationError(AUTHORIZATION_ERROR));
  }

  request.user = payload;

  return next();
};
