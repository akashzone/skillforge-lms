const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    lessonsCompleted: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    progressPercentage :{
        type: Number
    }
  },
  { timestamps: true },
);


const Progress = mongoose.model("Progress",progressSchema);

module.exports = Progress;