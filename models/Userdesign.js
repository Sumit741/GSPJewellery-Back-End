module.exports = (sequelize, DataTypes) => {
  const Userdesign = sequelize.define("Userdesign", {
    Link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Userdesign;
};
