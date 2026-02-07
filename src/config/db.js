const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    const URI = config.mongoURI;
    await mongoose.connect(URI, {
      user: config.dbUser || "",
      pass: config.dbPass || "",
      autoIndex: true,
    });
    console.log(`✅ MongoDB Connected: ${URI}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
