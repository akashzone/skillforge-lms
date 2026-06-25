const Enroll = require("../models/Enroll");

const enrollCourse = async (req, res) => {
  try {
    console.log("Enroll controller working.");

    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({
        status: false,
        message: "Course ID not found",
      });
    }

    const existingEnrollment = await Enroll.findOne({
      userId,
      courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        status: false,
        message: "Already enrolled in this course",
      });
    }

    const enrollment = await Enroll.create({
      userId,
      courseId,
    });

    console.log("Enrolled successfully.");

    return res.status(201).json({
      status: true,
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { enrollCourse };