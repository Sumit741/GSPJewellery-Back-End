const express = require("express");
const router = express.Router();
const { Admins } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.json("admin");
});

router.post("/register", async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const adminExist = await Admins.findOne({ where: { Username: Username } });
    if (adminExist) {
      res.json({ error: "Username already exist choose another" });
    }
    bcrypt.hash(Password, 10).then((hash) => {
      Admins.create({ Username: Username, Password: hash });
      res.json("REGISTERED");
    });
  } catch (err) {
    res.json({ error: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const adminExist = await Admins.findOne({ where: { Username: Username } });
    if (!adminExist) {
      res.json({ error: "User doen't exist" });
    }
    bcrypt.compare(Password, adminExist.Password).then((match) => {
      if (!match) {
        res.json({ error: "Password doesn't match" });
      }
      const accessToken1 = sign(
        { Username: Username, id: adminExist.id },
        "adminTokensecret"
      );
      res.json({ token: accessToken1, Username: Username, id: adminExist.id });
    });
  } catch (error) {
    req.json({ error: error });
  }
});

module.exports = router;
