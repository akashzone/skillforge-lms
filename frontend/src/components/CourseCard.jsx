import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from '../api/api';

const CourseCard = ({ id, title, price, category, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  function handleViewCourse() {
    navigate(`/instructor/courses/${id}`);
  }
  function handleEditCourse() {
    navigate(`/instructor/${id}/edit`);
  }
  async function handleDeleteCourse() {
    try {
      setShowModal(false);
      onDelete(id);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <><div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Thumbnail Placeholder */}
      <div className="flex h-44 items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500">
        <span className="text-5xl font-bold text-white">
          {title.charAt(0).toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">

        <span className="mb-3 w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          {category}
        </span>

        <h2 className="line-clamp-2 text-xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Instructor Course
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ₹{price}
          </span>

          <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            Published
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-2">

          <button
            onClick={handleViewCourse}
            className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View
          </button>

          <button
            onClick={handleEditCourse}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Edit
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
    </>
  );
};

export default CourseCard;