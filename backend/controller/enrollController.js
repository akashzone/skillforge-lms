const Enroll = require("../models/Enroll");

const enrollCourse = async (req, res) => {
  try {
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

const getEnrollCourses = async (req, res) => {
  const { id } = req.user;

  if (!id) {
    return res.status(401).json({
      success: false,
      message: "ID not found",
    });
  }

  try {
    const enrolledCourses = await Enroll.find({ userId: id }).populate("courseId");

    // Remove enrollments whose course has been deleted
    const validEnrollments = enrolledCourses.filter(
      (enrollment) => enrollment.courseId !== null
    );

    return res.status(200).json({
      enrolledCourses: validEnrollments,
      success: true,
      message: "Enrolled courses fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const checkEnrollmentStatus = async (req, res) => {
  const { id } = req.user;
  const { courseId } = req.params;

  if (!id || !courseId) {
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }

  const enrollments = await Enroll.findOne({
    userId: id,
    courseId,
  });

  if (enrollments) {
    return res.status(200).json({
      success: true,
      enrolled: true,
    });
  }
  return res.status(200).json({
    success: true,
    enrolled: false,
  });
};
module.exports = { enrollCourse, getEnrollCourses, checkEnrollmentStatus };
