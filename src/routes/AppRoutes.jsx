import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Inicio from "../pages/publica/Inicio";
import Login from "../pages/publica/Login";
=======
import Inicio from "../components/Inicio";
import Login from "../components/Login";
import RestablecerContraseña from "../components/RestablecerContraseña";
>>>>>>> 6ca99f62a376c4d30b01a4860a5211c22c50c5d1
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
      <Route
        path="/restablecerContraseña"
        element={<RestablecerContraseña />}
      />

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
