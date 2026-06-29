import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

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
        if (progressRes.data?.progress) {
          setCompletedLessons(progressRes.data.progress.lessonsCompleted || []);
          setProgressPercentage(progressRes.data.progress.progressPercentage || 0);
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="h-16 bg-gray-900 border-b border-gray-700 px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1
            onClick={handleHome}
            className="text-2xl font-bold text-purple-500 cursor-pointer"
          >
            SkillForge
          </h1>

          {course && (
            <h2 className="hidden lg:block text-lg font-medium text-white truncate">
              {course.title}
            </h2>
          )}
        </div>

        <button className="px-4 py-2 rounded-md border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition font-medium text-sm">
          My Progress: {progressPercentage}%
        </button>
      </header>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* LEFT */}
        <div className="flex-1">
          {/* Video Player */}
          <div className="bg-black h-[220px] sm:h-[300px] md:h-[450px] lg:h-[550px]">
            {selectedLesson ? (
              <video
                controls
                src={selectedLesson.videoUrl}
                className="block w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                Loading lesson...
              </div>
            )}
          </div>

          {/* ---------- MOBILE TABS ---------- */}
          <div className="lg:hidden border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab("content")}
                className={`flex-1 py-3 font-medium ${activeTab === "content"
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-600"
                  }`}
              >
                Course Content
              </button>

              <button
                onClick={() => setActiveTab("overview")}
                className={`flex-1 py-3 font-medium ${activeTab === "overview"
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-600"
                  }`}
              >
                Overview
              </button>
            </div>

            {/* MOBILE CONTENT TAB */}
            {activeTab === "content" && (
              <div className="p-4">
                {sections.map((section, index) => (
                  <div key={section._id} className="border-b">
                    <button
                      onClick={() => handleSectionClick(section._id)}
                      className="w-full text-left p-4 hover:bg-gray-100"
                    >
                      <h3 className="font-semibold">
                        Section {index + 1}: {section.title}
                      </h3>
                    </button>

                    {expandedSection === section._id && (
                      <div className="pl-4 pr-2 pb-3 space-y-1">
                        {lessons[section._id]?.map((lesson) => (
                          <div
                            key={lesson._id}
                            onClick={() => setSelectedLesson(lesson)}
                            className={`flex items-center gap-3 cursor-pointer rounded-md px-3 py-2 transition ${selectedLesson?._id === lesson._id
                                ? "bg-purple-100 text-purple-700 font-medium"
                                : "hover:bg-gray-100"
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={completedLessons.includes(lesson._id)}
                              onChange={(e) => handleToggleProgress(e, lesson._id)}
                              className="w-4 h-4 rounded text-purple-600 border-gray-300 focus:ring-purple-500 cursor-pointer accent-purple-600 animate-fade-in"
                            />
                            <span className="truncate">{lesson.title}</span>
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
              <div className="p-5">
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <p className="mt-2 text-sm text-gray-500">English • {course.level}</p>
                <p className="mt-5 text-gray-700 leading-7">{course.description}</p>
              </div>
            )}
          </div>

          {/* ---------- DESKTOP OVERVIEW ---------- */}
          <main className="hidden lg:block p-8">
            {course && (
              <>
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <p className="mt-2 text-sm text-gray-500">English • {course.level}</p>
                <p className="mt-6 leading-7">{course.description}</p>
              </>
            )}
          </main>
        </div>

        {/* ---------- DESKTOP SIDEBAR ---------- */}
        <aside className="hidden lg:block w-[420px] border-l overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4">
            <h2 className="text-xl font-bold">Course Content</h2>
          </div>

          <div className="p-4">
            {sections.map((section, index) => (
              <div key={section._id} className="border-b">
                <button
                  onClick={() => handleSectionClick(section._id)}
                  className="w-full text-left p-4 hover:bg-gray-100"
                >
                  <h3 className="font-semibold">
                    Section {index + 1}: {section.title}
                  </h3>
                </button>

                {expandedSection === section._id && (
                  <div className="pl-4 pr-2 pb-3 space-y-1">
                    {lessons[section._id]?.map((lesson) => (
                      <div
                        key={lesson._id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={`flex items-center gap-3 cursor-pointer rounded-md px-3 py-2 transition ${selectedLesson?._id === lesson._id
                            ? "bg-purple-100 text-purple-700 font-medium"
                            : "hover:bg-gray-100"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={completedLessons.includes(lesson._id)}
                          onChange={(e) => handleToggleProgress(e, lesson._id)}
                          className="w-4 h-4 rounded text-purple-600 border-gray-300 focus:ring-purple-500 cursor-pointer accent-purple-600"
                        />
                        <span className="truncate">{lesson.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseContent;