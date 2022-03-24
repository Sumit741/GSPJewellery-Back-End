const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const db = require("./models");

const userRoute = require("./routes/Users");
app.use("/user", userRoute);

const adminRoute = require("./routes/Admin");
app.use("/admin", adminRoute);

const productsRoute = require("./routes/Products");
app.use("/product", productsRoute);

const messagesRoute = require("./routes/UserMessage");
app.use("/message", messagesRoute);

db.sequelize
  .sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("Serer started at 3001");
    });
  })
  .catch((error) => console.log(error.Message));
