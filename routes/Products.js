const express = require("express");
const router = express.Router();
const { Products, Orders } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const axios = require("axios");
const { response } = require("express");

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
          // Image: productDet.Image,
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

router.post("/filterOrders", async (req, res) => {
  const keywords = req.body;
  const productOrders = await Products.findAll({ include: [Orders] });
  const filteredList = productOrders
    .filter((item) => item.Order !== null)
    .filter(
      (item) =>
        item.ElementType.toLowerCase().includes(keywords.text.toLowerCase()) ||
        item.id === keywords.text ||
        item.ProductName.toLowerCase().includes(keywords.text.toLowerCase()) ||
        item.Order.TotalPrice === parseInt(keywords.text) ||
        item.Order.PaymentOption.toLowerCase().includes(
          keywords.text.toLowerCase()
        ) ||
        item.Order.PaymentStatus.toLowerCase().includes(
          keywords.text.toLowerCase()
        ) ||
        item.ProductCategory.toLowerCase().includes(keywords.text.toLowerCase())
    );

  res.json(filteredList);
});

router.get("/count", async (req, res) => {
  const count = await Products.findAll({
    attributes: [
      "ProductCategory",
      [Sequelize.fn("COUNT", Sequelize.col("ProductCategory")), "no_of_prod"],
    ],
    group: ["Products.ProductCategory"],
  });
  res.json(count);
});

router.get("/orderscount", async (req, res) => {
  const count = await Products.findAll({
    attributes: [
      "ProductCategory",
      [Sequelize.fn("COUNT", Sequelize.col("Order.ProductId")), "orders"],
    ],
    include: [Orders],
    group: ["Order.ProductId"],
  });
  res.json(count);
});

router.get("/testfilter", async (req, res) => {
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

router.get("/ft", async (req, res) => {
  const category = req.query.category;
  const filter = req.query.filter;
  const element = req.query.element;
  const carat = req.query.carat;

  if (category !== "all") {
    if (category && filter && carat) {
      const products = await Products.findAll({
        where: {
          ProductCategory: category,
          For: filter,
          Carat: carat,
          ElementType: element,
        },
      });
      res.json(products);
    } else if (category && filter) {
      const products = await Products.findAll({
        where: { ProductCategory: category, For: filter, ElementType: element },
      });
      res.json(products);
    } else if (category && carat) {
      const products = await Products.findAll({
        where: {
          ProductCategory: category,
          Carat: carat,
          ElementType: element,
        },
      });
      res.json(products);
    } else {
      const products = await Products.findAll({
        where: { ProductCategory: category, ElementType: element },
      });
      res.json(products);
    }
  } else {
    if (filter && carat) {
      const products = await Products.findAll({
        where: { Carat: carat, For: filter, ElementType: element },
      });
      res.json(products);
    } else if (filter) {
      const products = await Products.findAll({
        where: { ElementType: element, For: filter },
      });
      res.json(products);
    } else if (carat) {
      const products = await Products.findAll({
        where: { ElementType: element, Carat: carat },
      });
      res.json(products);
    } else {
      const products = await Products.findAll({
        where: { ElementType: element },
      });
      res.json(products);
    }
  }
});

router.get("/filtercategoryproducts/:category", async (req, res) => {
  const category = req.params.category;
  const gender = req.query.gender;
  const element = req.query.element;
  const carat = req.query.carat;

  if (gender && element && carat) {
    const products = await Products.findAll({
      where: {
        ProductCategory: category,
        For: gender,
        ElementType: element,
        Carat: carat,
      },
    });
    res.json(products);
  } else if (gender && element) {
    const products = await Products.findAll({
      where: {
        ProductCategory: category,
        For: gender,
        ElementType: element,
      },
    });
    res.json(products);
  } else if (element && carat) {
    const products = await Products.findAll({
      where: {
        ProductCategory: category,
        ElementType: element,
        Carat: carat,
      },
    });
    res.json(products);
  } else if (gender) {
    const products = await Products.findAll({
      where: {
        ProductCategory: category,
        For: gender,
      },
    });
    res.json(products);
  } else if (element) {
    const products = await Products.findAll({
      where: {
        ProductCategory: category,
        ElementType: element,
      },
    });
    res.json(products);
  } else {
    const products = await Products.findAll({
      where: {
        ProductCategory: category,
      },
    });
    res.json(products);
  }
});
