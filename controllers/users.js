const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const {
  JWT_SECRET,
  SALT_LENGTH,
  TOKEN_EXPIRATION,
} = require("../utils/config");
const {
  CREATE_USER_ERROR,
  USER_NOT_FOUND_ERROR,
  INVALID_USER_ID_ERROR,
  DUPLICATE_EMAIL_ERROR,
  LOGIN_ERROR,
  USERNAME_PASSWORD_REQUIRED_ERROR,
  CREATED_STATUS,
} = require("../utils/errors");

const BadRequestError = require("../errors/bad-request-error");
const AuthenticationError = require("../errors/authentication-error");
const NotFoundError = require("../errors/not-found-error");
const ConflictError = require("../errors/conflict-error");

const getUser = (request, response, next) => {
  const userId = request.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => response.send({ user }))
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        next(new NotFoundError(USER_NOT_FOUND_ERROR));
      }
      if (error.name === "CastError") {
        next(new BadRequestError(INVALID_USER_ID_ERROR));
      } else {
        next(error);
      }
    });
};

const createUser = (request, response, next) => {
  const { name, avatar, email, password } = request.body;

  bcrypt
    .hash(password, SALT_LENGTH)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) =>
      response.status(CREATED_STATUS).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      })
    )
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        next(new BadRequestError(CREATE_USER_ERROR));
      }
      if (error.name === "MongoServerError" && error.code === 11000) {
        next(new ConflictError(DUPLICATE_EMAIL_ERROR));
      } else {
        next(error);
      }
    });
};

const updateUser = (request, response, next) => {
  const userId = request.user._id;
  const { name, avatar } = request.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { runValidators: true, new: true }
  )
    .orFail()
    .then((user) => response.send({ name: user.name, avatar: user.avatar }))
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        next(new BadRequestError(CREATE_USER_ERROR));
      }
      if (error.name === "DocumentNotFoundError") {
        next(new NotFoundError(USER_NOT_FOUND_ERROR));
      }
      if (error.name === "CastError") {
        next(new BadRequestError(INVALID_USER_ID_ERROR));
      } else {
        next(error);
      }
    });
};

const login = (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    next(new BadRequestError(USERNAME_PASSWORD_REQUIRED_ERROR));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: TOKEN_EXPIRATION,
      });

      return response.send({ token });
    })
    .catch((error) => {
      console.error(error);
      if (error.message === LOGIN_ERROR) {
        next(new AuthenticationError(LOGIN_ERROR));
      } else {
        next(error);
      }
    });
};

module.exports = { getUser, createUser, updateUser, login };
