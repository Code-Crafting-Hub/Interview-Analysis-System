const mongoose = require("mongoose");

const adminScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  password: String,
});

const adminModel = mongoose.model("admin", adminScema);

module.exports = adminModel;
