const connectMongoDB = require("../db/connectMongoDB");
const Product = require("../models/productSchema");

module.exports.getAllProducts = async () => {
  const product = await Product.find({});
  return product;
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

module.exports.BulkUpdateProductsService = async (data) => {
  try {
    await connectMongoDB();
    // const result = await Product.updateMany({ _id: data.ids }, data.data, {
    //   runValidators: true,
    // });

    const products = [];
    data.ids.forEach((product) => {
      products.push(Product.updateOne({ _id: product.id }, product.data));
    });

    const result = await Promise.all(products);
    return result;
  } catch (error) {
    console.error("Error saving product:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};
