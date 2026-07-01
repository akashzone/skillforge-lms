import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useAuth } from "../../context/AuthContext";

const UploadLecture = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState(null);
    const { token } = useAuth();

    const handleUpload = async (e, req, res) => {
        e.preventDefault();

        console.log("Hii, working!")
        if (!video) {
            alert("Please select a video file first!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("lecture", video);
        formData.append("lessonId", id);

        // console.log("formData title:", formData.get("title"));

        try {
            const result = await api.post(
                "/uploads",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    },
                }
            );
            // console.log("Success:", result.data);
            navigate(-1);
        } catch (error) {
            console.error("Upload error response:", error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-8 text-white">
                    <h1 className="text-3xl font-black">
                        Upload Lecture Video
                    </h1>

                    <p className="mt-2 text-slate-300">
                        Upload your lecture and provide the details students will see.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleUpload} className="space-y-8 p-8">
                    {/* Title */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Lecture Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            placeholder="e.g. Introduction to React Components"
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            value={description}
                            placeholder="Describe what students will learn in this lecture..."
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            required
                        />
                    </div>

                    {/* Upload */}
                    <div>
                        <label className="mb-3 block text-sm font-semibold text-slate-700">
                            Lecture Video
                        </label>

                        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-emerald-400 hover:bg-emerald-50">
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        const selectedFile = e.target.files[0];
                                        // console.log(
                                        //     "SUCCESS! Binary file selected:",
                                        //     selectedFile.name,
                                        //     selectedFile.size
                                        // );
                                        setVideo(selectedFile);
                                    }
                                }}
                                className="block w-full cursor-pointer text-sm text-slate-600
                file:mr-4
                file:rounded-xl
                file:border-0
                file:bg-emerald-500
                file:px-5
                file:py-3
                file:font-semibold
                file:text-white
                file:transition
                hover:file:bg-emerald-600"
                                required
                            />

                            <p className="mt-4 text-sm text-slate-500">
                                Upload MP4, MOV, AVI or WebM files.
                            </p>

                            {video && (
                                <div className="mt-5 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-700">
                                    ✓ {video.name}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
                        <button
                            type="button"
                            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
                        >
                            Upload Lecture
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadLecture;