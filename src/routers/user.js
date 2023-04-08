const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");

// Sign up
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save().then(() => {
      res.status(200).send({ user, token });
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// Edit profile
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "age", "email", "password"];
  const isValidUpdate = updates.every((item) => allowUpdates.includes(item));
  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid Update!" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

// Logout user
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

// Delete account
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// LogoutAll
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Set user avatar
const upload = multer({
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Please upload a image document!"));
    }
    cb(undefined, true);
  },
});
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Delete avatar
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// Read avatar
router.get("/users/:id/avatar", async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
