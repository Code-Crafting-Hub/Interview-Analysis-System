const express = require("express");
const {
  createLeave,
  getAllLeave,
  approveLeave,
  getELeave,
  deleteLeave,
} = require("../controllers/leave.control");
const isEmployee = require("../middleware/isEmployee");
const isAdmin = require("../middleware/isAdmin");

const leaveRouter = express.Router();

leaveRouter.post("/leave", isEmployee, createLeave);
leaveRouter.post("/getall", isAdmin, getAllLeave);
leaveRouter.post("/update/:leaveId", isAdmin, approveLeave);
leaveRouter.post("/emp/leave", isEmployee, getELeave);
leaveRouter.delete("/delete/:leaveId", isAdmin, deleteLeave)

module.exports = leaveRouter;
