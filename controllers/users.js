const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const {
  JWT_SECRET,
  SALT_LENGTH,
  TOKEN_EXPIRATION,
} = require("../utils/config");
const {
  DEFAULT_ERROR,
  CREATE_USER_ERROR,
  USER_NOT_FOUND_ERROR,
  INVALID_USER_ID_ERROR,
  DUPLICATE_EMAIL_ERROR,
  LOGIN_ERROR,
  BAD_REQUEST_STATUS,
  AUTHENTICATION_ERROR_STATUS,
  NOT_FOUND_STATUS,
  DEFAULT_STATUS,
  CREATED_STATUS,
} = require("../utils/errors");

const getUsers = (request, response) => {
  User.find({})
    .then((users) => response.send({ users }))
    .catch((error) => {
      console.error(error);
      return response.status(DEFAULT_STATUS).send({ message: DEFAULT_ERROR });
    });
};

const getUser = (request, response) => {
  const userId = request.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => response.send({ user }))
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return response
          .status(NOT_FOUND_STATUS)
          .send({ message: USER_NOT_FOUND_ERROR });
      }
      if (error.name === "CastError") {
        return response
          .status(BAD_REQUEST_STATUS)
          .send({ message: INVALID_USER_ID_ERROR });
      }
      return response.status(DEFAULT_STATUS).send({ message: DEFAULT_ERROR });
    });
};

const createUser = (request, response) => {
  const { name, avatar, email, password } = request.body;

  bcrypt
    .hash(password, SALT_LENGTH)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) =>
      response.status(CREATED_STATUS).send({ _id: user._id, email: user.email })
    )
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        return response
          .status(BAD_REQUEST_STATUS)
          .send({ message: CREATE_USER_ERROR });
      }
      if (error.name === "MongoServerError" && error.code === 11000) {
        return response
          .status(BAD_REQUEST_STATUS)
          .send({ message: DUPLICATE_EMAIL_ERROR });
      }
      return response.status(DEFAULT_STATUS).send({ message: DEFAULT_ERROR });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: TOKEN_EXPIRATION,
      });

      res.send({ token });
    })
    .catch((err) => {
      res.status(AUTHENTICATION_ERROR_STATUS).send({ message: LOGIN_ERROR });
    });
};

module.exports = { getUsers, getUser, createUser, login };
