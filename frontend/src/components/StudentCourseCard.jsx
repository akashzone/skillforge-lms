import React from 'react'
import { useNavigate } from 'react-router-dom';

const StudentCourseCard = ({
    title, category, price, id, thumbnail,instructor
}) => {
    const navigate = useNavigate();
    const handleViewCourse = (courseId) => {
        navigate(`/student/course/${courseId}`);
    }
    return (
        <>
            <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Category */}
                    <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
                        {category}
                    </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                    {/* Instructor */}
                    {
                        instructor ? <p className="mb-2 text-sm font-medium text-slate-500">
                           By {
                                instructor
                            }
                    </p> : <p className="mb-2 text-sm font-medium text-slate-500">
                        By Instructor
                    </p>
                    }

                    {/* Title */}
                    <h2 className="line-clamp-2 min-h-[64px] text-2xl font-bold text-slate-900">
                        {title}
                    </h2>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-2">
                        <span className="text-sm font-semibold text-amber-500">
                            ★★★★★
                        </span>

                        <span className="text-sm text-slate-500">
                            (4.8)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="mt-6 flex items-end gap-3">
                        <span className="text-3xl font-black text-emerald-600">
                            ₹{price}
                        </span>

                        {/* <span className="text-lg text-slate-400 line-through">
                            ₹5999
                        </span> */}

                        <span className="ml-auto rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                            Save {Math.round(((5999 - price) / 5999) * 100)}%
                        </span>
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => handleViewCourse(id)}
                        className="mt-8 w-full cursor-pointer rounded-xl bg-emerald-500 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
                    >
                        View Course →
                    </button>
                </div>
            </div>
        </>
    );
}

export default StudentCourseCard