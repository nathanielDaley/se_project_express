const User = require("../models/user");
const {
  DEFAULT_ERROR,
  CREATE_USER_ERROR,
  USER_NOT_FOUND_ERROR,
  INVALID_USER_ID_ERROR,
  BAD_REQUEST_STATUS,
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
  const { userId } = request.params;

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

  User.create({ name, avatar, email, password })
    .then((user) => response.status(CREATED_STATUS).send({ user }))
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        return response
          .status(BAD_REQUEST_STATUS)
          .send({ message: CREATE_USER_ERROR });
      }
      return response.status(DEFAULT_STATUS).send({ message: DEFAULT_ERROR });
    });
};

module.exports = { getUsers, getUser, createUser };
