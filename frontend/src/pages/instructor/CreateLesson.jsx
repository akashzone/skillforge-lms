import React, { useState } from 'react'
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';
import { useNavigate, useParams } from "react-router-dom";

const CreateLesson = (req, res) => {
    const { token } = useAuth();
    const { id } = useParams();
    const sectionId = id;
    console.log("Section id :", sectionId)

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description } = formData;
        if (!title || !description) {
            alert("All fields are required");
            return;
        }
        try {
            const response = await api.post(
                `/lessons`,
                {
                    title,
                    description,
                    section: sectionId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            // console.log("Response :", response);
            // console.log("Create lesson Working !!")
            navigate(`/instructor/courses/${sectionId}`);
        }
        catch (error) {
            console.log("Error :", error.response.data);
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
            <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">

                <h1 className="text-3xl font-bold text-gray-900">
                    Create Lesson
                </h1>

                <p className="mt-2 text-gray-600">
                    Add a new lesson to this section.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                >
                    {/* Lesson Title */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
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
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Lesson Description
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
                            placeholder="Briefly describe what students will learn in this lesson..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Create Lesson
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default CreateLesson;