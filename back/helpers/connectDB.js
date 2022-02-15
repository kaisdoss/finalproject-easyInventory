const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        throw err;
      }
      console.log("DataBase connected .....");
    }
  );
};

module.exports = connectDB;
