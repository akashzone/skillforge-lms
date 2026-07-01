const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Section = require("../models/Section");
const Progress = require("../models/Progress");

const createProgress = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { id } = req.user;

    if (!lessonId || !id) {
      return res.status(400).json({
        status: false,
        message: "User ID or Lesson ID missing",
      });
    }

    const lessonInfo = await Lesson.findById(lessonId);
    if (!lessonInfo) {
      return res.status(404).json({
        status: false,
        message: "Lesson not found",
      });
    }

    const fetchSection = await Section.findById(lessonInfo.section);
    if (!fetchSection) {
      return res
        .status(404)
        .json({ status: false, message: "Section not found" });
    }
    const courseId = fetchSection.course;

    let progress = await Progress.findOne({ userId: id, courseId });
    if (!progress) {
      progress = await Progress.create({
        userId: id,
        courseId,
        lessonsCompleted: [],
        progressPercentage: 0,
      });
    }

    const alreadyExist = progress.lessonsCompleted
      .map((id) => id.toString())
      .includes(lessonId.toString());
    if (alreadyExist) {
      return res.status(400).json({
        success: true,
        exist: true,
        message: "Already completed this lesson",
      });
    }

    const fetchAllSections = await Section.find({ course: courseId });
    const allSectionIds = fetchAllSections.map((section) => section._id);
    const totalLessons = await Lesson.countDocuments({
      section: { $in: allSectionIds },
    });

    const totalLessonsCompleted = progress.lessonsCompleted.length + 1;
    const progressPercentage =
      totalLessons > 0
        ? Math.round((totalLessonsCompleted / totalLessons) * 100)
        : 0;

    const updatedProgress = await Progress.findByIdAndUpdate(
      progress._id,
      {
        $push: { lessonsCompleted: lessonId },
        $set: { progressPercentage },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      progress: updatedProgress,
      message: "Lesson progress updated successfully.",
    });
  } catch (error) {
    console.error("Error creating progress:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const getProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { id } = req.user;

    console.log("User:", id);
    console.log("Course:", courseId);

    const progress = await Progress.findOne({
      courseId,
      userId: id,
    });

    return res.status(200).json({
      success: true,
      progress,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { createProgress, getProgress };
