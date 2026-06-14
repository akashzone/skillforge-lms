const Course = require("../models/Course.js");

const createCourse =  async (req, res) => {
  const { title, description, price, level, category } = req.body;
  const { id } = req.user;
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
  const course = new Course({
    title,
    description,
    price,
    level,
    category,
  });

  await newCourse.save();
  res.status(201).json({
      success: true,
      message: "Course created successfully"
    });
}
catch(error){
  console.error("Error in storing course in DB:", error);
    res.status(500).json({ message: "Server error" });
}
  console.log("Course created");
  res.status(201).json({
    success: true,
    message: "Course created successfully",
  });
};

module.exports = { createCourse };
