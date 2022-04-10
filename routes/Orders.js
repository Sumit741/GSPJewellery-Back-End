const express = require("express");
const router = express.Router();
const { Orders, Products } = require("../models");

router.get("/", async (req, res) => {
  const orders = await Orders.findAll();
  res.json(orders);
});

router.post("/", async (req, res) => {
  const order = req.body;
  await Orders.create({
    UserId: order.UserId,
    Customername: order.Customername,
    OrderAddress: order.OrderAddress,
    unitPrice: order.unitPrice,
    Quantity: order.Quantity,
    TotalPrice: order.TotalPrice,
    PaymentOption: order.PaymentOption,
    PaymentStatus: order.PaymentStatus,
    OrderStatus: order.OrderStatus,
    ProductId: order.ProductId,
  });
  res.json(order);
});

module.exports = router;
