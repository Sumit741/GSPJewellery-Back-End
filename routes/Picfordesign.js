const express = require("express");
const router = express.Router();
const { Picfordesign } = require("../models");

router.get("/", async (req, res) => {
  const picData = await Picfordesign.findAll();
  res.json(picData);
});

router.post("/", async (req, res) => {
  const picDetails = req.body;
  await Picfordesign.create(picDetails);
  res.json("SUCCESS");
});

module.exports = router;
