const connectMongoDB = require("../db/connectMongoDB");
const Product = require("../models/productSchema");

module.exports.getAllProduct = async (req, res) => {
  try {
    await connectMongoDB();
    const products = await Product.find({});

    if (products?.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Producted Added",
        data: products,
      });
    } else {
      res.json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Product not Inserted",
      error: error.message,
    });
  }
};
module.exports.getSingleProduct = (req, res) => {
  res.send("get Single Product ");
};
module.exports.saveAProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = new Product(req.body);
    await connectMongoDB();
    if (product.quantity === 0) {
      product.status = "out-of-stock";
    }
    const addedProduct = await product.save(product);
    if (addedProduct) {
      res.status(200).json({
        status: "success",
        message: "Product Added",
        data: addedProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Product not Inserted",
      error: error.message,
    });
  }
};
