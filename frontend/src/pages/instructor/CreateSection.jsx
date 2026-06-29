import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';
import { useNavigate, useParams } from "react-router-dom";

const CreateSection = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        order: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, order } = formData;
        const trimmedTitle = title.trim();

        if (!trimmedTitle || !order) {
            alert("All fields are required");
            return;
        }
        try {
            await api.post(
                `/sections`,
                {
                    title: trimmedTitle,
                    order,
                    course: id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate(`/instructor/courses/${id}`);
        } catch (error) {
            console.log("Error :", error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-8 text-white">
                    <h1 className="text-3xl font-black">
                        Create New Section
                    </h1>

                    <p className="mt-2 text-slate-300">
                        Organize your course into meaningful sections to improve the learning
                        experience.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8 p-8">
                    {/* Section Title */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Section Title
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
                            placeholder="e.g. Getting Started"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

                    {/* Section Order */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Display Order
                        </label>

                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    order: e.target.value,
                                })
                            }
                            placeholder="1"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />

                        <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3">
                            <p className="text-sm text-slate-500">
                                Lower numbers appear first. For example, a section with order{" "}
                                <span className="font-semibold text-slate-700">1</span> will be
                                displayed before a section with order{" "}
                                <span className="font-semibold text-slate-700">2</span>.
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 border-t border-slate-200 pt-8">
                        <button
                            type="button"
                            onClick={() => navigate(`/instructor/courses/${id}`)}
                            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
                        >
                            Create Section
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSection;