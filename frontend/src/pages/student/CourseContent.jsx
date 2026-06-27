import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";


const CourseContent = () => {

  const { id } = useParams();
  const courseId = id;
  // console.log("Course ID :", courseId);

  const { token } = useAuth();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState({});
  const [expandedSection, setExpandedSection] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);


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
  const handleHome = ()=>{
    navigate("/student/my-courses");
  }
  return (
    <>
      <div className="h-screen flex flex-col">

        {/* Navbar */}
        <header className="h-16 bg-gray-900 border-b border-gray-700 px-6 flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-6">
            <h1 onClick={handleHome} className="text-2xl font-bold text-purple-500">
              SkillForge
            </h1>

            {course && (
              <h2 className="text-lg font-medium text-white truncate max-w-xl">
                {course.title}
              </h2>
            )}
          </div>

          {/* Right */}
          <button
            className="px-4 py-2 rounded-md border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition duration-200"
          >
            My Progress
          </button>

        </header>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">

          {/* Left Side */}
          <div className="flex-1 flex flex-col overflow-y-auto">

            {/* Video */}
            <div className="h-[300px] md:h-[450px] lg:h-[550px] bg-black">

              {selectedLesson ? (
                <video
                  controls
                  className="w-full h-full"
                  src={selectedLesson.videoUrl}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white">
                  Loading lesson...
                </div>
              )}

            </div>

            {/* Course Details */}
            <main className="p-8 bg-white">

              {course && (
                <>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {course.title}
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    English • {course.level}
                  </p>

                  <p className="mt-6 text-gray-700 leading-7">
                    {course.description}
                  </p>

                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                      What you'll learn
                    </h2>

                    <ul className="space-y-3 list-disc list-inside text-gray-700">
                      {course.learnings?.map((learning, index) => (
                        <li key={index}>
                          {learning}
                        </li>
                      ))}
                    </ul>
                  </div>

                </>
              )}

            </main>

          </div>

          {/* Sidebar */}
          <aside className="w-[420px] bg-white border-l border-gray-200 overflow-y-auto">

            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-800">
                Course Content
              </h2>
            </div>

            <div className="p-4">

              {sections.map((section, index) => (
                <div key={section._id} className="border-b">

                  {/* Section */}
                  <button
                    onClick={() => handleSectionClick(section._id)}
                    className="w-full cursor-pointer text-left p-4 hover:bg-gray-100"
                  >
                    <h3 className="font-semibold">
                      Section {index + 1}: {section.title}
                    </h3>
                  </button>

                  {/* Lessons */}
                  {expandedSection === section._id && (
                    <div className="pl-8 pb-3">

                      {lessons[section._id]?.map((lesson) => (
                        <div
                          key={lesson._id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`cursor-pointer rounded-md px-3 py-2 transition
    ${selectedLesson?._id === lesson._id
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
    </>
  )
}

export default CourseContent