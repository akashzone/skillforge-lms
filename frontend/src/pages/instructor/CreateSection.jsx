import React, { useState } from 'react'
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';
import { useNavigate, useParams } from "react-router-dom";

const CreateCourse = (req, res) => {
    const { token } = useAuth();
    const { id } = useParams();
    // console.log("token :", token);

    const [formData, setFormData] = useState({
        title: " ",
        order: 1234
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title,order } = formData;
        if (!title || !order) {
            alert("All fields are required");
            return;
        }
        try {
            const response = await api.post(
                `/sections`,
                {
                    title,
                    order,
                    course: id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            console.log("Response :", response);
            console.log("Create section Working !!")
            navigate(`/instructor/courses/${id}`);
        }
        catch (error) {
            console.log("Error :", error.response.data);
        }
    }

    return (
        <>
            <div className="create-course">
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
                    Price
                    <input
                        type='number'
                        value={formData.order}
                        onChange={(e) =>
                            setFormData({ ...formData, order: e.target.value })}
                        placeholder='Enter order number..?'
                    />
                    <button type='submit'>Create</button>
                </form>
            </div>
        </>
    )
}

export default CreateCourse;