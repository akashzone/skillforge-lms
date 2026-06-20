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
        level: ""
    })
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const { id } = useParams();
    useEffect(() => {
        fetchCourse();
    }, [token])
    const fetchCourse = async () => {
        try {
            const res = await api.get(`/courses/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log("Response :", res.data.courses)
            setFormData({
                title: res.data.courses.title,
                description: res.data.courses.description,
                price: res.data.courses.price,
                category: res.data.courses.category,
                level: res.data.courses.level
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
        console.log("Token :", token)
        try {
            const updateCourse = await api.put(`/courses/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log("Response :", updateCourse);
            console.log(" Course updated route Working !!")
            navigate("/instructor/my-courses");
            console.log("Submitted!")
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900">
                    Edit Course
                </h1>

                <p className="mt-2 text-gray-600">
                    Update your course information below.
                </p>

                {!course ? (
                    <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Course Not Found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            The course you're trying to edit doesn't exist.
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >
                        {/* Title */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
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
                                placeholder="Enter course description"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                            />
                        </div>

                        {/* Level */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
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
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                            >
                                <option value="">Select Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/instructor/my-courses")}
                                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
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