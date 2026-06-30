import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';
import { useNavigate, useParams } from "react-router-dom";

const CreateLesson = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description } = formData;
        const trimmedTitle = title.trim();

        if (!trimmedTitle || !description) {
            alert("All fields are required");
            return;
        }
        try {
            await api.post(
                `/lessons`,
                {
                    title: trimmedTitle,
                    description,
                    section: id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate(-1);
        } catch (error) {
            console.log("Error :", error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-8 text-white">
                    <h1 className="text-3xl font-black">
                        Create New Lesson
                    </h1>

                    <p className="mt-2 text-slate-300">
                        Add a lesson to your section and build your course one step at a
                        time.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8 p-8">
                    {/* Lesson Title */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Lesson Title
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
                            placeholder="e.g. Installing Node.js"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

                    {/* Lesson Description */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Lesson Description
                        </label>

                        <textarea
                            rows={6}
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Describe what students will learn in this lesson..."
                            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />

                        <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3">
                            <p className="text-sm text-slate-500">
                                Write a short description explaining the lesson's objective and
                                what students should know after completing it.
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 border-t border-slate-200 pt-8">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="rounded-xl border cursor-pointer border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl cursor-pointer bg-emerald-500 px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
                        >
                            Create Lesson
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateLesson;