import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/publica/Inicio";
import Login from "../pages/publica/Login";
import RestablecerContraseña from "../pages/publica/RestablecerContraseña";
import AdminLayout from "../layouts/AdminLayout";
import GestorLayout from "../layouts/GestorLayout";
import InicioAdmin from "../pages/administrador/InicioAdmin";
import ProductosAdmin from "../pages/administrador/ProductosAdmin";
import Sugerencias from "../pages/administrador/Sugerencias";
import Ajustes from "../pages/administrador/Ajustes";
import InicioGestor from "../pages/gestorVentas/InicioGestor";
import ProductosGestor from "../pages/gestorVentas/ProductosGestor";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/restablecerContraseña"
        element={<RestablecerContraseña />}
      />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<InicioAdmin />} />
        <Route path="productos" element={<ProductosAdmin />} />
        <Route path="sugerencias" element={<Sugerencias />} />
        <Route path="Ajustes" element={<Ajustes />} />
      </Route>
      <Route path="/gestorDeVentas" element={<GestorLayout />}>
        <Route index element={<InicioGestor />} />
        <Route path="productos" element={<ProductosGestor />} />
      </Route>
      <Route path="*" element={<Inicio />} />
    </Routes>
  );
}
