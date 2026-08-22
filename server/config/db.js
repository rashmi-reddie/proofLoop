const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connection successful");
  } catch (err) {
    console.log(`error : ${err}`);
  }
};

module.exports = connectDB;
