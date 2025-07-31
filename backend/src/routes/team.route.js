const express = require("express");
const isAdmin = require("../middleware/isAdmin");
const { createTeam } = require("../controllers/team.control");

const teamRouter = express.Router();

teamRouter.post("/create", isAdmin, createTeam);

module.exports = teamRouter;
