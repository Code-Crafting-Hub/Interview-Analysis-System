const express = require("express");
const isAdmin = require("../middleware/isAdmin");
const isEmployee = require("../middleware/isEmployee");
const { createTeam, getTeamById, getAllTeam, editTeam, deleteTeam } = require("../controllers/team.control");

const teamRouter = express.Router();

teamRouter.post("/create", isAdmin, createTeam);
teamRouter.get("/findone", isEmployee, getTeamById);
teamRouter.get("/findall", isAdmin, getAllTeam);
teamRouter.put("/update/:teamId", isAdmin, editTeam);
teamRouter.delete("/delete/:teamId", isAdmin, deleteTeam)

module.exports = teamRouter;
