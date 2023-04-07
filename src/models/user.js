const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = mongoose.Schema(
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        default: "",
      },
      email: {
        type: String,
        unique: true,
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
      tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
      avatar: {
        type: Buffer,
      },
    },
    { timestamps: true }
  )
);

// Relation between two model & add new field to model
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});
// Check matching password hashed
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login !");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login !");
  }
  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Delete user tasks when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

// Set token for user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "weatherapp");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Get public profile
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
