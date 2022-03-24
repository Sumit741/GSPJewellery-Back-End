const express = require("express");
const { validateToken } = require("../middlewares/AuthUserMiddleware");
const { UserMessage } = require("../models");
const router = express.Router();

router.get("/distinct", async (req, res) => {
  const message = await UserMessage.findAll({
    distinct: "UserId",
  });
  res.json(message);
});

router.post("/send", validateToken, async (req, res) => {
  const messageDet = req.body;
  const userid = req.user.id;
  await UserMessage.create({ UserId: userid, ...messageDet });
  res.json("message sent successfully");
});

router.get("distinctUser", async (req, res) => {});

module.exports = router;
