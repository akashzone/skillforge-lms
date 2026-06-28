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
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-12 px-6">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-white">
                    <h1 className="text-3xl font-bold">Create New Lesson</h1>
                    <p className="mt-2 text-blue-100">
                        Add a lesson to your section and help students learn step by step.
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
                                setFormData({ ...formData, title: e.target.value })
                            }
                            placeholder="e.g. Installing Node.js"
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
                            placeholder="Briefly describe what students will learn in this lesson..."
                            className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-4 border-t border-slate-200 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="rounded-xl  cursor-pointer border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-[0.98]"
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