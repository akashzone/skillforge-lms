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

const getEnrollCourses = async (req, res) => {
  const { id } = req.user;
  console.log("Course ID - ", id);
  if (!id) {
    console.log("lesson ID :", id);
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }

  try {
    const getEnrolledCourse = await Enroll.find({ userId: id }).populate(
      "courseId",
    );
    console.log("Enrolled Courses :", getEnrolledCourse);
    res.status(201).json({
      enrolledCourses: getEnrolledCourse,
      success: true,
      message: "Enrolled Courses fetched successfully.",
    });
  } catch (error) {
    console.error("Error in fetching Enrolled course from DB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const checkEnrollmentStatus = async (req, res) => {
  const { id } = req.user;
  const { courseId } = req.params;

  if (!id || !courseId) {
    console.log("user ID :", id);
    console.log("course ID:", courseId);
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
