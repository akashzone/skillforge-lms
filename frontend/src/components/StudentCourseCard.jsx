import React from 'react'
import { useNavigate } from 'react-router-dom';

const StudentCourseCard = ({
    title, category, price, id
    }) => {
    const navigate = useNavigate();
    const handleViewCourse = (courseId)=>{
        navigate(`/course/${courseId}`);
    }
    return (
        <>
            <div className="w-80 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition duration-300">

                {/* Image */}
                <img
                    src="pic1.jpeg"
                    alt={title}
                    className="w-full h-44 object-cover"
                />

                {/* Body */}
                <div className="p-4">

                    {/* Title */}
                    <h2 className="text-lg font-semibold line-clamp-2">
                        {title}
                    </h2>

                    {/* Instructor */}
                    <p className="text-sm text-gray-500 mt-1">
                        Piyush Garg
                    </p>

                    {/* Category */}
                    <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                        {category}
                    </span>

                    {/* Price */}
                    <div className="flex justify-between items-center mt-5">

                        <div className='flex justify-between items-center gap-2'>
                            <h3 className="text-2xl font-medium text-black">
                            ₹{price}
                        </h3>
                        <strike> ₹5999</strike>
                        </div>

                        <button 
                        onClick={() => handleViewCourse(id)}
                        className=" cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                            View
                        </button>

                    </div>

                </div>
            </div>
        </>
    )
}

export default StudentCourseCard