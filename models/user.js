const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const { LOGIN_ERROR } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The user's name is required."],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The user image is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: [true, "The user's email is required"],
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid URL",
    },
  },
  password: {
    type: String,
    required: [true, "The user's password is required"],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(LOGIN_ERROR));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error(LOGIN_ERROR));
        }

        return {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        };
      });
    });
};

module.exports = mongoose.model("user", userSchema);
