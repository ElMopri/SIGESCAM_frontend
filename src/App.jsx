import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Inicio from "./components/Inicio";
import Login from "./components/Login";
import AdminLayout from "./components/administrador/AdminLayout";
import GestorLayout from "./components/gestorVentas/GestorLayout";
import InicioAdmin from "./components/administrador/pages/InicioAdmin";
import Sugerencias from "./components/administrador/pages/Sugerencias";
import InicioGestor from "./components/gestorVentas/pages/InicioGestor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas para Administración */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<InicioAdmin />} />
          <Route path="sugerencias" element={<Sugerencias />} />

        </Route>

        {/* Rutas para Gestores de ventas */}
        <Route path="/gestorDeVentas" element={<GestorLayout />}>
          <Route index element={<InicioGestor />} />
        </Route>

        {/* Redirección si no se encuentra la ruta */}
        <Route path="*" element={<Inicio />} />
      </Routes>
    </Router>
  );
}

export default App;
