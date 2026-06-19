import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const CourseDetail = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Here is the ID:", id);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function handleDeleteCourse() {
    try {
      setShowModal(false);
      onDelete(id);
    } catch (err) {
      console.error(err);
    }
  }

  const onDelete = async (id) => {
    const res = await api.delete(`/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response :", res);
    setCourses(
      courses.filter(course => course._id !== id)
    );
    navigate("/instructor/my-courses")
  };

  const handleEditCourse = () => {
    navigate(`/instructor/${id}/edit`);
  }

  const [course, setCourse] = useState({});
  useEffect(() => {
    const fetchCourse = async () => {
      const res = await api.get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("Response from - /GET courses :", res.data.courses);
      setCourse(res.data.courses);
    }
    fetchCourse();
  }, [token])

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-[400px] h-[150px] bg-white p-5 rounded-lg flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="text-lg font-semibold">
                Delete Course?
              </h3>

              <p className="text-gray-600 mt-2">
                Are you sure you want to delete this course?
              </p>
            </div>

            <div className="flex justify-between gap-2">
              <button
                onClick={handleDeleteCourse}
                className="w-1/2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-1/2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {course ? (
        <div className="min-h-screen bg-gray-100">
          {/* Hero Section */}
          <div className="bg-[#1c1d1f] text-white">
            <div className="mx-auto max-w-6xl px-6 py-12">

              <div className="flex items-start justify-between">

                {/* Left */}
                <div className="max-w-3xl">

                  {/* Title + Edit */}
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold tracking-tight">
                      {course.title}
                    </h1>

                    <button
                      onClick={handleEditCourse}
                      className="rounded-full p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
                      title="Edit course"
                    >
                      <FiEdit2 size={18} />
                    </button>
                  </div>

                  <p className="mt-5 text-lg leading-8 text-gray-300">
                    {course.description}
                  </p>

                  <div className="mt-6 flex gap-3">
                    <span className="rounded bg-yellow-400 px-3 py-1 text-sm font-semibold text-black">
                      {course.category}
                    </span>

                    <span className="rounded bg-[#6d28d9] px-3 py-1 text-sm">
                      {course.level}
                    </span>
                  </div>

                </div>

                {/* Delete */}
                <button
                  onClick={() => setShowModal(true)}
                  className="rounded-full p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                  title="Delete course"
                >
                  <FiTrash2 size={20} />
                </button>

              </div>

            </div>
          </div>
          {/* Main Content */}
          <div className="mx-auto max-w-6xl px-6 py-8">
            <div className="grid gap-8 lg:grid-cols-3">

              {/* Left Side */}
              <div className="lg:col-span-2">
                <div className="rounded-lg bg-white p-6 shadow">
                  <h2 className="mb-4 text-2xl font-bold">
                    What you'll learn
                  </h2>
                  {
                    course.learnings?.map((learning, index) => {
                      return <p key={index} className="leading-8 text-gray-700">
                        &#10004;{learning}
                      </p>
                    })
                  }
                </div>
              </div>



              {/* Right Side */}
              <div>
                <div className="sticky top-6 rounded-lg bg-white p-6 shadow-lg">
                  <div className="mb-6">
                    <p className="text-4xl font-bold text-gray-900">
                      ₹{course.price}
                    </p>
                  </div>

                  <button className="mb-3 w-full rounded bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700">
                    Buy Now
                  </button>

                  <button className="w-full rounded border border-gray-400 py-3 font-semibold hover:bg-gray-100">
                    Add to Cart
                  </button>

                  <div className="mt-6 border-t pt-4">
                    <h3 className="mb-3 font-semibold">
                      This Course Includes
                    </h3>

                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✓ Full lifetime access</li>
                      <li>✓ Certificate of completion</li>
                      <li>✓ Mobile and desktop access</li>
                      <li>✓ Downloadable resources</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-600">
            Loading course...
          </h2>
        </div>
      )}
    </>
  )
}

export default CourseDetail