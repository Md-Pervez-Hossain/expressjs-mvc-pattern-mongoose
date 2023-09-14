const mongoose = require("mongoose");
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_BD_URI);
    console.log("mongoose Connected");
  } catch (error) {
    console.log("Server Error To Connect", error);
  }
};

module.exports = connectMongoDB;
