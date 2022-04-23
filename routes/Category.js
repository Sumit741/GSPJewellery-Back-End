const express = require("express");
const router = express.Router();
const { Categories } = require("../models");

router.get("/", async (req, res) => {
  const category = await Categories.findAll();

  res.json(category);
});
router.post("/add", async (req, res) => {
  const categoryDet = req.body;
  await Categories.create(categoryDet);
  res.json("Category Added");
});

module.exports = router;
