import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

const StudentCourseDetail = () => {
  const { id } = useParams();
  const courseId = id;
  // console.log("Course Id :",courseId)
  const { token } = useAuth();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();
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
        // console.log("Section Id:", section._id)
        const res = await api.get(`/sections/student/${section._id}/lessons`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        lessonMap[section._id] = res.data.lessons;
      }
      setLessons(lessonMap);
      // console.log("Lessons :", lessonMap);

    } catch (err) {
      console.log(err);
    }
  };


  const handleEnroll = async (id) => {
    try {
      const result = await api.post(
        "/enroll",
        {
          courseId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(result.data);

      setIsEnrolled(true);

    } catch (err) {
      console.log("Error:", err);
    }
  };

  const checkEnrollment = async () => {
    const res = await api.get(`/enroll/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setIsEnrolled(res.data.enrolled);
  };

  useEffect(() => {
    checkEnrollment();
  }, [courseId]);

  const handleGotoCourse = (id) => {
    navigate(`/student/my-course/${id}`);
  }
  if (!course) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left */}
            <div className="lg:col-span-2">
              <span className="inline-flex rounded-full bg-emerald-500/20 px-4 py-1 text-sm font-semibold text-emerald-300">
                {course.category}
              </span>

              <h1 className="mt-5 text-5xl font-black leading-tight">
                {course.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {course.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-lg">★★★★★</span>
                  <span>{course.level}</span>
                </div>

                <div className="h-4 w-px bg-slate-600"></div>

                <span>{course.category}</span>

                <div className="h-4 w-px bg-slate-600"></div>

                <span>
                  Updated{" "}
                  {new Date(course.createdAt).toLocaleDateString()}
                </span>

                <div className="h-4 w-px bg-slate-600"></div>

                <span>English</span>
              </div>

              <p className="mt-6 text-slate-300">
                Created by{" "}
                <span className="font-semibold text-emerald-300">
                  {course.tutor ? course.tutor : "Piyush Garg"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto -mt-12 max-w-7xl px-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Side */}
          <div className="space-y-8 lg:col-span-2">
            {/* Learnings */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-8 text-3xl font-bold text-slate-900">
                What You'll Learn
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                {course.learnings?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                      ✓
                    </div>

                    <p className="leading-7 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Course Content
                  </h2>

                  <p className="mt-1 text-slate-500">
                    {sections.length} Sections
                  </p>
                </div>
              </div>

              <div className="space-y-6 p-8">
                {sections.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-slate-300 py-14 text-center text-slate-500">
                    No sections available.
                  </div>
                ) : (
                  sections.map((section) => (
                    <div
                      key={section._id}
                      className="overflow-hidden rounded-2xl border border-slate-200"
                    >
                      <div className="bg-slate-50 px-6 py-5">
                        <h3 className="text-xl font-bold text-slate-900">
                          {section.title}
                        </h3>
                      </div>

                      <div className="space-y-3 p-5">
                        {(lessons[section._id] || []).length === 0 ? (
                          <p className="text-slate-500">
                            No lessons available.
                          </p>
                        ) : (
                          lessons[section._id].map((lesson, index) => (
                            <div
                              key={lesson._id}
                              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 transition hover:border-emerald-300 hover:bg-emerald-50"
                            >
                              <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-600">
                                  {index + 1}
                                </div>

                                <span className="font-semibold text-slate-800">
                                  {lesson.title}
                                </span>
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

            {/* Video */}
            {selectedLesson && (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-3xl font-bold text-slate-900">
                  {selectedLesson.title}
                </h2>

                <video
                  controls
                  src={selectedLesson.videoUrl}
                  className="w-full rounded-2xl"
                />
              </div>
            )}
          </div>

          {/* Right Card */}
          {/* RIGHT SIDEBAR */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="-mt-52 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

                {/* Thumbnail */}
                <div className="relative">
                  <img
                    src={course.thumbnail || "/pic1.jpeg"}
                    alt={course.title}
                    className="h-60 w-full object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-lg transition hover:scale-105">
                      <svg
                        className="ml-1 h-8 w-8 fill-slate-700"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>

                  <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-semibold text-white">
                    Preview this course
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6">

                  {/* Price */}
                  <div className="mb-5">
                    <h2 className="text-4xl font-black text-slate-900">
                      ₹{course.price}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Lifetime access
                    </p>
                  </div>

                  {/* Button */}
                  {isEnrolled ? (
                    <button
                      onClick={() => handleGotoCourse(id)}
                      className="w-full cursor-pointer rounded-xl bg-emerald-500 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600"
                    >
                      Continue Learning
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(id)}
                      className="w-full cursor-pointer rounded-xl bg-emerald-500 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600"
                    >
                      Enroll Now
                    </button>
                  )}

                  <p className="mt-4 text-center text-sm text-slate-500">
                    30-Day Money-Back Guarantee
                  </p>

                  <div className="my-6 border-t border-slate-200"></div>

                  {/* Includes */}
                  <h3 className="mb-4 text-lg font-bold text-slate-900">
                    This course includes
                  </h3>

                  <div className="space-y-4 text-sm text-slate-700">

                    <div className="flex items-center gap-3">
                      <span> On-demand video lessons</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>Downloadable resources</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>Source code included</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>Access on mobile and TV</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>Full lifetime access</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>Certificate of completion</span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentCourseDetail;