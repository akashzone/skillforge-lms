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

    const handleUpload = async (e,req,res) => {
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
            console.log("Success:", result.data);
            navigate(-1);
        } catch (error) {
            console.error("Upload error response:", error.response?.data || error.message);
        }
    };

    return (
        <div className="p-6 bg-white min-h-screen">
            <form onSubmit={handleUpload} className="max-w-xl mx-auto space-y-4 border p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold">Upload Lecture Video</h2>

                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        placeholder="Enter lecture title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 block w-full rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        placeholder="Enter lecture description"
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 block w-full rounded"
                        rows={4}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Video File</label>
                    <input
                        type="file"
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                const selectedFile = e.target.files[0];
                                console.log("SUCCESS! Binary file selected:", selectedFile.name, selectedFile.size);
                                setVideo(selectedFile);
                            }
                        }}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        required
                    />
                </div>

                <button
                    type='submit'
                    className="cursor-pointer w-full bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UploadLecture;