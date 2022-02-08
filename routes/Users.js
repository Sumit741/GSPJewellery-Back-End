const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const user = await Users.findAll();
  res.json(user);
});

router.post("/register", async (req, res) => {
  const { Username, Password } = req.body;
  const user = await Users.findOne({ where: { Username: Username } });
  if (user) {
    res.json("User Already exist. Please chose another username");
  } else {
    bcrypt.hash(Password, 10).then((hash) => {
      Users.create({ Username: Username, Password: hash });
    });
    res.json("SUCCESSFUL REGISTRATION");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const User = await Users.findOne({ where: { Username: Username } });
    if (!User) {
      res.json({ error: "User doesn't exist" });
    }
    bcrypt.compare(Password, User.Password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong Password Entered" });
      }
      const accessToken = sign(
        { Username: Username, id: User.id },
        "secretCode"
      );
      res.json({ token: accessToken, message: "YOU ARE LOGGED IN" });
    });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
