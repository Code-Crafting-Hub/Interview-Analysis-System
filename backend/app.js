const express = require("express");
const { dbConnection } = require("./database/database");
const adminRoute = require('./src/routes/admin.routes');
const employeRoutes = require("./src/routes/employe.routes");
const leaveRouter = require("./src/routes/leave.route");

const app = express();
dbConnection();

app.use(express.json())

app.use('/api/v1/admin',adminRoute)
app.use('/api/v1/employee',employeRoutes)
app.use('/api/v1/leave', leaveRouter)

module.exports = app;
