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
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-[400px] h-[150px] bg-white p-5 rounded-lg flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="text-lg font-semibold">
                Delete Course?
              </h3>

              <p className="text-gray-600 mt-2">
                Are you sure you want to delete this course?
              </p>
            </div>

            <div className="flex justify-between gap-2">
              <button
                onClick={handleDeleteCourse}
                className="w-1/2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-1/2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md rounded-xl border border-gray-200 bg-white p-3 shadow-md transition hover:shadow-lg">
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
            <button onClick={() => {
              setShowModal(true);
            }} className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-blue-700">
              Delete
            </button>
            <button onClick={handleViewCourse} className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
              View
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;