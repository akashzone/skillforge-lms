import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from '../api/api';

const CourseCard = ({ id, title, price, category, thumbnail, onDelete, showActions }) => {
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
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden bg-slate-900">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-600">
            <span className="text-6xl font-black text-white">
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            {category}
          </span>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 right-4 rounded-xl bg-white/95 px-4 py-2 shadow-xl backdrop-blur">
          <span className="text-lg font-black text-emerald-600">
            ₹{price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="line-clamp-2 text-xl font-bold text-slate-900 transition group-hover:text-emerald-600">
          {title}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Instructor Course
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Professional Course
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
              className="cursor-pointer rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
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