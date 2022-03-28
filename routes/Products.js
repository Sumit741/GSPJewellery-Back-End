const express = require("express");
const router = express.Router();
const { Products, Orders } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
  const updateProductsList = await Products.findAll();
  res.json(updateProductsList);
});

module.exports = router;

router.get("/getProducts", async (req, res) => {
  const category = req.query.category;
  const filter = req.query.filter;

  const products = await Products.findAll({
    ProductCategory: "rings",
    For: "female",
  });
  res.json(products);
});
router.get("/filteritems", async (req, res) => {
  try {
    const category = req.query.category;
    const filter = req.query.filter;
    const element = req.query.element;

    if (category !== "all") {
      if (category && filter) {
        const products = await Products.findAll({
          where: {
            ProductCategory: category,
            For: filter,
            ElementType: element,
          },
        });
        res.json(products);
      } else if (category) {
        const products = await Products.findAll({
          where: { ProductCategory: category, ElementType: element },
        });
        if (products) {
          res.json(products);
        } else {
          res.json("No Produxts");
        }
      }
    } else {
      if (filter) {
        const products = await Products.findAll({
          where: { For: filter, ElementType: element },
        });
        res.json(products);
      } else {
        const products = await Products.findAll({
          where: { ElementType: element },
        });
        res.json(products);
      }
    }
    // const products = await Products.findAll({
    //   where: { ElementType: element },
    // });
    // res.json(products);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/search", async (req, res) => {
  const keyword = req.body;
  const products = await Products.findAll({
    where: {
      [Op.or]: [
        { ElementType: { [Op.like]: `%${keyword.text}%` } },
        { ProductName: { [Op.like]: `%${keyword.text}%` } },
        { ProductCategory: { [Op.like]: `%${keyword.text}%` } },
        { Carat: { [Op.like]: `%${keyword.text}%` } },
        { NetWeight: { [Op.like]: `%${keyword.text}%` } },
        { Stone: { [Op.like]: `%${keyword.text}%` } },
      ],
    },
  });
  res.json(products);
});

router.get("/all", async (req, res) => {
  try {
    const prod = await Products.findAll();
    res.json(prod);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/orders", async (req, res) => {
  const productOrders = await Products.findAll({ include: [Orders] });
  res.json(productOrders);
});
