import React, { useEffect, useState } from 'react'
import CourseCard from '../../components/CourseCard'
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
    const { token } = useAuth();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get("/courses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Response :", res.data.courses)
                setCourses(res.data.courses);
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchCourses();
        }
    }, [token]);
    return (
        <div>
            <h1>My Courses</h1>

            {
                courses?.map((course) => {
                    return <CourseCard key={course._id}
                        title={course.title}
                        price={course.price}
                        description={course.description}
                        category={course.category}
                        level={course.level}
                    ></CourseCard>
                })
            }
            <CourseCard
                title="Advanced JavaScript Essentials"
                price={899}
                description="Master modern JavaScript concepts including closures, prototypes, async programming, event loop, ES6+ features, and performance optimization."
                category="Programming"
                level="Advanced"
            ></CourseCard>
        </div >
    )
}

export default MyCourses