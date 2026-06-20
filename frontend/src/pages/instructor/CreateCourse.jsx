import React, { useState } from 'react'
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';
import { useNavigate } from "react-router-dom";

const CreateCourse = (req, res) => {
    const { token } = useAuth();
    // console.log("token :", token);

    const [formData, setFormData] = useState({
        title: " ",
        description: "",
        price: 999,
        category: "",
        level: "",
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, price, level, category } = formData;
        if (!price || !title || !level || !category || !description) {
            alert("All fields are required");
            return;
        }
        try {
            const response = await api.post(
                "/courses",
                {
                    title,
                    description,
                    price,
                    level,
                    category
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            console.log("Response :", response);
            console.log("Create Course Working !!")
            navigate("/instructor");
        }
        catch (error) {
            console.log("Error :", error.response.data);
        }
    }

    function handleCancel() {
        navigate("/instructor");
    }
    return (
        <div className="min-h-screen bg-slate-100 py-10 px-6">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white shadow-lg">

                {/* Header */}
                <div className="rounded-t-2xl bg-blue-600 px-8 py-6 text-white">
                    <h1 className="text-3xl font-bold">
                        Create New Course
                    </h1>

                    <p className="mt-2 text-blue-100">
                        Fill in the details below to publish your course.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-8"
                >

                    {/* Title */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
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
                            placeholder="e.g. Complete React Bootcamp"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
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
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Grid */}
                    <div className="grid gap-6 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block font-medium text-gray-700">
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-gray-700">
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
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                        <label className="mb-2 block font-medium text-gray-700">
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
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4">

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Create Course
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}


// Title
// Subtitle
// Description
// Category
// Level
// Price

export default CreateCourse;