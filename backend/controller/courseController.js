const Course = require("../models/Course.js");

const createCourse = async (req, res) => {
  const { title, description, price, level, category, learnings } = req.body;
  const { id } = req.user;
  // console.log("id from createCourse of instrcutor: ", id);
  if (!title) {
    return res.status(401).json({
      status: false,
      message: "All fields are required",
    });
  }
  if (!id) {
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }
  try {
    const newCourse = new Course({
      title,
      description,
      price,
      level,
      category,
      learnings,
      instructor: id,
    });

    await newCourse.save();
    console.log("Course created");
    res.status(201).json({
      success: true,
      message: "Course created successfully",
    });
  } catch (error) {
    console.error("Error in storing course in DB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCourses = async (req, res) => {
  try {
    const allCourses = await Course.find();
    // console.log("allCourses :", allCourses);
    if (!allCourses) {
      return res.status(401).json({
        status: false,
        message: "Courses collection is empty, allCourse is null",
      });
    }
    res.status(201).json({
      courses: allCourses,
      success: true,
      message: "All courses fetched successfully",
    });
  } catch (err) {
    console.error("Error in storing course in DB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCourseById = async (req, res) => {
  // console.log("ID of instructor :",req.params.id);
  if (!req.params.id) {
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      console.error("Error id is not valid :) so can't find the course.");
      res.status(500).json({ message: "Error id is not valid :)" });
    }
    const courseInstructor = course.instructor;
    // console.log("Course instrcutor :", courseInstructor);
    // console.log("req.user.UserId :", req.user.id);

    //Here I'm implementing Ownership - bcz other instructor (Instructor B),
    // shouldn't make any changes in courses of (Instructor A).
    if (courseInstructor.toString() !== req.user.id) {
      return res.status(401).json({
        status: false,
        message: "Course cannot be accessed by another instructor",
      });
    }
    res.status(201).json({
      courses: course,
      success: true,
      message: "Course fetched successfully by ID",
    });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCourseById = async (req, res) => {
  const id = req.params.id;
  const instructorId = req.user.id;
  if (!id) {
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }
  try {
    const courseExist = await Course.findById(id);
    if (!courseExist) {
      console.error("Error id is not valid :) so can't find the course.");
      res.status(500).json({ message: "Error id is not valid :)" });
    }
    const courseInstructor = courseExist.instructor;
    // console.log("Course instrcutor :", courseInstructor);
    if (courseInstructor.toString() !== req.user.id) {
      return res.status(401).json({
        status: false,
        message: "Course cannot be accessed by another instructor",
      });
    }
    const updateCourse = await Course.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    res.status(201).json({
      updateCourse,
      success: true,
      message: "Course updated successfully by ID",
    });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCourseById = async (req, res) => {
  const id = req.params.id;
  const instructorId = req.user.id;
  if (!id) {
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }
  try {
    const courseExist = await Course.findById(id);
    if (!courseExist) {
      console.error("Error id is not valid :) so can't find the course.");
      res.status(500).json({ message: "Error id is not valid :)" });
    }
    const courseInstructor = courseExist.instructor;
    // console.log("Course instrcutor :", courseInstructor);
    if (courseInstructor.toString() !== req.user.id) {
      return res.status(401).json({
        status: false,
        message: "Course cannot be accessed by another instructor",
      });
    }
    const deleteCourse = await Course.findByIdAndDelete(id);
    res.status(201).json({
      deleteCourse,
      success: true,
      message: "Course deleted successfully by ID",
    });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
