const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("user", {
  name: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: (val) => {
      if (!validator.isEmail(val)) {
        throw new Error("Email is invalid!");
      }
    },
    default: "",
  },
  age: {
    type: Number,
    required: true,
    validate: (val) => {
      if (val < 0) {
        throw new Error("age is invalid!");
      }
    },
    trim: true,
    default: 0,
  },
  password: {
    type: String,
    required: true,
    validate: (val) => {
      if (val.toLowerCase().includes("password")) {
        throw new Error("Password is invalid!");
      }
    },
    trim: true,
    minLength: 7,
  },
});

module.exports = User;
