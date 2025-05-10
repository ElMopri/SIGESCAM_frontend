import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/publica/Inicio";
import Login from "../pages/publica/Login";
import AdminLayout from "../layouts/AdminLayout";
import GestorLayout from "../layouts/GestorLayout";
import InicioAdmin from "../pages/administrador/InicioAdmin";
import Sugerencias from "../pages/administrador/Sugerencias";
import InicioGestor from "../pages/gestorVentas/InicioGestor";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<InicioAdmin />} />
        <Route path="sugerencias" element={<Sugerencias />} />
      </Route>
      <Route path="/gestorDeVentas" element={<GestorLayout />}>
        <Route index element={<InicioGestor />} />
      </Route>

      <Route path="*" element={<Inicio />} />
    </Routes>
  );
}
