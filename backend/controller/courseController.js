
const createCourse = (req,res) =>{
    console.log("Course created");
    res.status(201).json({
      success: true,
      message: "Course created successfully"
    });
}

module.exports = { createCourse };



