import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"

const EditCourse = () => {
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 999,
        category: "",
        tutor: "",
        level: "",
        thumbnail: ""
    })
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const { id } = useParams();
    useEffect(() => {
        fetchCourse();
    }, [token])
    const fetchCourse = async () => {
        try {
            const res = await api.get(`/courses/instructor/my-courses/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            // console.log("Response :", res.data.courses);
            setFormData({
                title: res.data.courses.title,
                description: res.data.courses.description,
                price: res.data.courses.price,
                category: res.data.courses.category,
                level: res.data.courses.level,
                tutor: res.data.tutor,
                thumbnail : res.data.thumbnail
            })
            setCourse(res.data.courses);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-xl font-semibold text-gray-600">
                    Loading course editing form...
                </h1>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Token :", token)
        try {
            const updateCourse = await api.put(`/courses/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            // console.log("Response :", updateCourse);
            // console.log(" Course updated route Working !!")
            navigate("/instructor/my-courses");
            // console.log("Submitted!")
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-8 text-white">
                    <h1 className="text-3xl font-black">
                        Edit Course
                    </h1>

                    <p className="mt-2 text-slate-300">
                        Update your course details and keep your content up to date.
                    </p>
                </div>

                {!course ? (
                    <div className="p-10">
                        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-16 text-center">
                            <h2 className="text-2xl font-bold text-slate-800">
                                Course Not Found
                            </h2>

                            <p className="mt-3 text-slate-500">
                                The course you're trying to edit doesn't exist or has been removed.
                            </p>

                            <button
                                onClick={() => navigate("/instructor/my-courses")}
                                className="mt-8 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
                            >
                                Back to My Courses
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8 p-8">
                        {/* Title */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Course Title
                            </label>

                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                placeholder="Enter course title"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Course Tutor
                            </label>

                            <input
                                type="text"
                                value={formData.tutor}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        tutor: e.target.value,
                                    })
                                }
                                placeholder="Enter course tutor"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Course Image
                            </label>

                            <input
                                type="text"
                                value={formData.thumbnail}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        thumbnail: e.target.value,
                                    })
                                }
                                placeholder="Enter course thumbnail"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Description
                            </label>

                            <textarea
                                rows={5}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Describe your course..."
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Price */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Price (₹)
                                </label>

                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            price: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                />
                            </div>

                            {/* Level */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Level
                                </label>

                                <select
                                    value={formData.level}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            level: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                >
                                    <option value="">Select Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Category
                            </label>

                            <input
                                type="text"
                                value={formData.category}
                                placeholder="e.g. Web Development"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 border-t border-slate-200 pt-8">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="rounded-xl cursor-pointer border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="rounded-xl cursor-pointer bg-emerald-500 px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default EditCourse