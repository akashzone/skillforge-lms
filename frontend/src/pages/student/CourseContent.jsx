import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import Confetti from "react-confetti";

const CourseContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = id;

  const { token } = useAuth();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState({});
  const [expandedSection, setExpandedSection] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState("content");
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(res.data.course);
      } catch (err) {
        console.error("Error fetching course", err);
      }
    };

    if (token && id) fetchCourse();
  }, [id, token]);

  useEffect(() => {
    const fetchSectionsAndProgress = async () => {
      try {
        // Fetch Sections
        const sectionsRes = await api.get(`/sections/student/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSections(sectionsRes.data.sections);
        const progressRes = await api.get(`/progress/course/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("Progress API Response:", progressRes.data);
        const progress = progressRes.data.progress;

        if (progress) {
          setCompletedLessons(progress.lessonsCompleted || []);
          setProgressPercentage(progress.progressPercentage || 0);
        } else {
          setCompletedLessons([]);
          setProgressPercentage(0);
        }
      } catch (err) {
        console.error("Error fetching sections or progress", err);
      }
    };
    if (token && id) fetchSectionsAndProgress();
  }, [token, id, courseId]);

  useEffect(() => {
    if (!sections || sections.length === 0) return;
    fetchLessons(sections);
  }, [sections]);

  useEffect(() => {
    if (sections.length === 0) return;

    const firstSection = sections[0];
    const firstLesson = lessons[firstSection._id]?.[0];

    if (firstLesson) {
      setSelectedLesson(firstLesson);
      setExpandedSection(firstSection._id);
    }
  }, [lessons, sections]);

  useEffect(() => {
    if (progressPercentage === 100) {
      setShowCelebration(true);
    } else {
      setShowCelebration(false);
    }
  }, [progressPercentage]);

  const fetchLessons = async (sectionsList) => {
    try {
      const lessonMap = {};
      for (const section of sectionsList) {
        const res = await api.get(`/sections/student/${section._id}/lessons`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        lessonMap[section._id] = res.data.lessons;
      }
      setLessons(lessonMap);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleProgress = async (e, lessonId) => {
    e.stopPropagation();

    // console.log("Lesson")
    const isAlreadyCompleted = completedLessons.includes(lessonId);
    if (isAlreadyCompleted) {
      setCompletedLessons(completedLessons.filter((id) => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }

    try {
      const res = await api.post(
        `/progress/${lessonId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.progress) {
        setCompletedLessons(res.data.progress.lessonsCompleted);
        setProgressPercentage(res.data.progress.progressPercentage);
      }
    } catch (err) {
      console.error("Failed to update progress on backend", err);
      if (isAlreadyCompleted) {
        setCompletedLessons([...completedLessons, lessonId]);
      } else {
        setCompletedLessons(completedLessons.filter((id) => id !== lessonId));
      }
    }
  };

  const handleSectionClick = (sectionId) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };

  const handleHome = () => {
    navigate("/student/my-courses");
  };
  return (

    <>
      {showCelebration && (
        <>
          <Confetti
            recycle={false}
            numberOfPieces={200}
            gravity={0.18}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

              {/* Top Banner */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white shadow-lg">
                  <svg
                    className="h-10 w-10 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-8 text-center">
                <h2 className="text-3xl font-bold text-slate-900">
                  Course Completed 🎉
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Congratulations! You've successfully completed this course.
                  Your progress has been saved, and you're one step closer to
                  achieving your learning goals.
                </p>

                {/* Stats */}
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-medium text-emerald-700">
                    ✓ Progress: <span className="font-bold">100% Complete</span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setShowCelebration(false)}
                    className="flex-1 cursor-pointer rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Continue
                  </button>

                  <button
                    onClick={() => navigate("/student/my-courses")}
                    className="flex-1 cursor-pointer rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/20"
                  >
                    My Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="min-h-screen flex flex-col bg-white">
        {/* Navbar */}
        <header className="sticky top-0 z-50 h-16 border-b border-slate-800 bg-slate-900 shadow-sm">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-6">

            {/* Left */}
            <div className="flex items-center gap-5">
              <h1
                onClick={handleHome}
                className="cursor-pointer text-2xl font-bold tracking-tight text-emerald-400 transition hover:text-emerald-300"
              >
                SkillForge
              </h1>

              {course && (
                <>
                  <div className="hidden h-6 w-px bg-slate-700 lg:block" />

                  <h2 className="hidden max-w-md truncate text-lg font-medium text-slate-200 lg:block">
                    {course.title}
                  </h2>
                </>
              )}
            </div>

            {/* Right */}
            <div className="flex items-center">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-2">
                <span className="text-sm font-medium text-slate-300">
                  Progress
                </span>

                <span className="ml-2 text-sm font-bold text-emerald-400">
                  {progressPercentage}%
                </span>
              </div>
            </div>

          </div>
        </header>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* LEFT */}
          <div className="flex-1 bg-slate-50">
            {/* Video Player */}
            <div className="overflow-hidden bg-black shadow-lg">
              <div className="h-[220px] sm:h-[300px] md:h-[450px] lg:h-[550px]">
                {selectedLesson ? (
                  <video
                    controls
                    src={selectedLesson.videoUrl}
                    className="block h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-lg font-medium text-slate-300">
                    Loading lesson...
                  </div>
                )}
              </div>
            </div>

            {/* ---------- MOBILE TABS ---------- */}
            <div className="lg:hidden bg-white border-b border-slate-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("content")}
                  className={`flex-1 border-b-2 py-4 text-sm font-semibold transition ${activeTab === "content"
                    ? "border-emerald-600 text-emerald-600"
                    : "border-transparent text-slate-500"
                    }`}
                >
                  Course Content
                </button>

                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex-1 border-b-2 py-4 text-sm font-semibold transition ${activeTab === "overview"
                    ? "border-emerald-600 text-emerald-600"
                    : "border-transparent text-slate-500"
                    }`}
                >
                  Overview
                </button>
              </div>

              {/* MOBILE CONTENT TAB */}
              {activeTab === "content" && (
                <div className="bg-slate-50 p-4">
                  {sections.map((section, index) => (
                    <div
                      key={section._id}
                      className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-white"
                    >
                      <button
                        onClick={() => handleSectionClick(section._id)}
                        className="w-full px-5 py-4 text-left transition hover:bg-slate-50"
                      >
                        <h3 className="font-semibold text-slate-800">
                          Section {index + 1}: {section.title}
                        </h3>
                      </button>

                      {expandedSection === section._id && (
                        <div className="border-t border-slate-200 px-3 py-3 space-y-2">
                          {lessons[section._id]?.map((lesson) => (
                            <div
                              key={lesson._id}
                              onClick={() => setSelectedLesson(lesson)}
                              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 transition ${selectedLesson?._id === lesson._id
                                ? "bg-emerald-100 text-emerald-700"
                                : "hover:bg-slate-100"
                                }`}
                            >
                              <input
                                type="checkbox"
                                checked={completedLessons.includes(lesson._id)}
                                onChange={(e) =>
                                  handleToggleProgress(e, lesson._id)
                                }
                                className="h-4 w-4 cursor-pointer accent-emerald-600"
                              />

                              <span className="truncate text-sm font-medium">
                                {lesson.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* OVERVIEW TAB */}
              {activeTab === "overview" && course && (
                <div className="bg-white p-6">
                  <h1 className="text-2xl font-bold text-slate-900">
                    {course.title}
                  </h1>

                  <p className="mt-2 text-sm font-medium text-emerald-600">
                    English • {course.level}
                  </p>

                  <p className="mt-5 leading-8 text-slate-600">
                    {course.description}
                  </p>
                </div>
              )}
            </div>

            {/* ---------- DESKTOP OVERVIEW ---------- */}
            <main className="hidden lg:block p-8">
              {course && (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {course.title}
                  </h1>

                  <p className="mt-2 text-sm font-medium text-emerald-600">
                    English • {course.level}
                  </p>

                  <p className="mt-6 leading-8 text-slate-600">
                    {course.description}
                  </p>
                </div>
              )}
            </main>
          </div>

          {/* ---------- DESKTOP SIDEBAR ---------- */}
          <aside className="hidden lg:block w-[430px] border-l border-slate-200 bg-slate-100 shrink-0">
            <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">

              {/* Header */}
              <div className="border-b border-slate-200 bg-white px-6 py-5 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Course Content
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {sections.length} Sections •{" "}
                  {Object.values(lessons).flat().length} Lessons
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-4 p-4">
                {sections.map((section, index) => (
                  <div
                    key={section._id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    {/* Section Header */}
                    <button
                      onClick={() => handleSectionClick(section._id)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                          Section {index + 1}
                        </p>

                        <h3 className="mt-1 font-semibold text-slate-800">
                          {section.title}
                        </h3>
                      </div>

                      <svg
                        className={`h-5 w-5 text-slate-400 transition-transform ${expandedSection === section._id ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Lessons */}
                    {expandedSection === section._id && (
                      <div className="border-t border-slate-200 bg-slate-50 p-3 space-y-2">
                        {lessons[section._id]?.map((lesson) => (
                          <div
                            key={lesson._id}
                            onClick={() => setSelectedLesson(lesson)}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition ${selectedLesson?._id === lesson._id
                              ? "bg-emerald-100 text-emerald-700"
                              : "hover:bg-white"
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={completedLessons.includes(lesson._id)}
                              onChange={(e) =>
                                handleToggleProgress(e, lesson._id)
                              }
                              className="h-4 w-4 cursor-pointer accent-emerald-600"
                            />

                            <span className="flex-1 truncate text-sm font-medium">
                              {lesson.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default CourseContent;