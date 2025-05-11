import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/publica/Inicio";
import Login from "../pages/publica/Login";
import RestablecerContraseña from "../pages/publica/RestablecerContraseña";
import AdminLayout from "../layouts/AdminLayout";
import GestorLayout from "../layouts/GestorLayout";
import InicioAdmin from "../pages/administrador/InicioAdmin";
import ProductosAdmin from "../pages/administrador/ProductosAdmin";
import SugerenciasAdmin from "../pages/administrador/Sugerencias";
import Ajustes from "../pages/administrador/Ajustes";
import InicioGestor from "../pages/gestorVentas/InicioGestor";
import Usuarios from "../pages/administrador/Usuarios";
import ProductosGestor from "../pages/gestorVentas/ProductosGestor";
import CrearContraseña from "../pages/publica/CrearContraseña";
import Estadisticas from "../pages/administrador/Estadisticas";
import PorCobrarAdmin from "../pages/administrador/PorCobrarAdmin";
import PorCobrarGestor from "../pages/gestorVentas/PorCobrarGestor";
import SugerenciasGestor from "../pages/gestorVentas/SugerenciasGestor";
import RegistrarVentasGestor from "../pages/gestorVentas/RegistrarVentasGestor";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/restablecerContraseña"
        element={<RestablecerContraseña />}
      />
      <Route path="/crearContraseña" element={<CrearContraseña />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<InicioAdmin />} />
        <Route path="productos" element={<ProductosAdmin />} />
        <Route path="por-cobrar" element={<PorCobrarAdmin />} />
        <Route path="sugerencias" element={<SugerenciasAdmin />} />
        <Route path="estadisticas" element={<Estadisticas />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="ajustes" element={<Ajustes />} />
      </Route>
      <Route path="/gestorDeVentas" element={<GestorLayout />}>
        <Route index element={<InicioGestor />} />
        <Route path="productos" element={<ProductosGestor />} />
        <Route path="por-cobrar" element={<PorCobrarGestor />} />
        <Route path="sugerencias" element={<SugerenciasGestor />} />
        <Route path="registar-venta" element={<RegistrarVentasGestor />} />
      </Route>
      <Route path="*" element={<Inicio />} />
    </Routes>
  );
}
