const mongoose = require("mongoose");
const validator = require("validator");

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
  },
});

module.exports = mongoose.model("user", userSchema);
