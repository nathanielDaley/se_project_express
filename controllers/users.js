const User = require("../models/user");
const {
  DEFAULT_ERROR,
  CREATE_USER_ERROR,
  USER_NOT_FOUND_ERROR,
  INVALID_USER_ID_ERROR,
} = require("../utils/errors");

const getUsers = (request, response) => {
  User.find({})
    .then((users) => {
      return response.status(200).send({ users });
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).send({ message: DEFAULT_ERROR });
    });
};

const getUser = (request, response) => {
  const { userId } = request.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      return response.status(200).send({ user });
    })
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return response.status(404).send({ message: USER_NOT_FOUND_ERROR });
      }
      if (error.name === "CastError") {
        return response.status(404).send({ message: INVALID_USER_ID_ERROR });
      }
      return response.status(500).send({ message: DEFAULT_ERROR });
    });
};

const createUser = (request, response) => {
  const { name, avatar } = request.body;

  User.create({ name, avatar })
    .then((user) => {
      return response.status(201).send({ user });
    })
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        return response.status(400).send({ message: CREATE_USER_ERROR });
      }
      return response.status(500).send({ message: DEFAULT_ERROR });
    });
};

module.exports = { getUsers, getUser, createUser };
