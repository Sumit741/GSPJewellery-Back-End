const express = require("express");
const router = express.Router();
const { Products } = require("../models");

router.get("/byCategory/:category", async (req, res) => {
  const category = req.params.category;
  const product = await Products.findAll({
    where: { ProductCategory: category },
  });
  if (product.length > 0) {
    res.json(product);
  } else {
    res.json({ error: "No Products For Given Category" });
  }
});

router.get("/byProductId/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Products.findByPk(id);
  if (product) {
    res.json(product);
  } else {
    res.json({ error: "No Products For Given Category" });
  }
});

router.post("/add", async (req, res) => {
  const productDetails = req.body;
  await Products.create(productDetails);
  res.json(productDetails);
});

module.exports = router;
