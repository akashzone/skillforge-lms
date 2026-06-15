import React, { useState } from 'react'
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';

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
                    Description
                    <input
                        type='text'
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })}
                        placeholder='Enter description..?'
                    />
                    Price
                    <input
                        type='number'
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })}
                        placeholder='Enter price..?'
                    />
                    Level
                    <select value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })}>
                        <option value="" >Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    Category
                    <input
                        type="text"
                        placeholder='eg. Web Development'
                        onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })}
                    />
                    <button type='submit'>Create</button>
                </form>
            </div>
        </>
    )
}


// Title
// Subtitle
// Description
// Category
// Level
// Price

export default CreateCourse;