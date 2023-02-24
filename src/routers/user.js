const express = require("express");
const User = require("../models/user");
const router = new express.Router();

// Create new one
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save().then(() => {
      res.status(200).send(user);
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Query one item
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Edit one item
router.patch("/users/:id", async (req, res) => {
  const update = Object.keys(req.body);
  const allowUpdates = ["name", "age", "email", "password"];
  const isValidUpdate = update.every((item) => allowUpdates.includes(item));
  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid Update!" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete one item
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
