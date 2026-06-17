const Section = require("../models/Section");
const Course = require("../models/Course");

const createSection = async (req, res) => {
  const { title, course, order } = req.body;
  const courseId = course;
  console.log("Title :", title);
  if (!title || !course || !order) {
    return res.status(401).json({
      status: false,
      message: "All fields are required",
    });
  }
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      console.error("Error id is not valid :) so can't find the course.");
      res.status(500).json({ message: "Error id is not valid :)" });
    }
    const courseInstructor = course.instructor;
    console.log("Course instrcutor :", courseInstructor);
    console.log("req.user.UserId :", req.user.id);

    //Here I'm implementing Ownership - bcz other instructor (Instructor B),
    // shouldn't make any changes in courses of (Instructor A).
    if (courseInstructor.toString() !== req.user.id) {
      return res.status(401).json({
        status: false,
        message: "Course cannot be accessed by another instructor",
      });
    }
    const sectionInfo = new Section({
      title,
      course,
      order,
    });
    await sectionInfo.save();
    console.log(
      "sectionInfo is successfully saved in DB! Data - ",
      sectionInfo,
    );
    res.status(201).json({
      section: sectionInfo,
      success: true,
      message: "Section created successfully.",
    });
  } catch (error) {
    console.error("Error in storing sectionInfo in DB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createSection };
