const User = require("../models/user");
const {
  DEFAULT_ERROR,
  CREATE_USER_ERROR,
  USER_NOT_FOUND_ERROR,
  INVALID_USER_ID_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  CREATED,
} = require("../utils/errors");

const getUsers = (request, response) => {
  User.find({})
    .then((users) => response.send({ users }))
    .catch((error) => {
      console.error(error);
      return response.status(DEFAULT).send({ message: DEFAULT_ERROR });
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
          .status(NOT_FOUND)
          .send({ message: USER_NOT_FOUND_ERROR });
      }
      if (error.name === "CastError") {
        return response
          .status(BAD_REQUEST)
          .send({ message: INVALID_USER_ID_ERROR });
      }
      return response.status(DEFAULT).send({ message: DEFAULT_ERROR });
    });
};

const createUser = (request, response) => {
  const { name, avatar } = request.body;

  User.create({ name, avatar })
    .then((user) => response.status(CREATED).send({ user }))
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        return response
          .status(BAD_REQUEST)
          .send({ message: CREATE_USER_ERROR });
      }
      return response.status(DEFAULT).send({ message: DEFAULT_ERROR });
    });
};

module.exports = { getUsers, getUser, createUser };
