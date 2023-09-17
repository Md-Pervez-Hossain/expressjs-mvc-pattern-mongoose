const connectMongoDB = require("../db/connectMongoDB");
const Product = require("../models/productSchema");
const {
  getAllProducts,
  addProducts,
  updateProductsService,
  BulkUpdateProductsService,
} = require("../services/product.services");

module.exports.getAllProduct = async (req, res) => {
  try {
    await connectMongoDB();
    const products = await getAllProducts();
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
module.exports.bulkUpdateProduct = async (req, res) => {
  try {
    const result = await BulkUpdateProductsService(req.body);
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Product Updated",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't update",
      error: error.message,
    });
  }
};
module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateProductsService(id, req.body);
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Product Updated",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't update",
      error: error.message,
    });
  }
};
module.exports.saveAProduct = async (req, res) => {
  try {
    await connectMongoDB();
    const addedProduct = await addProducts(req.body);
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
