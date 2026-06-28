import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from '../api/api';

const CourseCard = ({ id, title, price, category, onDelete, showActions }) => {
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
    <>
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

        {/* Thumbnail */}
        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-600">
          <span className="text-6xl font-black text-white">
            {title.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">

          <span className="mb-4 w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            {category}
          </span>

          <h2 className="line-clamp-2 text-xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Instructor Course
          </p>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-black text-emerald-600">
              ₹{price}
            </span>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Published
            </span>
          </div>

          {showActions && (
            <div className="mt-8 flex gap-3">

              <button
                onClick={handleViewCourse}
                className="flex-1 cursor-pointer rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
              >
                View
              </button>

              <button
                onClick={handleEditCourse}
                className="flex-1 cursor-pointer rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                Edit
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="rounded-xl cursor-pointer border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Delete
              </button>

            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default CourseCard;