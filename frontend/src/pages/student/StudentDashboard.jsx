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
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Welcome back, Learner 👋
          </h1>
          <p className="mt-2 text-slate-500">
            Continue your learning journey and complete your courses.
          </p>
        </div>

        {/* <div className="mb-10">
          <div className="w-full md:w-72 rounded-2xl bg-white shadow-md p-6">
            <p className="text-slate-500 text-sm">Enrolled Courses</p>
            <h2 className="text-4xl font-bold text-emerald-600 mt-2">
              {enrolledCourses.length}
            </h2>
          </div>
        </div> */}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            My Courses
          </h2>
        </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {enrolledCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
              >
                <div className="w-full aspect-video bg-slate-200 overflow-hidden">
                  <img
                    src={course.courseId.thumbnail}
                    alt={course.courseId.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 line-clamp-2 tracking-tight leading-snug group-hover:text-emerald-700 transition-colors">
                      {course.courseId.title}
                    </h2>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {course.courseId.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">
                        {course.courseId.category}
                      </span>
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">
                        {course.courseId.level}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-100">
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${courseProgress[course.courseId._id] || 0}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-medium text-slate-500">
                        {courseProgress[course.courseId._id] || 0}% complete
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContinueLearning(course.courseId._id);
                        }}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition flex items-center gap-0.5"
                      >
                        Continue →
                      </button>
                    </div>
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