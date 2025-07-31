const employeModel = require("../models/employee.model");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");

const signup = async (req, res) => {
  const adminId = req.adminId;
  const { name, phone, email, password, basicSalary, department } = req.body;
  try {
    if (!adminId) {
      return res.json({ errors: "Access denied" });
    }
    if (!name || !phone || !email || !password || !department) {
      return res.json({ errors: "All fields are required" });
    }
    const regex = /^\+91[6-9]\d{9}$/;
    const validNumber = regex.test(phone);
    if (!validNumber) {
      return res.json({ errors: "Enter valid Indian contact number only" });
    }
    const existingNumber = await employeModel.findOne({ phone });
    const existingMail = await employeModel.findOne({ email });
    if (existingNumber || existingMail) {
      return res.json({ message: "Employee already exists" });
    }
    const employeeValidate = z.object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z
        .string()
        .min(8, { message: "Password should be 8 char long" }),
      department: z.string(),
      basicSalary: z.number(),
    });
    const validateData = employeeValidate.safeParse(req.body);
    if (!validateData.success) {
      return res.json({ errors: "Invalid credentials" });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const employeeData = new employeModel({
      name,
      email,
      phone,
      ...(basicSalary > 0 && { basicSalary }),
      department,
      password: hashedPassword,
      createrId: adminId,
    });
    await employeeData.save();
    res.json({ message: "Signup successfully" });
  } catch (error) {
    res.json({ errors: "Internal server error in employee signup" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({ errors: "All fields are required" });
    }
    const employee = await employeModel.findOne({ email });
    if (!employee) {
      return res.json({ errors: "Employee not exists" });
    }
    const verify = await bcrypt.compare(password, employee.password);
    if (!verify) {
      return res.json({ errors: "Invalid password" });
    }
    const token = jwt.sign(
      {
        id: employee._id,
      },
      config.JWT_USER_PASSWORD,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("jwt", token);
    res.json({ message: "Login successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ errors: "Internal server error in employee login" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Logout Successfully" });
  } catch (error) {}
};

const editPass = async (req, res) => {
  const employeId = req.employeId;
  const { newPass } = req.body;
  try {
    const _id = employeId;
    const employee = await employeModel.findOne({ _id });
    if (!employee) {
      return res.json({ errors: "Login first" });
    }
    const passValidate = z.object({
      newPass: z.string().min(8, { message: "Password should be 8 char long" }),
    });
    const validatePass = passValidate.safeParse(req.body);
    if (!validatePass.success) {
      return res.json({ errors: "Password should be 8 char long" });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(newPass, salt);
    const updatePass = await employeModel.findByIdAndUpdate(_id, {
      password: hashedPassword,
    });
    res.json({ message: "Password update successfully", updatePass });
  } catch (error) {
    res.json({ errors: "Internal server error in change password" });
  }
};

const editData = async (req, res) => {
  const adminId = req.adminId;
  const { employeeId } = req.params;
  const { name, email, phone, basicSalary, department } = req.body;
  try {
    if (!name || !email || !phone || !basicSalary || !department) {
      return res.json({ errors: "Fill all detail carefully" });
    }
    const regex = /^\+91[6-9]\d{9}$/;
    const validNumber = regex.test(phone);
    if (!validNumber) {
      return res.json({ errors: "Enter valid Indian contact number only" });
    }
    const employeeValidate = z.object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z.string().email({ message: "Invalid email" }),
    });
    const validateData = employeeValidate.safeParse(req.body);
    if (!validateData.success) {
      return res.json({ errors: "Invalid credentials" });
    }
    if (!adminId) {
      return res.json({ errors: "Access denied" });
    }
    if (!employeeId) {
      return res.json({ errors: "Employee id not receive" });
    }
    const employee = await employeModel.findOne({ _id: employeeId });
    if (!employee) {
      return res.json({ errors: "Employee not found" });
    }
    const data = {
      name,
      email,
      basicSalary,
      department,
      phone,
    };
    const response = await employeModel.findOneAndUpdate(
      { _id: employeeId },
      data
    );
    if (response) {
      res.json({ message: "Data update successfully" });
    } else {
      res.json({ errors: "Error in updating data" });
    }
  } catch (error) {
    console.log("error:", error);
    res.json({ errors: "Internal server error in edit Data" });
  }
};

const getAllData = async (req, res) => {
  const adminId = req.adminId;
  try {
    if (!adminId) {
      return res.json({ errors: "Access denied" });
    }
    const detail = await employeModel.find();
    res.json(detail);
  } catch (error) {
    res.json({ errors: "Internal server error in getting data" });
  }
};

const getOneData = async (req, res) => {
  const employeId = req.employeId;
  try {
    if (!employeId) {
      return res.json({ errors: "Access denied" });
    }
    const emp = await employeModel.findOne({ _id: employeId });
    if (emp) {
      res.json(emp);
    } else {
      res.json({ errors: "Data not exists" });
    }
  } catch (error) {
    res.json({ errors: "Internal server error" });
  }
};

const deleteEmp = async (req, res) => {
  const adminId = req.adminId;
  const { employeeId } = req.params;
  try {
    if (!adminId) {
      return res.json({ errors: "Access denied" });
    }
    if (!employeeId) {
      return res.json({ errors: "Employee id not receive" });
    }
    const deleteRes = await employeModel.findOneAndDelete({ _id: employeeId });
    if (deleteRes) {
      res.json({ message: "Employee data remove successfully" });
    } else {
      res.json({ errors: "Employee not exists" });
    }
  } catch (error) {
    res.json({ errors: "Internal server error in deleting employee" });
  }
};

const employeControl = {
  signup,
  login,
  logout,
  editPass,
  editData,
  getAllData,
  getOneData,
  deleteEmp,
};

module.exports = employeControl;
