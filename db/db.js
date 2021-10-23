const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://lailz:lailz123@katakeet.ddgnc.mongodb.net/Katakeet?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
