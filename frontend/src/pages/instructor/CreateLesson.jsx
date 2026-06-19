import React, { useState } from 'react'
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';
import { useNavigate, useParams } from "react-router-dom";

const CreateLesson = (req, res) => {
    const { token } = useAuth();
    const { id } = useParams();
    const sectionId = id;
    console.log("Section id :",sectionId )

    const [formData, setFormData] = useState({
        title: "",
        description : ""
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
            console.log("Response :", response);
            console.log("Create lesson Working !!")
            navigate(`/instructor/courses`);
        }
        catch (error) {
            console.log("Error :", error.response.data);
        }
    }
    return (
        <>
            <div className="create-lesson">
                <form className='flex flex-col gap-4 mt-4 *:bg-gray-100 p-4 rounded-lg shadow-md' onSubmit={handleSubmit}>                    Title
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                title: e.target.value,
                            })
                        }
                        placeholder='Enter title..?'
                    />
                    <input
                        type="text"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        placeholder='Enter description..?'
                    />
                    
                    <button type='submit'>Create</button>
                </form>
            </div>
        </>
    )
}

export default CreateLesson;