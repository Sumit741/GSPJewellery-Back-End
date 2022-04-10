const express = require("express");
const router = express.Router();
const { Userdesign } = require("../models");
const { validateToken } = require("../middlewares/AuthUserMiddleware");

router.get("/", async (req, res) => {
  const picData = await Userdesign.findAll();
  res.json(picData);
});

router.post("/", validateToken, async (req, res) => {
  const pictureDetails = req.body;
  const userDetails = req.user;
  await Userdesign.create({
    Link: pictureDetails.Link,
    Username: userDetails.Username,
    Email: userDetails.Email,
    Note: pictureDetails.Note,
  });
  res.json("SUCCESS");
});

router.get("/auth", validateToken, async (req, res) => {
  const email = req.user.Email;
  res.json({ email: email });
});

module.exports = router;
