import React from "react";

const CourseCard = ({ title, price, category }) => {
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

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          View Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;