module.exports = (sequelize, DataTypes) => {
  const UserMessage = sequelize.define("UserMessage", {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MessageText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return UserMessage;
};
