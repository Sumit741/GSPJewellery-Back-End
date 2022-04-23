module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    CategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CategoryDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Categories;
};
