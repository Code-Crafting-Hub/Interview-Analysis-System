const express = require("express");
const isAdmin = require("../middleware/isAdmin");
const employeControl = require("../controllers/employee.control");
const isEmployee = require("../middleware/isEmployee");

const {
  signup,
  login,
  logout,
  editPass,
  editData,
  getAllData,
  getOneData,
  deleteEmp,
} = employeControl;

const employeRoutes = express.Router();

employeRoutes.post("/signup", isAdmin, signup);
employeRoutes.post("/login", login);
employeRoutes.post("/logout", logout);
employeRoutes.put("/updatepass", isEmployee, editPass);
employeRoutes.put("/updatedata/:employeeId", isAdmin, editData);
employeRoutes.post("/getall", isAdmin, getAllData);
employeRoutes.get("/getone", isEmployee, getOneData);
employeRoutes.post("/verify", isEmployee)
employeRoutes.delete("/delete/:employeeId", isAdmin, deleteEmp);

module.exports = employeRoutes;
