const z = require("zod");
const perfromModel = require("../models/Performance");

const createPerform = async (req, res) => {
  const adminId = req.adminId;
  const { employeeId } = req.params;
  const { reviewPeriod, rating, feedback } = req.body;
  try {
    if (!adminId) {
      return res.json({ errors: "Access denied" });
    }
    if (!reviewPeriod || !rating || !feedback) {
      return res.json({ errors: "All fields are required" });
    }
    if (!employeeId) {
      return res.json({ errors: "Employee id not receive" });
    }
    const validation = z.object({
      reviewPeriod: z.string().min(1, { message: "All fields are required" }),
      rating: z.number().min(1, { message: "All fields are required" }).max(10),
      feedback: z.string().min(1, { message: "All fields are required" }),
    });
    const validateData = validation.safeParse(req.body);
    if (!validateData.success) {
      return res.json({ errors: "Fill all detail properly" });
    }
    const data = new perfromModel({
      employee: employeeId,
      reviewPeriod,
      rating,
      feedback,
    });
    const resp = await data.save();
    res.json({ message: "Feedback saved", resp });
  } catch (error) {
    res.json({ errors: "Internal server error in create performance" });
    console.log(error);
  }
};

const getPerform = async (req, res) => {
  const adminId = req.adminId;
  try {
    if (!adminId) {
      return res.json({ errors: "Access Denied" });
    }
    const performance = await perfromModel
      .find()
      .populate("employee", "name email");
    if (performance.length === 0) {
      res.json({ message: "No performance created yet" });
    }
    res.json(performance);
  } catch (error) {
    res.json({ errors: "Internal server error in getting performance" });
  }
};

const getOnePerform = async (req, res) => {
  const employeId = req.employeId;
  try {
    if (!employeId) {
      return res.json({ errors: "Access denied" });
    }
    const performance = await perfromModel
      .find({ employee: employeId })
      .populate("employee", "name email");
    if (performance.length === 0) {
      return res.json({ message: "No performance report created yet" });
    } else {
      res.json(performance);
    }
  } catch (error) {
    res.json({ errors: "Internal server error in getting performance" });
  }
};

const deletePerform = async (req, res) => {
  const adminId = req.adminId;
  const { performId } = req.params;
  try {
    if (!adminId || !performId) {
      return res.json({ errors: "Access denied" });
    }
    const findPerform = await perfromModel.findOne({ _id: performId });
    if (!findPerform) {
      return res.json({ errors: "Performance report not found" });
    }
    const deletePerform = await perfromModel.findByIdAndDelete({
      _id: performId,
    });
    if (!deletePerform) {
      res.json({ message: "Try again later" });
    } else {
      res.json({ message: "Report deleted successfully" });
    }
  } catch (error) {
    res.json({
      errors: "Internal server error in deleting employee performance report",
    });
  }
};

const performControl = {
  createPerform,
  getPerform,
  getOnePerform,
  deletePerform,
};

module.exports = performControl;
