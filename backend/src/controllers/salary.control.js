const z = require("zod");
const employeModel = require("../models/employee.model");
const salaryModel = require("../models/Salary");
const calculateNetSalarySafe = require("../utils/utils");

const createSalary = async (req, res) => {
  const adminId = req.adminId;
  const { employeeId } = req.params;
  const { month, bonus, tds, pf } = req.body;
  try {
    if (!adminId) {
      return res.json({ errors: "Access Denied" });
    }
    if (!month) {
      return res.json({ errors: "All fields are required" });
    }
    const empFind = await employeModel.findOne({ _id: employeeId });
    if (!empFind) {
      return res.json({ errors: "Employee not found" });
    }
    const monthHandle = await salaryModel.findOne({
      month,
      employee: employeeId,
    });
    if (monthHandle) {
      return res.json({ errors: "Salary slip already created on this month" });
    }
    const basicSalary = empFind.basicSalary || 0;
    const salaryData = calculateNetSalarySafe({
      basicSalary,
      bonus,
      pf,
      tds,
    });
    const data = new salaryModel({
      employeeId,
      month,
      bonus: salaryData.bonus,
      deduction: {
        tds: salaryData.tds,
        pf: salaryData.pf,
      },
      netSalary: salaryData.netSalary,
      basicSalary,
    });
    await data.save();
    res.json({ message: "Salary created successfully" });
  } catch (error) {
    res.json({ errors: "Internal server error in creating salary" });
  }
};

const getAllSalary = async (req, res) => {
  const adminId = req.adminId;
  try {
    if (!adminId) {
      return res.json({ errors: "Access denied" });
    }
    const data = await salaryModel.find().populate("employeeId", "name email phone");
    if (data.length === 0) {
      res.json({ message: "No salary slip found" });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.json({ errors: "Internal server error in getting salaries" });
  }
};

const getOneEmpSalary = async (req, res) => {
  const employeId = req.employeId;
  try {
    if (!employeId) {
      return res.json({ errors: "Access Denied" });
    }
    const salary = await salaryModel.find({ employeeId: employeId }).populate("employeeId","name phone email");
    if (salary.length === 0) {
      res.json({ message: "No salary slip made" });
    } else {
      res.json({ salary });
    }
  } catch (error) {
    res.json({
      errors: "Internal server error in getting salary details",
      error,
    });
  }
};

const deleteSalary = async (req, res) => {
  const adminId = req.adminId;
  const { salaryId } = req.params;
  try {
    if (!adminId) {
      return res.json({ errors: "Access denied" });
    }
    if (!salaryId) {
      return res.json({ errors: "Salary id not receive" });
    }
    const findEmp = await salaryModel.findOne({ _id: salaryId });
    if (!findEmp) {
      return res.json({ errors: "Salary slip not found" });
    }
    await salaryModel.findByIdAndDelete({ _id: salaryId });
    res.json({ message: "Salary slip deleted successfully" });
  } catch (error) {
    res.json({ errors: "Internal server error in deleting salary slip" });
    console.log(error);
  }
};

const salaryController = {
  createSalary,
  getAllSalary,
  getOneEmpSalary,
  deleteSalary,
};

module.exports = salaryController;
