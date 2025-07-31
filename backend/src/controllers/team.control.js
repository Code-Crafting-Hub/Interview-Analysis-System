const teamModel = require("../models/Team");

const createTeam = async (req, res) => {
  const adminId = req.adminId;
  const { name, managerId, memberIds, projects } = req.body;

  try {
    if (!adminId) {
      return res.json({ errors: "Access denied" });
    }
    if (!name || !managerId || !memberIds || !projects) {
      return res.json({ errors: "All fields are required" });
    }
    const newTeam = new teamModel({
      name,
      manager: managerId,
      members: memberIds,
      projects,
    });

    await newTeam.save();
    res.status(201).json({ message: "Team created successfully", newTeam });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ errors: "Internal server error" });
  }
};

const teamControl = { createTeam };

module.exports = teamControl;
