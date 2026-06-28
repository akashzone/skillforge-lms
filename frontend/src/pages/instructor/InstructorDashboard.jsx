import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import CourseCard from '../../components/CourseCard'
import api from '../../api/api';

const InstructorDashboard = () => {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/instructor/create-course");
  }


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses/instructor/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response :", res.data.courses)
        setCourses(res.data.courses);
      } catch (error) {
        console.error(error);
      }
    }
    if (token) fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-10 text-white shadow-xl lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
              Instructor Dashboard
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Welcome, Akash 👋
            </h1>

            <p className="mt-4 max-w-2xl text-slate-300">
              Manage your courses, track your progress, and create engaging
              learning experiences for your students.
            </p>
          </div>

          <button
            onClick={handleClick}
            className="rounded-xl cursor-pointer bg-emerald-500 px-6 py-4 font-semibold text-white transition hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            + Create Course
          </button>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Courses</p>

            {
              courses.length == 0 ? <h2 className="mt-3 text-4xl font-black text-slate-900"> 0 </h2> :
              <h2 className="mt-3 text-4xl font-black text-slate-900">{ courses.length }</h2>
            }

            <p className="mt-2 text-sm text-slate-400">
              Published & Draft Courses
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Students</p>

            <h2 className="mt-3 text-4xl font-black text-slate-900">0</h2>

            <p className="mt-2 text-sm text-slate-400">
              Enrolled Across Courses
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Revenue</p>

            <h2 className="mt-3 text-4xl font-black text-slate-900">₹0</h2>

            <p className="mt-2 text-sm text-slate-400">
              Total Earnings
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Quick Actions
          </h2>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={handleClick}
              className="rounded-xl cursor-pointer bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              Create New Course
            </button>

            <button
              onClick={() => 
                navigate("/instructor/my-courses")

              }
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
            >
              Manage Courses
            </button>
          </div>
        </div>

        {/* Empty State */}
        {
          courses.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
              <h3 className="text-2xl font-bold text-slate-900">
                No Courses Yet
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-slate-500">
                You haven't created any courses yet. Start building your first
                course and share your knowledge with students around the world.
              </p>

              <button
                onClick={handleClick}
                className="mt-8 rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                Create Your First Course
              </button>
            </div>
          ) : <>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  id={course._id}
                  title={course.title}
                  price={course.price}
                  category={course.category}
                  description={course.description}
                  level={course.level}
                  showActions={false}
                />
              ))}
            </div>
          </>
        }

      </div>
    </div>
  );
}

export default InstructorDashboard 