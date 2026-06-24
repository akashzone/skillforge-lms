import React, { useEffect, useState } from 'react'
import CourseCard from '../../components/CourseCard'
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
    const { token } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleDelete = async (id) => {
        const res = await api.delete(`/courses/${id}`,{
            headers: {
                        Authorization: `Bearer ${token}`,
                    },
        });
        console.log("Response :", res);
        setCourses(
            courses.filter(course => course._id !== id)
        );
    };
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get("/courses/instructor/my-courses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Response :", res.data.courses)
                setCourses(res.data.courses);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (token) {
            fetchCourses();
        }
    }, []);
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-xl font-semibold text-gray-600">
                    Loading courses...
                </h1>
            </div>
        );
    }
    return (<div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    My Courses
                </h1>

                <span className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                    {courses.length} Courses
                </span>
            </div>

            {courses.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                    <h2 className="mb-2 text-xl font-semibold text-gray-700">
                        No Courses Found
                    </h2>
                    <p className="text-gray-500">
                        Create your first course to get started.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <CourseCard
                            key={course._id}
                            id={course._id}
                            title={course.title}
                            price={course.price}
                            category={course.category}
                            description={course.description}
                            level={course.level}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
    );
};

export default MyCourses