const mongoose = require("mongoose");
const { number } = require("zod");

const salarySchema = new mongoose.Schema(
  {
    employeeId: String,
    month: String,
    name:String,
    bonus: { type: Number, default: 0 },
    netSalary: Number,
    basicSalary:Number,
    deduction: {
      pf: { type: Number, default: 0 },
      tds: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const salaryModel = mongoose.model("salary", salarySchema);

module.exports = salaryModel;
