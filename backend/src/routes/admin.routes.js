const express = require("express");
const adminControl = require("../controllers/admin.control");
const adminRoute = express.Router();

const { signup, login, logout, verifyAdmin } = adminControl;

adminRoute.post("/signup", signup);
adminRoute.post("/login", login);
adminRoute.post("/logout", logout);
adminRoute.post('/verify', verifyAdmin)

module.exports = adminRoute;
