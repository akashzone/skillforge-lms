import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from '../api/api';

const CourseCard = ({ id, title, price, category, thumbnail, onDelete, tutor, showActions }) => {
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
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all">
            <h3 className="text-lg font-bold text-slate-900">Delete Course</h3>
            <p className="mt-2 text-sm text-slate-500">
              Are you sure you want to delete this course? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl cursor-pointer border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCourse}
                className="rounded-xl cursor-pointer bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 shadow-lg shadow-red-600/20"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        {/* Thumbnail */}
        <div className="relative h-56 overflow-hidden bg-slate-900">
          {thumbnail && thumbnail !== "Hiii" && (thumbnail.startsWith("http") || thumbnail.startsWith("/")) ? (
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              // Fix: If the image URL fails, hide the broken image element or use a fallback image
              onError={(e) => {
                e.target.style.display = 'none';
                const sibling = e.target.nextSibling;
                if (sibling) sibling.style.display = 'flex';
              }}
            />
          ) : null}

          <div 
            className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-600"
            style={(!thumbnail || thumbnail === "Hiii" || (!thumbnail.startsWith("http") && !thumbnail.startsWith("/"))) ? { display: "flex" } : {}}
          >
            <span className="text-6xl font-black text-white">
              {title ? title.charAt(0).toUpperCase() : "C"}
            </span>
          </div>

        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h2 className="line-clamp-2 text-xl font-bold text-slate-900 transition group-hover:text-emerald-600">
            {title}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Professional Course
          </p>

          {/* Changed mt-5 to mt-auto to push this section to the bottom */}
          <div className="mt-auto pt-5 flex items-center justify-between">
            {tutor ? (
              <span className="text-sm text-slate-500">{tutor}</span>
            ) : (
              <span className="text-sm text-slate-500">Piyush Garg</span>
            )}

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