const express = require("express");
const app = express();

const db = require("./models");

db.sequelize
  .sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("Serer started at 3001");
    });
  })
  .catch((error) => console.log(error.Message));
