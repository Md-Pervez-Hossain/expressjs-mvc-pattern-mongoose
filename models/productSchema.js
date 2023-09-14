const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Give A Name For This Product"],
      trim: true,
      unique: [true, "Name Must Be Unique"],
      minLength: [3, "Product Name At Least 3 Character"],
      maxLength: [100, "Product Name max Character 100"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price Can't Be Negative"],
    },
    unite: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pics"],
        message:
          "Unite Value Can not Be ${}value , Unite Value must be kg/liter/pics",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity Can't Be Negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity Must Be An integer",
    },
    status: {
      type: String,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status Can not Be ${}value ",
      },
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
    },
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: {
      type: true,
    },
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
