import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useAuth } from "../../context/AuthContext";

const PreviewLecture = () => {
    const { id } = useParams();
    const { token } = useAuth();
    const [lesson, setLesson] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
  const fetchLesson = async () => {
    try {
      const result = await api.get(`/lessons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLesson(result.data.lesson);
    } catch (error) {
      console.log(error);
    }
  };

  fetchLesson();
}, [id, token]);

    return (
  <div className="min-h-screen bg-gray-100 py-10">
    <div className="max-w-6xl mx-auto px-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm font-medium text-purple-600 hover:text-purple-700"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid lg:grid-cols-3">
          {/* Left Side */}
          <div className="lg:col-span-2 p-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {lesson?.title}
            </h1>

            <p className="mt-4 text-gray-600 leading-7">
              {lesson?.description}
            </p>

            <div className="mt-8 rounded-xl overflow-hidden border">
              <video
                src={lesson?.videoUrl}
                controls
                className="w-full aspect-video bg-black"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-gray-50 border-l p-8">
            <h2 className="text-xl font-semibold">
              Lecture Details
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-gray-500">
                  Lesson Title
                </p>

                <p className="font-medium">
                  {lesson?.title}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Description
                </p>

                <p className="text-gray-700">
                  {lesson?.description}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Video Status
                </p>

                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 my-2 text-sm font-medium text-green-700">
                  Uploaded
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
export default PreviewLecture;