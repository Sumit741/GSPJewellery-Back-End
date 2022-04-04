module.exports = (sequelize, DataTypes) => {
  const Userdesign = sequelize.define("Userdesign", {
    Link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Userdesign;
};
