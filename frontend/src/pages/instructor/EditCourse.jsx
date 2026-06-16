import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"

const EditCourse = () => {
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 999,
        category: "",
        level: ""
    })
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const { id } = useParams();
    useEffect(() => {
        fetchCourse();
    }, [token])
    const fetchCourse = async () => {
        try {
            const res = await api.get(`/courses/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log("Response :", res.data.courses)
            setFormData({
                title: res.data.courses.title,
                description: res.data.courses.description,
                price: res.data.courses.price,
                category: res.data.courses.category,
                level: res.data.courses.level
            })
            setCourse(res.data.courses);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-xl font-semibold text-gray-600">
                    Loading course editing form...
                </h1>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Token :", token)
        try {
            const updateCourse = await api.put(`/courses/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log("Response :", updateCourse);
            console.log(" Course updated route Working !!")
            navigate("/instructor");
            console.log("Submitted!")
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <h2> -- Edit Course Page --</h2>
            <div className="edit-form">
                {!course ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                        <h2 className="mb-2 text-xl font-semibold text-gray-700">
                            No Courses Found
                        </h2>
                        <p className="text-gray-500">
                            Create your first course to get started.
                        </p>
                    </div>
                ) :
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
                            value={formData.category}
                            placeholder='eg. Web Development'
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })}
                        />
                        <button type='submit'>Create</button>
                    </form>}
            </div>
        </>
    )
}

export default EditCourse