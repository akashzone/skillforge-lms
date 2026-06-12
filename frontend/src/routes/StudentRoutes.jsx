import { Navigate, Outlet } from "react-router-dom";

const StudentRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user?.role === "student"
    ? <Outlet />
    : <Navigate to="/" replace />;
};

export default StudentRoute;