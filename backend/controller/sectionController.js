const Section = require("../models/Section");
const Course = require("../models/Course");

const createSection = async (req, res) => {
  const { title, course, order } = req.body;
  const courseId = course;

  if (!title || !course || !order) {
    return res.status(401).json({
      status: false,
      message: "All fields are required",
    });
  }
  try {
    const courseData = await Course.findById(courseId);
    if (!courseData) {
      return res.status(500).json({ message: "Error id is not valid :)" });
    }
    const courseInstructor = courseData.instructor;

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

const getAllSection = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }

  try {
    const getAllSection = await Section.find({
      course: id,
    });
    res.status(200).json({
      sections: getAllSection,
      success: true,
      message: "SectionInfo fetched successfully.",
    });
  } catch (error) {
    console.error("Error in fetching sectionInfo from DB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateSectionById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }
  try {
    const courseSection = await Section.findById(id);

    if (!courseSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }
    const courseId = courseSection.course;
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

    const updatedSection = await Section.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json({
      success: true,
      newSection: updatedSection,
      message: "Section updated successfully",
    });
  } catch (error) {
    console.error("Error in updating sectionInfo in DB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSectionById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }
  try {
    const courseSection = await Section.findById(id);

    if (!courseSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    const courseId = courseSection.course;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Course cannot be accessed by another instructor",
      });
    }

    const deletedSection = await Section.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      removedSection: deletedSection,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting sectionInfo in DB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createSection,
  getAllSection,
  updateSectionById,
  deleteSectionById,
};