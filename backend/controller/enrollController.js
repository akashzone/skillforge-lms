const Enroll = require("../models/Enroll");

const enrollCourse = async (req, res) => {
  console.log("Enroll controller working .");

  const { courseId, userId } = req.body;
  if (!userId || !courseId) {
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }
    const enroll = await Enroll.create({
      userId,
      courseId,
    });

    await enroll.save();
    console.log("Enrolled successfully.");
    res.json({
      message: "Yes, enroll working!",
    });
};

module.exports = { enrollCourse };
