const connectMongoDB = require("../db/connectMongoDB");
const Product = require("../models/productSchema");
const {
  getAllProducts,
  addProducts,
  updateProductsService,
  BulkUpdateProductsService,
  DeleteProductsService,
  BulkDeleteProductsService,
} = require("../services/product.services");

module.exports.getAllProduct = async (req, res) => {
  try {
    await connectMongoDB();
    let filters = { ...req.query };
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|lt|gte|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);
    const queryFields = ["sort", "limit", "page"];
    queryFields.forEach((field) => delete filters[field]);
    const queries = {};
    console.log("fields", req.query.fields);
    if (req.query.fields) {
      const fieldsBy = req.query.fields.split(",").join(" ");
      queries.fieldsBy = fieldsBy;
    }
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.page) {
      console.log(req.query);
      const { page = 1, limit = 2 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getAllProducts(filters, queries);
    console.log(products);
    res.status(200).json({
      status: "success",
      message: "Producted Added",
      totalProduct: products.totalProducts,
      pageCount: products.pageCount,
      data: products.product,
    });
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
module.exports.DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await DeleteProductsService(id);
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Product Deleted",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't Deleted",
      error: error.message,
    });
  }
};

module.exports.bulkDeleteProduct = async (req, res) => {
  try {
    const result = await BulkDeleteProductsService(req.body.ids);
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Products Deleted",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't Deleted",
      error: error.message,
    });
  }
};
