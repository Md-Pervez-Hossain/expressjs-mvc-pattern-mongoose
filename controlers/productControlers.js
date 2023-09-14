const connectMongoDB = require("../db/connectMongoDB");
const Product = require("../models/productSchema");

module.exports.getAllProduct = (req, res) => {
  res.send("get All Peoduct");
};
module.exports.getSingleProduct = (req, res) => {
  res.send("get Single Peoduct ");
};
module.exports.saveAProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = req.body;
    await connectMongoDB();
    const addedProduct = await Product.create(product);
    if (addedProduct) {
      res.status(201).json({ message: "Producted Added", addedProduct });
    }
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
