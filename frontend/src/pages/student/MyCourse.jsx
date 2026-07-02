import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { Link } from "react-router-dom";

const MyCourse = () => {

  const { token } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  useEffect(() => {
    if (token) {
      fetchEnrolledCourses();
    }
  }, [token]);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await api.get(
        "/enroll",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // console.log("Successfully fetched enrolled courses..");
      // console.log("Response :", res.data);
      setEnrolledCourses(res.data.enrolledCourses);
    } catch (err) {
      console.log("Error message :", err);
    }
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-black">My Learning</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Pick up where you left off and continue building your skills with your
            enrolled courses.
          </p>
        </div>
      </div>

      {/* Courses */}
      <div className="min-h-screen bg-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-6">
          {enrolledCourses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900">
                No Courses Yet
              </h2>

              <p className="mx-auto mt-4 max-w-md text-slate-500">
                You haven't enrolled in any courses yet. Start exploring and begin
                your learning journey.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {enrolledCourses.map((course) => (
                console.log("Enrolled Course :", course),
                <div
                  key={course._id}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  {/* Thumbnail */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    {course.courseId?.thumbnail &&
                      (course.courseId.thumbnail.startsWith("http") ||
                        course.courseId.thumbnail.startsWith("/")) && (
                        <img
                          src={course.courseId.thumbnail}
                          alt={course.courseId.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = "none";
                            const fallbackEl = e.target.nextSibling;
                            if (fallbackEl) fallbackEl.style.display = "flex";
                          }}
                        />
                      )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category */}
                    <span className="absolute left-5 top-5 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      {course.courseId.category}
                    </span>

                    {/* Level */}
                    <span className="absolute bottom-5 right-5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow">
                      {course.courseId.level}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-7">
                    <h2 className="line-clamp-2 min-h-[72px] text-2xl font-black text-slate-900">
                      {course.courseId.title}
                    </h2>

                    <p className="mt-4 line-clamp-3 min-h-[78px] text-slate-600">
                      {course.courseId.description}
                    </p>

                    {/* Divider */}
                    <div className="my-6 border-t border-slate-200"></div>

                    {/* Footer */}
                    <div className="mt-auto">
                      <div className="mb-6 flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            Enrolled
                          </p>

                          <p className="mt-1 font-semibold text-slate-800">
                            {new Date(course.enrolledAt).toLocaleDateString()}
                          </p>
                        </div>

                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                          Active
                        </span>
                      </div>

                      <Link
                        to={`/student/my-course/${course.courseId._id}`}
                      >
                        <button className="w-full cursor-pointer rounded-xl bg-emerald-500 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20">
                          Continue Learning →
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyCourse