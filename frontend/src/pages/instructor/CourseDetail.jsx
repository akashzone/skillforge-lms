import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';
import { useNavigate } from "react-router-dom";

const CourseDetail = () => {
  const { token } = useAuth();
  const { id } = useParams();
  console.log("Here is the ID:", id);

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
      {course ? (
        <div className="min-h-screen bg-gray-100">
          {/* Hero Section */}
          <div className="bg-[#1c1d1f] text-white">
            <div className="mx-auto max-w-6xl px-6 py-12">
              <div className="max-w-3xl">
                <h1 className="mb-4 text-4xl font-bold">
                  {course.title}
                </h1>

                <p className="mb-4 text-lg text-gray-300">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <span className="rounded bg-yellow-400 px-3 py-1 text-sm font-semibold text-black">
                    {course.category}
                  </span>

                  <span className="rounded bg-purple-600 px-3 py-1 text-sm">
                    {course.level}
                  </span>
                </div>
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
                    course.learnings?.map((learning,index) => {
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