module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Customername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OrderAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TotalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    PaymentOption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PaymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OrderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Orders;
};
