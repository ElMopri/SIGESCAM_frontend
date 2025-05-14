import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoutes;
