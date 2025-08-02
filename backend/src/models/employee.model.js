const mongoose = require("mongoose");

const employeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    department:{
      type: String,
    },
    basicSalary:{
      type: String,
      required: true
    },
    email: {
      type:String,
      required: true,
      unique: true
    },
    phone: {
      type:String,
      required: true,
      unique:true
    },
    password: {
      type: String,
    },
    createrId:{
      type:String,
    },
  },
  { timestamps: true }
);

const employeModel = mongoose.model("employee", employeSchema);

module.exports = employeModel;
