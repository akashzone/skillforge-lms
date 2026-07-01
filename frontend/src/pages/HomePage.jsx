import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { Search, BookOpen, Users, Award } from "lucide-react";
import StudentCourseCard from "../components/StudentCourseCard";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await api.get("/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(result.data.courses);
      setCourses(result.data.courses);
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 px-6 py-24 lg:flex-row">
          {/* Left */}
          <div className="flex-1">
            <h1 className="mt-6 text-5xl font-black leading-tight text-white lg:text-6xl">
              Learn Skills That
              <br />
              <span className="text-emerald-400">Shape Your Career.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Explore expert-led courses in Web Development, Programming,
              Artificial Intelligence, Data Science, UI/UX, and more—all in one
              place.
            </p>

            {/* Search */}
            <div className="mt-10 flex max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl">
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className= "rounded-lg px-8 py-4 w-full"
              />

              <button className="bg-emerald-500 px-6 transition hover:bg-emerald-600">
                <Search className="text-white" size={22} />
              </button>
            </div>

            <button onClick={() => navigate("/student/courses")} className="mt-8  cursor-pointer rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20">
              Explore Courses
            </button>
          </div>

          {/* Right */}
          <div className="flex flex-1 justify-center">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
              alt="Learning"
              className="w-full max-w-lg rounded-3xl border border-slate-700 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
            <BookOpen className="mx-auto text-emerald-500" size={42} />
            <h2 className="mt-5 text-4xl font-bold text-slate-900">500+</h2>
            <p className="mt-2 text-slate-500">Courses</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
            <Users className="mx-auto text-emerald-500" size={42} />
            <h2 className="mt-5 text-4xl font-bold text-slate-900">20K+</h2>
            <p className="mt-2 text-slate-500">Students</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
            <Award className="mx-auto text-emerald-500" size={42} />
            <h2 className="mt-5 text-4xl font-bold text-slate-900">100+</h2>
            <p className="mt-2 text-slate-500">Expert Instructors</p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-14 text-center text-4xl font-black text-slate-900">
          Featured Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredCourses.map((course) => (
            <div key={course._id}>
              <StudentCourseCard
                key={course._id}
                id={course._id}
                thumbnail={course.thumbnail}
                title={course.title}
                price={course.price}
                category={course.category}
              />
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="mt-10 text-center text-slate-500">
            No courses available.
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-14 text-center text-4xl font-black text-slate-900">
            Browse Categories
          </h2>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
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
                className="cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center font-semibold text-slate-700 transition-all hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-5xl font-black">
            Start Learning Today
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Join thousands of learners building practical, job-ready skills with
            SkillForge.
          </p>

          <button onClick={() => navigate("/student/courses")} className="mt-10 rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;