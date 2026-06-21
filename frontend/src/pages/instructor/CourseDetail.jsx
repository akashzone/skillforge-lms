import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const CourseDetail = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [course, setCourse] = useState({});
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await api.get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourse(res.data.courses);
    };
    if (token && id) fetchCourse();
  }, [token, id]);

  useEffect(() => {
    const fetchSections = async () => {
      const res = await api.get(`/sections/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedSections = res.data.sections;
      setSections(fetchedSections);
      fetchLessons(fetchedSections);
    };

    if (token && id) fetchSections();
  }, [token, id]);

  const fetchLessons = async (sectionsList) => {
    try {
      const lessonMap = {};

      for (const section of sectionsList) {
        const res = await api.get(`/lessons/${section._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        lessonMap[section._id] = res.data.lessons;
      }

      setLessons(lessonMap);
    } catch (err) {
      console.log(err);
    }
  };

  async function handleDeleteCourse() {
    try {
      setShowModal(false);
      onDelete(id);
    } catch (err) {
      console.error(err);
    }
  }

  const onDelete = async (courseId) => {
    await api.delete(`/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCourses(courses.filter(c => c._id !== courseId));
    navigate("/instructor/my-courses");
  };

  const handleEditCourse = () => {
    navigate(`/instructor/${id}/edit`);
  };

  const handleCreateSection = () => {
    navigate(`/instructor/courses/${id}/create-section`);
  };

  const handleCreateLesson = (sectionId) => {
    navigate(`/instructor/lessons/${sectionId}/create-lesson`);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-[400px] h-[150px] bg-white p-5 rounded-lg flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="text-lg font-semibold">Delete Course?</h3>
              <p className="text-gray-600 mt-2">Are you sure you want to delete this course?</p>
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
          <div className="bg-[#1c1d1f] text-white">
            <div className="mx-auto max-w-6xl px-6 py-12">
              <div className="flex items-start justify-between">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
                    <button
                      onClick={handleEditCourse}
                      className="rounded-full p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
                      title="Edit course"
                    >
                      <FiEdit2 size={18} />
                    </button>
                  </div>
                  <p className="mt-5 text-lg leading-8 text-gray-300">{course.description}</p>
                  <div className="mt-6 flex gap-3">
                    <span className="rounded bg-yellow-400 px-3 py-1 text-sm font-semibold text-black">
                      {course.category}
                    </span>
                    <span className="rounded bg-[#6d28d9] px-3 py-1 text-sm">
                      {course.level}
                    </span>
                  </div>
                </div>
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
          <div className="mx-auto max-w-6xl px-6 py-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-lg bg-white p-6 shadow">
                  <h2 className="mb-4 text-2xl font-bold">What you'll learn</h2>
                  {course.learnings?.map((learning, index) => (
                    <p key={index} className="leading-8 text-gray-700">
                      &#10004;{learning}
                    </p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 mt-8">
                <div className="rounded-xl bg-white shadow-lg">
                  <div className="flex items-center justify-between border-b px-6 py-5">
                    <h2 className="text-2xl font-bold">Course Content</h2>
                    <button
                      onClick={handleCreateSection}
                      className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                    >
                      + Add Section
                    </button>
                  </div>

                  <div className="space-y-5 p-6">
                    {sections.length === 0 ? (
                      <div className="rounded-lg border-2 border-dashed border-gray-300 py-10 text-center text-gray-500">
                        No sections added yet.
                      </div>
                    ) : (
                      sections.map((section) => (
                        <div key={section._id} className="rounded-xl border bg-white">
                          <div className="flex items-center justify-between border-b px-6 py-4">
                            <h3 className="text-lg font-semibold">{section.title}</h3>
                            <button
                              onClick={() => handleCreateLesson(section._id)}
                              className="rounded bg-purple-600 px-3 py-2 text-sm text-white"
                            >
                              + Add Lesson
                            </button>
                          </div>

                          <div className="space-y-2 p-5">
                            {(lessons[section._id] || []).length === 0 ? (
                              <p className="text-gray-500">No lessons yet.</p>
                            ) : (
                              lessons[section._id].map((lesson) => (
                                <div key={lesson._id} className="flex justify-between rounded-md bg-gray-50 px-4 py-3">
                                  <span>{lesson.title}</span>
                                  <button className="text-purple-600">Edit</button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="sticky top-6 rounded-xl bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-3xl font-bold">₹{course.price}</h2>
                <button className="mb-3 w-full rounded-lg bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700">
                  Publish Course
                </button>
                <button className="w-full rounded-lg border py-3 font-semibold hover:bg-gray-100">
                  Preview Course
                </button>
                <div className="mt-8 border-t pt-6">
                  <h3 className="mb-4 text-lg font-semibold">Course Details</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Level</span>
                      <span>{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category</span>
                      <span>{course.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Language</span>
                      <span>English</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Certificate</span>
                      <span>Yes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-600">Loading course...</h2>
        </div>
      )}
    </>
  );
};

export default CourseDetail;