import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState([])
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const res = await api.get(
        "/enroll",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log("Response :", res.data.enrolledCourses);
      setEnrolledCourses(res.data.enrolledCourses); // its a array...
    }
    fetchEnrolledCourses();
  }, [])

  useEffect(() => {
    if (enrolledCourses.length === 0) return;
    const fetchCourseProgress = async () => {
      // console.log("TOken :",token)
      const res = await Promise.all(
        enrolledCourses.map((course) =>
          api.get(
            `/progress/course/${course.courseId._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      )
      const progressMap = {};
      res.forEach((response, index) => {
        const courseId = enrolledCourses[index].courseId._id;

        if (response.data.progress.length === 0) {
          progressMap[courseId] = 0;
          return;
        }

        const progress = response.data.progress[0];
        progressMap[courseId] = progress.progressPercentage;
      });
      console.log("Progress: ", progressMap);
      setCourseProgress(progressMap);
    }
    fetchCourseProgress();
  }, [enrolledCourses]);

  const handleContinueLearning = (courseId) => {
    navigate(`/student/my-course/${courseId}`);
  }
  return (
    <div>
      <div className="heading">
        <h1>Welcome, Akashhhh</h1>
      </div>
      {
        enrolledCourses && <>
          {enrolledCourses.map((course) => {

            return (
              <div key={course._id} className="course-card">
                <div className="course-info">
                  <h1>{course.courseId.title}</h1>
                  <span> Progress 90% </span>
                  <button className="border-b-emerald-500 border rounded-lg text-emerald-600 bg-white px-6 py-3" onClick={() => handleLearning(course.courseId._id)}> Continue Learning</button>
                </div>
              </div>)
          })
          }
        </>
      }
    </div>
  )
}

export default StudentDashboard