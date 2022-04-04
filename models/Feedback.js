module.exports = (sequelize, DataTypes) => {
  const Feedbacks = sequelize.define("Feedbacks", {
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Feedback: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Feedbacks;
};
