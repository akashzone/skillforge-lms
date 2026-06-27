import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import StudentCourseCard from "../components/StudentCourseCard";
import api from "../api/api";

const Courses = () => {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await api.get("/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(result.data.courses);
      setCourses(result.data.courses);
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Courses to get you started
          </h1>

          <p className="mt-3 text-lg text-gray-600 max-w-2xl">
            Explore courses from experienced, real-world experts and build
            skills that help you achieve your goals.
          </p>

          <div className="mt-8">
            <span className="inline-block border-b-2 border-black pb-2 text-lg font-semibold">
              Most Popular
            </span>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="max-w-7xl mx-auto px-6 py-1">

        {courses.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-lg">
              No courses available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <StudentCourseCard
                key={course._id}
                id={course._id}
                title={course.title}
                price={course.price}
                category={course.category}
              />
            ))}
          </div>
        )}

      </section>

    </div>
  );
};

export default Courses;