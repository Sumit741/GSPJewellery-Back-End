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

router.post("/byProductId", async (req, res) => {
  const { id } = req.body;
  const product = await Products.findByPk(id);
  if (product) {
    res.json(product);
  } else {
    res.json({ error: "No Products For Given Category" });
  }
});

router.get("/", async (req, res) => {
  const products = await Products.findAll();
  res.json(products);
});

router.post("/add", async (req, res) => {
  const productDetails = req.body;
  await Products.create(productDetails);
  res.json(productDetails);
});

router.put("/byProductId", async (req, res) => {
  try {
    const productDet = req.body;
    const product = await Products.findByPk(productDet.id);
    if (!product) {
      res.json({ error: "Product doesn't exist" });
    } else {
      await Products.update(
        {
          ElementType: productDet.ElementType,
          ProductCategory: productDet.ProductCategory,
          Carat: productDet.Carat,
          For: productDet.For,
          Image: productDet.Image,
          ProductName: productDet.ProductName,
          NetWeight: productDet.NetWeight,
          WeightWithLoss: productDet.WeightWithLoss,
          Charge: productDet.Charge,
          Stone: productDet.Stone,
        },
        { where: { id: productDet.id } }
      );
      res.json({ message: "Successfully updated" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Products.destroy({ where: { id: id } });
  res.json("Deleted Successfully");
});

module.exports = router;
