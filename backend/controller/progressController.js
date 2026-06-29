const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Section = require("../models/Section");
const Progress = require("../models/Progress");

const createProgress = async (req, res) => {
  const { lessonId } = req.params;
  const { id } = req.user;

  if (!lessonId || !id) {
    console.log("user ID :", id);
    console.log("course ID:", courseId);
    return res.status(401).json({
      status: false,
      message: "ID not found",
    });
  }

  const lessonInfo = await Lesson.findOne({
    _id: lessonId,
  });
  if (!lessonInfo) {
    return res.status(401).json({
      status: false,
      message: "lesson not found",
    });
  }
  //   console.log( "Lesson info :", lessonInfo);
  //   res.json({
  //     message : "LessonInfo fetched successfully.."
  //   });

  const fetchSection = await Section.findOne({
    _id: lessonInfo.section,
  });
  //    console.log("Section Info :",fetchSection);

  const fetchCourse = await Course.findOne({
    _id: fetchSection.course,
  });

    //  console.log("Course Info :",fetchCourse._id);
  const courseId = fetchCourse._id;
  const checkProgress = await Progress.findOne({
    userId : id,
    courseId
  })
  if(!checkProgress){
    const makeProgress = await Progress.create({
        userId : id,
        courseId
    })
    console.log("Progress info :",makeProgress);
    let completedLesson = makeProgress.lessonsCompleted;
    const exist = completedLesson.includes(`${lessonId}`);
    console.log("Exist : ",exist);
    res.status(201).json({
        progress : makeProgress,
        message : "Yes, created Progress successfully.."
    });
  }
};

module.exports = { createProgress };
