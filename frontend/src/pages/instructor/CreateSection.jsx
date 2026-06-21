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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
            <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900">Create Section</h1>
                <p className="mt-2 text-gray-600">Add a new section to organize your course content.</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Section Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Introduction"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Section Order</label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                            placeholder="1"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(`/instructor/courses/${id}`)}
                            className="rounded-lg border px-5 py-3 font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
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