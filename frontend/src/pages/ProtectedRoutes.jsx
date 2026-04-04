import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  // not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // logged in
  return <Outlet />;
};

export default ProtectedRoutes;
