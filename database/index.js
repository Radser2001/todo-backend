require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
};

exports.connectDB = connectDB;
