module.exports = (sequelize, DataTypes) => {
  const Admins = sequelize.define("Admins", {
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Admins;
};
