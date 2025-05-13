import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RutaProtegida = ({ rolRequerido }) => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (role !== rolRequerido) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default RutaProtegida;
