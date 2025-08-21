const jwt = require("jsonwebtoken");
const adminModel = require("../models/Admin");
const z = require("zod");
const config = require("../../config");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    if (!name || !phone || !email || !password) {
      return res.json({ errors: "All fields are required" });
    }
    const regex = /^\+91[6-9]\d{9}$/;
    const validNumber = regex.test(phone);
    if (!validNumber) {
      return res.json({ errors: "Enter valid Indian contact number only" });
    }
    const existingNumber = await adminModel.findOne({ phone });
    const existingMail = await adminModel.findOne({ email });
    if (existingNumber || existingMail) {
      return res.json({ message: "Admin already exists" });
    }
    const adminValidate = z.object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z
        .string()
        .min(8, { message: "Password should be 8 char long" }),
    });
    const validateData = adminValidate.safeParse(req.body);
    if (!validateData.success) {
      return res.json({ errors: "Invalid credentials" });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const adminData = new adminModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await adminData.save();
    res.json({ message: "Signup successfully" });
  } catch (error) {
    res.json({ errors: "Internal server error in admin signup" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({ errors: "All fields are required" });
    }
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.json({ errors: "Admin not exists" });
    }
    const verify = await bcrypt.compare(password, admin.password);
    if (!verify) {
      return res.json({ errors: "Invalid password" });
    }
    const token = jwt.sign(
      {
        id: admin._id,
      },
      config.JWT_ADMIN_PASSWORD,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("jwt", token);
    res.json({ message: "Login successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ errors: "Internal server error in admin login" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Logout Successfully" });
  } catch (error) {}
};

const verifyAdmin = async (req, res) => {
  const auth = req.headers.authorization;
  try {
    if (!auth || !auth.startsWith("Bearer")) {
      return res.json({ errors: "Unauthorized access" });
    }
    const token = auth.split(" ")[1];
    if (!token || token === "null") {
      return res.json({ errors: "Unauthorized access" });
    }
    const decoded = jwt.verify(token, config.JWT_ADMIN_PASSWORD);
    if (!decoded || !decoded.id) {
      return res.json({ errors: "Unauthorized access" });
    }
    res.json({message:"Login successfully"})
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ errors: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ errors: "Invalid token" });
    }
    res.json({ errors: "Access Denied" });
  }
};

const adminControl = { signup, login, logout, verifyAdmin };

module.exports = adminControl;
