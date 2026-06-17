const Section = require("../models/Section");

const createSection = async (req, res) => {
  const { title, course, order } = req.body;
  console.log("Title :", title);
  if (!title || !course || !order) {
    return res.status(401).json({
      status: false,
      message: "All fields are required",
    });
  }
  try{
    const sectionInfo = new Section({
        title,
        course,
        order
    });
    await sectionInfo.save();
    console.log("sectionInfo is successfully saved in DB! Data - ",sectionInfo);
  }catch(error){
    console.error("Error in storing sectionInfo in DB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createSection };
