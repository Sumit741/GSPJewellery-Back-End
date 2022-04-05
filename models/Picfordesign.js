module.exports = (sequelize, DataTypes) => {
  const Picfordesign = sequelize.define("Picfordesign", {
    Link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    For: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Picfordesign;
};
