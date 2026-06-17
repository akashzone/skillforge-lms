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

const getAllSection = async (req, res) => {
  const { id } = req.params;
  console.log("Course ID :", id);

  if (!req.params.id) {
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }

  try {
    const getAllSection = await Section.find({
      course: "6a32287dd13f1c3b217c9f39",
    });
    console.log("All sections :", getAllSection);
    res.status(201).json({
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
  console.log("Section ID :", id);
  console.log("Data sent through req.body :", data.title);

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
    // console.log("Course sections :",courseSection.course);
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

    const updatedSection = await Section.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(
      "sectionInfo is successfully updated in DB! Data - ",
      updatedSection,
    );
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

module.exports = { createSection, getAllSection, updateSectionById };
