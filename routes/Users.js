const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");
const Sequelize = require("sequelize");
const { validateToken } = require("../middlewares/AuthUserMiddleware");
const Op = Sequelize.Op;

router.get("/", async (req, res) => {
  const user = await Users.findAll({ attributes: { exclude: ["password"] } });
  res.json(user);
});
router.post("/filter", async (req, res) => {
  const name = req.body;
  const users = await Users.findAll({
    where: {
      [Op.or]: [
        { FullName: { [Op.like]: `%${name.name}%` } },
        { Username: { [Op.like]: `%${name.name}%` } },
        { Address: { [Op.like]: `%${name.name}%` } },
        { Email: { [Op.like]: `%${name.name}%` } },
      ],
    },
  });
  res.json(users);
});
router.post("/register", async (req, res) => {
  const { Username, Firstname, Lastname, Email, Address, Password } = req.body;
  const user = await Users.findOne({ where: { Username: Username } });
  if (user) {
    res.json("User Already exist. Please chose another username");
  } else {
    bcrypt.hash(Password, 10).then((hash) => {
      Users.create({
        Username: Username,
        Fullname: Firstname + " " + Lastname,
        Email: Email,
        Address: Address,
        Password: hash,
      });
    });
    res.json("SUCCESSFUL REGISTRATION");
  }
});

router.post("/login", async (req, res) => {
  const { Username, Password } = req.body;
  const User = await Users.findOne({ where: { Username: Username } });
  if (User) {
    bcrypt.compare(Password, User.Password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong Password Entered" });
      } else {
        const accessToken = sign(
          { Username: Username, Email: User.Email, id: User.id },
          "secretCode"
        );
        res.json({ token: accessToken, message: "YOU ARE LOGGED IN" });
      }
    });
  } else {
    res.json({ error: "User doesn't exist" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Users.destroy({ where: { id: id } });
  const newUsersList = await Users.findAll();
  res.json(newUsersList);
});

router.get("/auth", validateToken, async (req, res) => {
  const userDet = req.user;
  const user = await Users.findOne({
    where: { id: userDet.id },
    attributes: { exclude: ["Password"] },
  });
  res.json(user);
});
module.exports = router;
