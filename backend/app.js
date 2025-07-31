const express = require("express");
const { dbConnection } = require("./database/database");
const adminRoute = require("./src/routes/admin.routes");
const employeRoutes = require("./src/routes/employe.routes");
const leaveRouter = require("./src/routes/leave.route");
const salaryRouter = require("./src/routes/salary.routes");
const performRouter = require("./src/routes/perform.routes");

const app = express();
dbConnection();

app.use(express.json());

app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/employee", employeRoutes);
app.use("/api/v1/leave", leaveRouter);
app.use("/api/v1/salary", salaryRouter);
app.use("/api/v1/perform", performRouter);

module.exports = app;
