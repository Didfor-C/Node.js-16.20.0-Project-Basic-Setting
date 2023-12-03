const mongoose = require("mongoose");

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Additional options
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
