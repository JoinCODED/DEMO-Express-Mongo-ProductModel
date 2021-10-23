const mongoose = require("mongoose");

const CookieSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
});

module.exports = mongoose.model("Cookie", CookieSchema);
