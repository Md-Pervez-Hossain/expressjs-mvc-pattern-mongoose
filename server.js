const express = require("express");
const app = express();
const cors = require("cors");
const connectMongoDB = require("./db/connectMongoDB");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
connectMongoDB();

// Define specific routes and handlers here

app.all("*", (req, res) => {
  res.send("No Route Found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
