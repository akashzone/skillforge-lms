import { Navigate, Outlet } from "react-router-dom";

const UnauthorizedRoute = () => {
const token = localStorage.getItem("token");

  return token ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
};

export default UnauthorizedRoute;