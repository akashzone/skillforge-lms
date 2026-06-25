const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema({
    userId:{
       type: mongoose.Schema.Types.ObjectId,
               required: true,
               ref: "User"
    },
    courseId :{
        type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Course"
    },
    enrolledAt: {
    type: Date,
    default: Date.now
  }
},{timestamps: true});

const Enroll = mongoose.model("Enroll",EnrollSchema);

module.exports = Enroll;