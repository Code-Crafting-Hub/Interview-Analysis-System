const teamModel = require("../models/Team");
const mongoose = require("mongoose");

const createTeam = async (req, res) => {
  const adminId = req.adminId;
  const { name, managerId, memberIds, projects, department } = req.body;

  try {
    if (!adminId) {
      return res.json({ errors: "Access denied" });
    }
    if (!name || !managerId || !memberIds || !projects || !department) {
      return res.json({ errors: "All fields are required" });
    }
    const newTeam = new teamModel({
      name,
      manager: managerId,
      members: memberIds,
      projects,
      department
    });

    await newTeam.save();
    res.status(201).json({ message: "Team created successfully", newTeam });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ errors: "Internal server error" });
  }
};

const getTeamById = async (req, res) => {
  const employeId = req.employeId;
  try {
    if (!employeId) {
      return res.json({ errors: "Access Denied" });
    }
    const findTeam = await teamModel
      .find({
        $or: [
          { manager: new mongoose.Types.ObjectId(employeId) },
          { members: new mongoose.Types.ObjectId(employeId) },
        ],
      })
      .populate("manager", "name email")
      .populate("members", "name email");
    if (findTeam.length === 0) {
      res.json({ message: "No team found" });
    } else {
      res.json(findTeam);
    }
  } catch (error) {
    res.json({ errors: "Internal server error in getting team details" });
  }
};

const getAllTeam = async (req, res) => {
  const adminId = req.adminId;
  try {
    if (!adminId) {
      return res.json({ errors: "Access Denied" });
    }
    const findAll = await teamModel
      .find()
      .populate("manager", "name email")
      .populate("members", "name email");
    if (findAll.length === 0) {
      res.json({ message: "No Team created yet" });
    } else {
      res.json(findAll);
    }
  } catch (error) {
    res.json({ errors: "Internal server error in get teams" });
  }
};

const editTeam = async (req, res) => {
  const adminId = req.adminId;
  const { teamId } = req.params;
  const { projects, name, managerId, memberIds } = req.body;

  try {
    if (!adminId) {
      return res.status(401).json({ errors: "Access Denied" });
    }

    if (
      !projects ||
      !name ||
      !managerId ||
      !Array.isArray(memberIds) ||
      memberIds.length === 0
    ) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    if (!teamId) {
      return res.status(400).json({ errors: "Team Id not received" });
    }

    const data = {
      projects,
      name,
      manager: managerId,
      members: memberIds,
    };

    const teamUpdate = await teamModel.findByIdAndUpdate(
      { _id: teamId },
      data,
      { new: true }
    );

    if (!teamUpdate) {
      return res.status(404).json({ errors: "Team not found" });
    }

    res.json({ message: "Team updated successfully", updatedTeam: teamUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: "Internal server error in updating team" });
  }
};

const deleteTeam = async (req, res) => {
  const adminId = req.adminId;
  const { teamId } = req.params;
  try {
    if (!adminId) {
      return res.status(401).json({ errors: "Access Denied" });
    }
    if (!teamId) {
      return res.status(400).json({ errors: "Team id not receive" });
    }
    const deleteTeam = await teamModel.findByIdAndDelete({ _id: teamId });
    if (!deleteTeam) {
      res.status(404).json({ errors: "Team not found" });
    } else {
      res.status(200).json({ message: "Team deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ errors: "Internal server error" });
  }
};

const teamControl = {
  createTeam,
  getTeamById,
  getAllTeam,
  editTeam,
  deleteTeam,
};

module.exports = teamControl;
