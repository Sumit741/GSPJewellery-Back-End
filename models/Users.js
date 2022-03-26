module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true,
    },
    Fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Users;
};
