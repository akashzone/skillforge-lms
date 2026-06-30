import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { Link } from "react-router-dom";

const MyCourse = () => {

  const { token } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

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
      console.log("Successfully fetched enrolled courses..");
      console.log("Response :", res.data);
      setEnrolledCourses(res.data.enrolledCourses);
    } catch (err) {
      console.log("Error message :", err);
    }
  }

  return (
    <>
      {/* Header */}
      <div className="w-full bg-[#1c1d1f] text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold">My Courses</h1>
          <p className="mt-2 text-gray-300">
            Access and continue learning from your enrolled courses.
          </p>
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6">
          {enrolledCourses.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              You haven't enrolled in any courses yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
              {enrolledCourses.map((course) => (
                <Link
                  to={`/student/my-course/${course.courseId._id}`}
                  key={course._id}
                  className="group bg-white rounded-xl m-4 overflow-hidden border border-gray-200 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-[#5624d0]"
                >
                  <div
                    key={course._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                  >
                    {/* Thumbnail */}
                    <img
                      src={course.courseId.thumbnail}
                      alt={course.courseId.title}
                      className="w-full h-52 object-cover"
                    />

                    {/* Card Body */}
                    <div className="p-5">
                      {/* Category & Level */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                          {course.courseId.category}
                        </span>

                        <span className="text-sm text-gray-500">
                          {course.courseId.level}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-800 mb-2">
                        {course.courseId.title}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {course.courseId.description}
                      </p>

                      {/* Price & Date */}
                      <div className="flex justify-between items-center mb-2">
                        {/* <span className="text-2xl font-bold text-green-600">
                          ₹{course.courseId.price}
                        </span> */}

                        <span className="text-xs text-gray-400">
                          Enrolled:{" "}
                          {new Date(course.enrolledAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Button */}
                      {/* <button className="w-full bg-[#5624d0] text-white py-2.5 rounded-lg hover:bg-[#401b9c] transition">
                        Go to Course
                      </button> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyCourse