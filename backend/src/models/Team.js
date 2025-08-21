const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    department: {
      type:String,
      required: true
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: true
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee" 
      }
    ],
    projects: [
      {
        type: String 
      }
    ]
  },
  { timestamps: true }
);

const teamModel = mongoose.model("Team", teamSchema)

module.exports = teamModel;
