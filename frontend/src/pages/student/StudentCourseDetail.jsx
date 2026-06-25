import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const StudentCourseDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handlePreview = (lesson) => {
    setSelectedLesson(lesson);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await api.get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourse(res.data.course);
    };

    if (token && id) fetchCourse();
  }, [id, token]);

  useEffect(() => {
    const fetchSections = async () => {
      const res = await api.get(`/sections/student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSections(res.data.sections);
    };
    if (token && id) fetchSections();
  }, [token, id]);

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    fetchLessons(sections);
  }, [sections]);

  const fetchLessons = async (sectionsList) => {
    try {
      const lessonMap = {};

      for (const section of sectionsList) {
        console.log("Section Id:",section._id)
        const res = await api.get(`/sections/student/${section._id}/lessons`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        lessonMap[section._id] = res.data.lessons;
      }
      setLessons(lessonMap);
      console.log("Lessons :", lessonMap);

    } catch (err) {
      console.log(err);
    }
  };

  if (!course) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#1c1d1f] text-white pb-20">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* LEFT */}
            <div className="lg:col-span-2 pt-14">
              <p className="text-purple-400 font-medium mb-3">
                Development &gt; {course.category}
              </p>

              <h1 className="text-5xl font-bold leading-tight">
                {course.title}
              </h1>

              <p className="mt-5 text-xl text-gray-300">
                {course.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-6">
                <span className="text-yellow-400 font-bold">
                  ★★★★★
                </span>

                <span className="text-gray-300">
                  Beginner
                </span>

                <span className="text-gray-400">•</span>

                <span className="text-gray-300">
                  {course.category}
                </span>
              </div>

              {/* Instructor */}
              <div className="mt-6 text-gray-300">
                Created by{" "}
                <span className="underline text-purple-300">
                  Piyush Garg
                </span>
              </div>

              {/* Meta */}
              <div className="flex gap-6 mt-5 text-gray-400">
                <span>
                  Last updated{" "}
                  {new Date(course.createdAt).toLocaleDateString()}
                </span>

                <span>Lng: English</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">
            {/* Learn */}
            <div className="border mt-10 p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-8">
                What you'll learn
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                {course.learnings?.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                  >
                    <span className="text-green-600">
                      ✓
                    </span>

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="mt-10 rounded-xl bg-white shadow-lg">
              <div className="border-b px-6 py-5">
                <h2 className="text-2xl font-bold">
                  Course Content
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {sections.length} Sections
                </p>
              </div>

              <div className="space-y-5 p-6">
                {sections.length === 0 ? (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 py-10 text-center text-gray-500">
                    No sections available.
                  </div>
                ) : (
                  sections.map((section) => (
                    <div
                      key={section._id}
                      className="rounded-xl border bg-white"
                    >
                      <div className="border-b px-6 py-4">
                        <h3 className="text-lg font-semibold">
                          {section.title}
                        </h3>
                      </div>

                      <div className="space-y-2 p-5">
                        {(lessons[section._id] || []).length === 0 ? (
                          <p className="text-gray-500">
                            No lessons available.
                          </p>
                        ) : (
                          lessons[section._id].map((lesson, index) => (
                            <div
                              key={lesson._id}
                              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition"
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-purple-600">
                                  {index + 1}.
                                </span>

                                <span className="font-medium">
                                  {lesson.title}
                                </span>
                              </div>

                              {/* {lesson.videoUrl && (
                                <button
                                  onClick={() => handlePreview(lesson)}
                                  className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition"
                                >
                                  Watch
                                </button>
                              )} */}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Video Player */}
            {selectedLesson && (
              <div className="mt-10 rounded-xl bg-white shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-5">
                  {selectedLesson.title}
                </h2>

                <video
                  controls
                  src={selectedLesson.videoUrl}
                  className="w-full rounded-lg"
                />
              </div>
            )}
          </div>

          {/* RIGHT CARD */}
          <div>
            <div className="-mt-80 top-10">
              <div className="bg-white border shadow-2xl rounded-xl overflow-hidden">
                <img
                  src="../../public/pic1.jpeg"
                  alt=""
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <h2 className="text-4xl font-bold">
                    ₹{course.price}
                  </h2>

                  <button className="mt-6 w-full bg-[#a435f0] hover:bg-purple-700 text-white py-3 font-bold rounded">
                    Enroll Now
                  </button>

                  <button className="mt-3 w-full border py-3 font-semibold rounded">
                    Add to Wishlist
                  </button>

                  <p className="text-center mt-5 text-sm text-gray-500">
                    30-Day Money-Back Guarantee
                  </p>

                  <hr className="my-6" />

                  <h3 className="font-bold mb-4">
                    This course includes:
                  </h3>

                  <div className="space-y-3 text-sm">
                    <p>✓ Full Lifetime Access</p>
                    <p>✓ Access on Mobile & TV</p>
                    <p>✓ Source Code</p>
                    <p>✓ Certificate of Completion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseDetail;