import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ id,title, price, category }) => {
  const navigate = useNavigate();
  function handleViewCourse(){
    navigate(`/instructor/courses/${id}`);
  }
  function handleEditCourse(){
    navigate(`/instructor/${id}/edit`);
  }
  return (
    <div className="max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg">
      <h2 className="mb-3 text-xl font-bold text-gray-800">
        {title}
      </h2>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {category}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">
          ₹{price}
        </span>
        <div className="flex items-center gap-3">
          <button onClick={handleEditCourse} className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          Edit
        </button>
        <button onClick={handleViewCourse} className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          View
        </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;