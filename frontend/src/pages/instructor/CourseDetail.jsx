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
  const [showModalLesson, setShowModalLesson] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [course, setCourse] = useState({});
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await api.get(`/courses/instructor/my-courses/${id}`, {
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
        const res = await api.get(`/sections/${section._id}/lessons`, {
          headers: { Authorization: `Bearer ${token}` },
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

  const handleVideoUpload = (lessonId) => {
    navigate(`/instructor/lessons/${lessonId}/uploads`, {
      state: { id }
    });
  };

  const handleDeleteLesson = async () => {
    setShowModalLesson(false);
    deleteLesson(selectedLessonId);
    setLessons(prev => ({
      ...prev,
      [selectedSectionId]: prev[selectedSectionId].filter(
        lesson => lesson._id !== selectedLessonId
      ),
    }));
  }
  async function deleteLesson(id) {
    try {
      await api.delete(`/lessons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    catch (err) {
      console.log("Error :", err);
    }
  }


  const handlePreview = async (id) => {
    navigate(`/instructor/lessons/${id}/preview-lesson`);
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-2xl font-bold text-slate-900">
                Delete Course
              </h3>

              <p className="mt-3 leading-6 text-slate-500">
                Are you sure you want to delete this course? This action is permanent
                and cannot be undone.
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition-all hover:border-emerald-500 hover:text-emerald-600"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteCourse}
                className="flex-1 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition-all hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/20"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Delete Lesson
              </h3>

              <p className="mt-3 leading-6 text-slate-500">
                Are you sure you want to delete this lesson? This action cannot be
                undone.
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowModalLesson(false)}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition-all hover:border-emerald-500 hover:text-emerald-600"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteLesson}
                className="flex-1 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition-all hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {course ? (
        <div className="min-h-screen bg-slate-50">
          {/* Hero */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="mx-auto flex max-w-7xl items-start justify-between px-8 py-14">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4">
                  <h1 className="text-5xl font-black tracking-tight">
                    {course.title}
                  </h1>

                  <button
                    onClick={handleEditCourse}
                    className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-slate-300 transition hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
                    title="Edit Course"
                  >
                    <FiEdit2 size={18} />
                  </button>
                </div>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  {course.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">
                    {course.category}
                  </span>

                  <span className="rounded-full border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-slate-200">
                    {course.level}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500 hover:text-white"
                title="Delete Course"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-7xl px-8 py-10">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column (Learnings & Content) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Learnings */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-slate-900">
                      What You'll Learn
                    </h2>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                      {course.learnings?.length || 0} Topics
                    </span>
                  </div>

                  <div className="space-y-4">
                    {course.learnings?.map((learning, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                          ✓
                        </div>

                        <p className="leading-7 text-slate-700">
                          {learning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Content */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900">
                        Course Content
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Organize your course into sections and lessons.
                      </p>
                    </div>

                    <button
                      onClick={handleCreateSection}
                      className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
                    >
                      + Add Section
                    </button>
                  </div>

                  {/* Body */}
                  <div className="space-y-6 p-8">
                    {sections.length === 0 ? (
                      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-16 text-center">
                        <h3 className="text-xl font-semibold text-slate-700">
                          No Sections Yet
                        </h3>

                        <p className="mt-2 text-slate-500">
                          Create your first section to start building your course.
                        </p>
                      </div>
                    ) : (
                      sections.map((section) => (
                        <div
                          key={section._id}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                        >
                          {/* Section Header */}
                          <div className="flex items-center justify-between bg-slate-50 px-6 py-5">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">
                                {section.title}
                              </h3>

                              <p className="mt-1 text-sm text-slate-500">
                                {(lessons[section._id] || []).length} Lessons
                              </p>
                            </div>

                            <button
                              onClick={() => handleCreateLesson(section._id)}
                              className="rounded-xl bg-emerald-500 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-600"
                            >
                              + Add Lesson
                            </button>
                          </div>

                          {/* Lessons */}
                          <div className="space-y-3 p-6">
                            {(lessons[section._id] || []).length === 0 ? (
                              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-8 text-center text-slate-500">
                                No lessons added yet.
                              </div>
                            ) : (
                              lessons[section._id].map((lesson) => (
                                <div
                                  key={lesson._id}
                                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md"
                                >
                                  <div>
                                    <h4 className="font-semibold text-slate-900">
                                      {lesson.title}
                                    </h4>

                                    <p className="mt-1 text-sm text-slate-500">
                                      {lesson.videoUrl
                                        ? "Video uploaded"
                                        : "No video uploaded"}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    {lesson.videoUrl && (
                                      <button
                                        onClick={() => handlePreview(lesson._id)}
                                        className="rounded-xl border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-500 hover:text-white"
                                      >
                                        Preview
                                      </button>
                                    )}

                                    <button
                                      onClick={() => handleVideoUpload(lesson._id)}
                                      className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
                                    >
                                      {lesson.videoUrl ? "Replace" : "Upload"}
                                    </button>

                                    <button
                                      onClick={() => {
                                        setShowModalLesson(true);
                                        setSelectedLessonId(lesson._id);
                                        setSelectedSectionId(section._id);
                                      }}
                                      className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                                    >
                                      Delete
                                    </button>
                                  </div>
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

              <div className="sticky top-24 rounded-2xl border h-fit border-slate-200 bg-white p-8 shadow-sm">
                {/* Price */}
                <div className="border-b border-slate-200 pb-6">
                  <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                    Course Price
                  </p>

                  <h2 className="mt-2 text-4xl font-black text-emerald-600">
                    ₹{course.price}
                  </h2>
                </div>

                {/* Actions */}
                <div className="mt-6 space-y-3">
                  <button className="w-full rounded-xl bg-emerald-500 py-3.5 font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20">
                    Publish Course
                  </button>

                  <button className="w-full rounded-xl border border-slate-200 bg-white py-3.5 font-semibold text-slate-700 transition-all hover:border-emerald-500 hover:text-emerald-600">
                    Preview Course
                  </button>
                </div>

                {/* Course Details */}
                <div className="mt-8 border-t border-slate-200 pt-8">
                  <h3 className="mb-5 text-xl font-bold text-slate-900">
                    Course Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <span className="text-slate-500">Level</span>
                      <span className="font-semibold text-slate-900">
                        {course.level}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <span className="text-slate-500">Category</span>
                      <span className="font-semibold text-slate-900">
                        {course.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <span className="text-slate-500">Language</span>
                      <span className="font-semibold text-slate-900">
                        English
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <span className="text-slate-500">Certificate</span>
                      <span className="font-semibold text-emerald-600">
                        Included
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-600">
              Loading course...
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetail;