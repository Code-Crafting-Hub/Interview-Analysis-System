const employeModel = require("../models/employee.model");
const leaveModel = require("../models/leave.model");
const z = require("zod");

const createLeave = async (req, res) => {
  const employeId = req.employeId;
  const { startDate, endDate, leavetype, purpose } = req.body;
  if (!startDate || !endDate || !leavetype || !purpose) {
    return res.json({ errors: "All fields are required" });
  }
  try {
    const _id = employeId;
    const employee = await employeModel.findOne({ _id });
    if (!employee) {
      return res.json({ errors: "Login first" });
    }
    const validation = z.object({
      startDate: z.string(),
      endDate: z.string(),
      leavetype: z.string(),
      purpose: z.string(),
    });
    const validateData = validation.safeParse(req.body);
    if (!validateData.success) {
      return res.json({ errors: "Fill all fields carefully" });
    }
    const data = new leaveModel({
      startDate,
      endDate,
      approval: false,
      purpose,
      leavetype,
      employeeId: employeId,
    });
    await data.save();
    res.json({ message: "Leave sent", data });
  } catch (error) {
    res.json({ errors: "Internal server error in creating leave" });
  }
};

const getAllLeave = async (req, res) => {
  const adminId = req.adminId;
  try {
    if (!adminId) {
      return res.json({ errors: "Access Denied" });
    }
    const data = await leaveModel.find();
    res.json(data);
  } catch (error) {
    res.json({ errors: "Internal server error" });
  }
};

const approveLeave = async (req, res) => {
  const adminId = req.adminId;
  const { leaveId } = req.params;
  const { approval } = req.body;
  try {
    if (!adminId) {
      return res.json({ errors: "Access denied" });
    }
    const leave = await leaveModel.findOne({ _id: leaveId });
    if (!leave) {
      return res.json({ errors: "Leave not found" });
    }
    const updateLeave = await leaveModel.findOneAndUpdate(
      { _id: leaveId },
      { approval }
    );
    if (!updateLeave) {
      return res.json({ errors: "Error while updating leave" });
    }
    res.json({ message: "Leave update successfully" });
  } catch (error) {
    res.json({ errors: "Internal server error in approving mail" });
  }
};

const getELeave = async (req, res) => {
  const employeId = req.employeId;
  try {
    if (!employeId) {
      return res.json({ errors: "Login first" });
    }
    const empFind = await leaveModel.find({ employeeId: employeId });
    if (empFind.length === 0) {
      res.json({ message: "No leave to show" });
    } else {
      res.json(empFind);
    }
  } catch (error) {
    res.json({ errors: "Internal server error" });
  }
};

const deleteLeave = async (req, res) => {
  const adminId = req.adminId
  const {leaveId} = req.params
  try {
    if(!adminId){
      return res.json({errors:"Access denied"})
    }
    if(!leaveId){
      return res.json({errors:"Leave not receive"})
    }
    const resLeave = await leaveModel.findOne({_id:leaveId})
    if(!resLeave){
      return res.json({errors:"Leave not found"})
    }
    const leaveDelete = await leaveModel.findOneAndDelete({_id:leaveId})
    if(leaveDelete){
      res.json({message:"Leave deleted successfully"})
    }
  } catch (error) {
    res.json({errors:"Internal server error in deleting leave"})
  }
};

const leaveControl = { createLeave, getAllLeave, approveLeave, getELeave, deleteLeave };

module.exports = leaveControl;
