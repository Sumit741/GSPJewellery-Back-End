module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
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
  return Users;
};
