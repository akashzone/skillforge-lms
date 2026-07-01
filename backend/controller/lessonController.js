const Lesson = require("../models/Lesson");
const Section = require("../models/Section");
const Course = require("../models/Course");

const createLesson = async (req, res) => {
  const { title, description, section } = req.body;
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

const getLessonById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }

  try {
    const getLesson = await Lesson.findById(id);
    // console.log("LessonInfo :", getLesson);
    res.status(201).json({
      lesson: getLesson,
      success: true,
      message: "Lesson fetched successfully.",
    });
  } catch (error) {
    console.error("Error in fetching sectionInfo from DB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getLessons = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    // console.log("section ID :", id);
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }

  try {
    const getAllLesson = await Lesson.find({
      section: id,
    });
    // console.log("All sections :", getAllLesson);
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

const updateLessonById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  //   console.log("Lesson ID :",id);
  //   console.log("DATA :",req.body);
  if (!id) {
    console.log("section ID :", id);
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }
  try {
    const LessonInfo = await Lesson.findById(id);
    if (!LessonInfo) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }
    // console.log("Lesson Info :",LessonInfo.section);
    const sectionId = LessonInfo.section;
    // console.log("Section ID :",sectionId)
    if (!sectionId) {
      return res.status(404).json({
        success: false,
        message: "Section id not found",
      });
    }

    const sectionInfo = await Section.findById(sectionId);
    // console.log("Section Data :",sectionInfo.course);
    const courseId = sectionInfo.course;
    // console.log("Course ID:",courseId);
    const course = await Course.findById(courseId);

    console.log("Course data :", course);
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

    const updatedLesson = await Lesson.findByIdAndUpdate(id, data, {
      new: true,
    });
    // console.log("Lesson is successfully updated in DB! Data - ", updatedLesson);
    res.status(200).json({
      success: true,
      newLesson: updatedLesson,
      message: "Lesson updated successfully",
    });
  } catch (error) {
    console.error("Error in updating LessonInfo in DB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteById = async (req,res) => {
  const { id } = req.params;
  if (!id) {
    console.log("section ID :", id);
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }
  try {
    const LessonInfo = await Lesson.findById(id);
    if (!LessonInfo) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }
    // console.log("Lesson Info :",LessonInfo.section);
    const sectionId = LessonInfo.section;
    // console.log("Section ID :",sectionId)
    if (!sectionId) {
      return res.status(404).json({
        success: false,
        message: "Section id not found",
      });
    }

    const sectionInfo = await Section.findById(sectionId);
    // console.log("Section Data :",sectionInfo.course);
    const courseId = sectionInfo.course;
    // console.log("Course ID:",courseId);
    const course = await Course.findById(courseId);

    console.log("Course data :", course);
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

    const deleteLesson = await Lesson.findByIdAndDelete(id);
    // console.log("Deleted Lesson :", deleteLesson);
    res.status(200).json({
      success: true,
      removedLesson: deleteLesson,
      message: "Lesson deleted successfully",
    });

  } catch (error) {
    console.error("Error in deleting lesson from DB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const uploadLesson = async (req,res)=>{
  res.json({
    message : "API working !!"
  })
}

module.exports = { createLesson, getLessonById, getLessons, updateLessonById, deleteById, uploadLesson};
