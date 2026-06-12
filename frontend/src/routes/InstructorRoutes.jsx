import { Navigate, Outlet } from "react-router-dom";

const InstructorRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user?.role === "instructor"
    ? <Outlet />
    : <Navigate to="/" replace />;
};

export default InstructorRoute;