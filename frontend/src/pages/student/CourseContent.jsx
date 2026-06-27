import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";


const CourseContent = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = id;
  // console.log("Course ID :", courseId);

  const { token } = useAuth();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState({});
  const [expandedSection, setExpandedSection] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState("content");


  useEffect(() => {
    const fetchCourse = async () => {
      const res = await api.get(`/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourse(res.data.course);
      console.log("Response - GET: /courses/${courseId}`", res.data.course)
    };

    if (token && id) fetchCourse();
  }, [id, token]);

  useEffect(() => {
    const fetchSections = async () => {
      const res = await api.get(`/sections/student/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res) {
        return res.status(401).json({
          message: "Error in fetching the sections"
        })
      }
      setSections(res.data.sections);
      console.log("Sections GET : /sections/student/{courseId} - ", res.data.sections)
    };
    if (token && id) fetchSections();
  }, [token, id]);

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
        console.log("Section Id:", section._id)
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

  const handleSectionClick = (sectionId) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null); // Close if already open
    } else {
      setExpandedSection(sectionId); // Open clicked section
    }
  };
  const handleHome = () => {
    navigate("/student/my-courses");
  }
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

      <button className="px-4 py-2 rounded-md border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition">
        My Progress
      </button>
    </header>

    <div className="flex flex-col lg:flex-row flex-1">
      {/* LEFT */}
      <div className="flex-1">
        {/* Video */}
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
              className={`flex-1 py-3 font-medium ${
                activeTab === "content"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-600"
              }`}
            >
              Course Content
            </button>

            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 py-3 font-medium ${
                activeTab === "overview"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-600"
              }`}
            >
              Overview
            </button>
          </div>

          {/* CONTENT TAB */}
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
                    <div className="pl-8 pb-3">
                      {lessons[section._id]?.map((lesson) => (
                        <div
                          key={lesson._id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`cursor-pointer rounded-md px-3 py-2 ${
                            selectedLesson?._id === lesson._id
                              ? "bg-purple-100 text-purple-700 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {lesson.title}
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
              <h1 className="text-2xl font-bold">
                {course.title}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                English • {course.level}
              </p>

              <p className="mt-5 text-gray-700 leading-7">
                {course.description}
              </p>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  What you'll learn
                </h2>

                <ul className="space-y-3 list-disc list-inside">
                  {course.learnings?.map((learning, index) => (
                    <li key={index}>{learning}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* ---------- DESKTOP OVERVIEW ---------- */}
        <main className="hidden lg:block p-8">
          {course && (
            <>
              <h1 className="text-3xl font-bold">
                {course.title}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                English • {course.level}
              </p>

              <p className="mt-6 leading-7">
                {course.description}
              </p>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  What you'll learn
                </h2>

                <ul className="space-y-3 list-disc list-inside">
                  {course.learnings?.map((learning, index) => (
                    <li key={index}>{learning}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </main>
      </div>

      {/* ---------- DESKTOP SIDEBAR ---------- */}
      <aside className="hidden lg:block w-[420px] border-l overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <h2 className="text-xl font-bold">
            Course Content
          </h2>
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
                <div className="pl-8 pb-3">
                  {lessons[section._id]?.map((lesson) => (
                    <div
                      key={lesson._id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`cursor-pointer rounded-md px-3 py-2 ${
                        selectedLesson?._id === lesson._id
                          ? "bg-purple-100 text-purple-700 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {lesson.title}
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
}

export default CourseContent