module.exports = (sequelize, DataTypes) => {
  const Userdesign = sequelize.define("Userdesign", {
    Link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Userdesign;
};
