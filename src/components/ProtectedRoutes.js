import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = localStorage.getItem("isAuthenticated");

const ProtectedRoutes = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
