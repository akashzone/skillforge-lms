import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { Search, BookOpen, Users, Award } from "lucide-react";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const { token } = useAuth();

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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold leading-tight">
              Learn Skills That <br />
              <span className="text-purple-400">Build Your Future.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              Explore thousands of expert-led courses in Web Development,
              Programming, AI, Data Science, Design, and much more.
            </p>

            {/* Search */}
            <div className="mt-8 bg-white rounded-lg flex items-center overflow-hidden max-w-xl">
              <input
                type="text"
                placeholder="What do you want to learn today?"
                className="flex-1 px-5 py-4 text-gray-800 outline-none"
              />

              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-4">
                <Search className="text-white" size={22} />
              </button>
            </div>

            <button className="mt-8 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-semibold transition">
              Explore Courses
            </button>
          </div>

          {/* Right */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
              alt="Learning"
              className="rounded-xl shadow-2xl w-full max-w-lg"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <BookOpen className="mx-auto text-purple-600" size={40} />
            <h2 className="text-3xl font-bold mt-4">500+</h2>
            <p className="text-gray-600 mt-2">Courses</p>
          </div>

          <div className="bg-white rounded-xl shadow p-8 text-center">
            <Users className="mx-auto text-purple-600" size={40} />
            <h2 className="text-3xl font-bold mt-4">20K+</h2>
            <p className="text-gray-600 mt-2">Students</p>
          </div>

          <div className="bg-white rounded-xl shadow p-8 text-center">
            <Award className="mx-auto text-purple-600" size={40} />
            <h2 className="text-3xl font-bold mt-4">100+</h2>
            <p className="text-gray-600 mt-2">Expert Instructors</p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Courses
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden cursor-pointer"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <img
                src={`/pic1.jpeg`}
                alt={course.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="font-bold text-lg line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {course.instructor}
                </p>

                <p className="text-gray-600 mt-3 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mt-5">
                  <span className="text-purple-600 font-bold text-lg">
                    ₹{course.price}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/course/${course._id}`);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                  >
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No courses available.
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Browse Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Web Development",
              "JavaScript",
              "React",
              "Node.js",
              "Python",
              "AI & ML",
              "Data Science",
              "UI/UX",
            ].map((cat) => (
              <div
                key={cat}
                className="bg-purple-50 hover:bg-purple-600 hover:text-white transition rounded-xl p-8 text-center font-semibold cursor-pointer"
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold">
            Start Learning Today
          </h2>

          <p className="mt-6 text-lg text-purple-100">
            Join thousands of students building real-world skills with
            SkillForge.
          </p>

          <button className="mt-8 bg-white text-purple-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;