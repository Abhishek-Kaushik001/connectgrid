const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("DB connection error ❌");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;