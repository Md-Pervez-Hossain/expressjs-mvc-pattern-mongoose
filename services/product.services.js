const connectMongoDB = require("../db/connectMongoDB");
const Product = require("../models/productSchema");

module.exports.getAllProducts = async (filters, queries) => {
  console.log(filters);
  const product = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .limit(queries.limitBy);
  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  return { product, totalProducts, pageCount };
};
module.exports.addProducts = async (data) => {
  const allproduct = new Product(data);
  console.log(allproduct);
  if (allproduct.quantity === 0) {
    allproduct.status = "out-of-stock";
  }
  try {
    const product = await allproduct.save(); // Use .save() on the instance, not on the model
    console.log("save a product", product);
    return product;
  } catch (error) {
    console.error("Error saving product:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};

module.exports.updateProductsService = async (productId, data) => {
  try {
    await connectMongoDB();
    // const result = await Product.updateOne(
    //   { _id: productId },
    //   { $set: data },
    //   {
    //     runValidators: true,
    //   }
    // );

    const product = await Product.findById(productId);
    const result = await product.set(data).save();
    return result;
  } catch (error) {
    console.error("Error saving product:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};

module.exports.DeleteProductsService = async (id) => {
  try {
    await connectMongoDB();
    const result = await Product.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.error("Error saving product:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};

module.exports.BulkDeleteProductsService = async (ids) => {
  try {
    await connectMongoDB();
    const result = await Product.deleteMany({ _id: ids });
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error saving product:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};
