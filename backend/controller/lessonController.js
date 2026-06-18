const Lesson = require("../models/Lesson");
const Section = require("../models/Section");
const Course = require("../models/Course");

const createLesson = async (req, res) => {
  const { title, description, section } = req.body;
  //   console.log("Title :", title);
  if (!title || !description || !section) {
    return res.status(401).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const sectionInfo = await Section.findById(section);

    if (!sectionInfo) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // console.log("Section Info :",sectionInfo.course);
    const courseId = sectionInfo.course;
    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    const courseInstructor = course.instructor;
    if (courseInstructor.toString() !== req.user.id) {
      return res.status(401).json({
        status: false,
        message: "Course cannot be accessed by another instructor",
      });
    }

    const newLesson = new Lesson({
      title,
      description,
      section,
    });

    await newLesson.save();
    console.log("New lesson created :", newLesson);
    res.status(201).json({
      lesson: newLesson,
      success: true,
      message: "Lesson created successfully.",
    });
  } catch (error) {
    console.error("Error in fetching sectionInfo from DB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getLessons = async (req,res) => {
  const { id } = req.params;
  if (!id) {
    console.log("section ID :", id);
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }

  try {
      const getAllLesson = await Lesson.find({
        section: id,
      });
      console.log("All sections :", getAllLesson);
      res.status(201).json({
        lessons: getAllLesson,
        success: true,
        message: "Lessons fetched successfully.",
      });
    } catch (error) {
      console.error("Error in fetching sectionInfo from DB:", error);
      res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createLesson, getLessons };
