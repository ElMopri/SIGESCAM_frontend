import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRotes";
import Inicio from "../pages/publica/Inicio";
import Login from "../pages/publica/Login";
import RestablecerContraseña from "../pages/publica/RestablecerContraseña";
import CrearContraseña from "../pages/publica/CrearContraseña";
import AdminLayout from "../layouts/AdminLayout";
import GestorLayout from "../layouts/GestorLayout";
import InicioAdmin from "../pages/administrador/InicioAdmin";
import ProductosAdmin from "../pages/administrador/ProductosAdmin";
import SugerenciasAdmin from "../pages/administrador/Sugerencias";
import AjustesAdmin from "../pages/administrador/AjustesAdmin";
import InicioGestor from "../pages/gestorVentas/InicioGestor";
import Usuarios from "../pages/administrador/Usuarios";
import ProductosGestor from "../pages/gestorVentas/ProductosGestor";
import Estadisticas from "../pages/administrador/Estadisticas";
import PorCobrarAdmin from "../pages/administrador/PorCobrarAdmin";
import PorCobrarGestor from "../pages/gestorVentas/PorCobrarGestor";
import SugerenciasGestor from "../pages/gestorVentas/SugerenciasGestor";
import RegistrarVentasGestor from "../pages/gestorVentas/RegistrarVentasGestor";
import AjustesGestor from "../pages/gestorVentas/AjustesGestor";
import NotificacionesAdmin from "../pages/administrador/Notificaciones";
import NotificacionesGestor from "../pages/gestorVentas/NotificacionesGestor";
import EstablecerContraseña from "../pages/publica/EstablecerContraseña";

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
      <Route
        path="/establecer-contraseña/:token"
        element={<EstablecerContraseña />}
      />

      {/* Rutas para Administrador */}
      <Route
        path="/admin"
        element={
          <ProtectedRoutes allowedRoles={["Administrador"]}>
            <AdminLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<InicioAdmin />} />
        <Route path="productos" element={<ProductosAdmin />} />
        <Route path="por-cobrar" element={<PorCobrarAdmin />} />
        <Route path="sugerencias" element={<SugerenciasAdmin />} />
        <Route path="estadisticas" element={<Estadisticas />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="ajustes" element={<AjustesAdmin />} />
        <Route path="notificaciones" element={<NotificacionesAdmin />} />
      </Route>

      {/* Rutas para Gestor de Ventas */}
      <Route
        path="/gestorDeVentas"
        element={
          <ProtectedRoutes allowedRoles={["Gestor de ventas"]}>
            <GestorLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<InicioGestor />} />
        <Route path="productos" element={<ProductosGestor />} />
        <Route path="por-cobrar" element={<PorCobrarGestor />} />
        <Route path="sugerencias" element={<SugerenciasGestor />} />
        <Route path="registar-venta" element={<RegistrarVentasGestor />} />
        <Route path="ajustes" element={<AjustesGestor />} />
        <Route path="notificaciones" element={<NotificacionesGestor />} />
      </Route>

      <Route path="*" element={<Inicio />} />
    </Routes>
  );
}
