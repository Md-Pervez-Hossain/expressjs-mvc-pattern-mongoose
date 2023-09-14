const express = require("express");
const app = express();
const cors = require("cors");
const connectMongoDB = require("./db/connectMongoDB");
const productRouter = require("./routes/productRoute/v1/product.route");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

//Database Connect
connectMongoDB();

//Routes Here
app.use("/api/v1/product", productRouter);

app.all("*", (req, res) => {
  res.send("No Route Found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
