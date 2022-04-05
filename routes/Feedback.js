const express = require("express");
const router = express.Router();
const { Feedbacks } = require("../models");

router.get("/", async (req, res) => {
  const feedbacks = await Feedbacks.findAll();
  res.json(feedbacks);
});
router.post("/", async (req, res) => {
  try {
    const feedbackDet = req.body;
    await Feedbacks.create(feedbackDet);
    const newFeedbackList = await Feedbacks.findAll();
    res.json(newFeedbackList);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
