const express = require("express");
const router = express.Router();
const { Feedbacks } = require("../models");
const { validateToken } = require("../middlewares/AuthUserMiddleware");

router.get("/", async (req, res) => {
  const feedbacks = await Feedbacks.findAll();
  res.json(feedbacks);
});
router.post("/", validateToken, async (req, res) => {
  try {
    const feedbackDet = req.body;
    const userDet = req.user;
    await Feedbacks.create({ Username: userDet.Username, ...feedbackDet });
    const newFeedbackList = await Feedbacks.findAll();
    res.json(newFeedbackList);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
