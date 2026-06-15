import React from 'react'
import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/instructor/create-course");
  }
  return (
    <>
      <h1>Welcome, Akash 👋</h1>

      <button onClick={handleClick}>Create Course</button>

      
    </>
  )
}

export default InstructorDashboard 