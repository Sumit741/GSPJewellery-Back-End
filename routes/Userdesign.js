const express = require("express");
const router = express.Router();
const { Userdesign } = require("../models");

router.get("/", async (req, res) => {
  const picData = await Userdesign.findAll();
  res.json(picData);
});

router.post("/", async (req, res) => {
  const picturesLink = req.body;
  await Userdesign.create(picturesLink);
  res.json("SUCCESS");
});

module.exports = router;
