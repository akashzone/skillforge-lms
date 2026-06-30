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
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Welcome back, Akash 👋
          </h1>
          <p className="mt-2 text-slate-500">
            Continue your learning journey and complete your courses.
          </p>
        </div>

        {/* Stats Card */}
        <div className="mb-10">
          <div className="w-full md:w-72 rounded-2xl bg-white shadow-md p-6">
            <p className="text-slate-500 text-sm">Enrolled Courses</p>
            <h2 className="text-4xl font-bold text-emerald-600 mt-2">
              {enrolledCourses.length}
            </h2>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            My Courses
          </h2>
        </div>

        {/* Empty State */}
        {enrolledCourses.length === 0 ? (
          <div className="rounded-2xl bg-white shadow-md p-10 text-center">
            <h2 className="text-2xl font-semibold text-slate-700">
              No Courses Enrolled
            </h2>

            <p className="text-slate-500 mt-2">
              Browse our catalog and start learning today.
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {enrolledCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
              >
                <div className="h-56 w-full md:h-48 md:w-72 bg-slate-100 flex items-center justify-center overflow-hidden rounded-l-xl">
                  <img
                    src={course.courseId.thumbnail}
                    alt={course.courseId.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Course Info */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {course.courseId.title}
                    </h2>

                    <p className="text-slate-500 mt-3 line-clamp-2">
                      {course.courseId.description}
                    </p>

                    {/* Badges */}
                    <div className="flex gap-3 mt-5">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {course.courseId.category}
                      </span>

                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                        {course.courseId.level}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mt-8">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">
                          Progress
                        </span>

                        <span className="text-sm font-semibold text-emerald-600">
                          {courseProgress[course.courseId._id] || 0}%
                        </span>
                      </div>

                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${courseProgress[course.courseId._id] || 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-8">
                    <button
                      onClick={() =>
                        handleContinueLearning(course.courseId._id)
                      }
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition"
                    >
                      Continue Learning →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard