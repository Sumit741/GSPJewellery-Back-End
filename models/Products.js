module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    ElementType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Carat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    For: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NetWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    WeightWithLoss: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Charge: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Stone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Products.associate = (models) => {
    Products.hasOne(models.Orders, {
      onDelete: "cascade",
    });
  };
  return Products;
};
