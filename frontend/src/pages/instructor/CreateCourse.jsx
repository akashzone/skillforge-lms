import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
    const { token } = useAuth();
    const [thumbnail, setThumbnail] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 999,
        category: "",
        level: "",
        thumbnail: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, price, level, learnings, category, thumbnail} = formData;
        const trimmedTitle = title.trim();

        if (!price || !trimmedTitle || !level || !category || !description || !thumbnail) {
            alert("All fields are required");
            return;
        }
        try {
            await api.post(
                "/courses",
                {
                    title: trimmedTitle,
                    description,
                    price,
                    level,
                    thumbnail,
                    learnings,
                    category
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate("/instructor/my-courses");
        } catch (error) {
            console.log("Error :", error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-12">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-10 py-8 text-white">
                    <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
                        Instructor Panel
                    </p>

                    <h1 className="mt-2 text-4xl font-black">
                        Create New Course
                    </h1>

                    <p className="mt-3 text-slate-300">
                        Fill in the details below to publish your course.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8 p-10">

                    {/* Title */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Course Title
                        </label>

                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            placeholder="e.g. Complete React Bootcamp"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Thumbnail URL
                        </label>

                        <input
                            type="text"
                            value={formData.thumbnail}
                            onChange={(e) =>
                                setFormData({ ...formData, thumbnail: e.target.value })
                            }
                            placeholder="https://example.com/image.jpg"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
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
                                setFormData({ ...formData, description: e.target.value })
                            }
                            placeholder="Describe your course..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

                    {/* Price & Level */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Price (₹)
                            </label>

                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({ ...formData, price: e.target.value })
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Level
                            </label>

                            <select
                                value={formData.level}
                                onChange={(e) =>
                                    setFormData({ ...formData, level: e.target.value })
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
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
                                setFormData({ ...formData, category: e.target.value })
                            }
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

                    {/* Learnings */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            What students will learn
                        </label>

                        <textarea
                            rows={4}
                            value={formData.learnings}
                            onChange={(e) =>
                                setFormData({ ...formData, learnings: e.target.value })
                            }
                            placeholder="Separate each learning outcome with commas"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 border-t border-slate-200 pt-8">
                        <button
                            type="button"
                            onClick={() => navigate("/instructor/my-courses")}
                            className="rounded-xl  cursor-pointer border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-emerald-500 hover:text-emerald-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl cursor-pointer bg-emerald-500 px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
                        >
                            Create Course
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;