import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import "./MenuAdmin.css";

const MenuAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí podrías limpiar localStorage, tokens, etc. si los usas
    navigate("/"); 
  };

  return (
    <div className="admin-menu">
      <div className="admin-profile">
        <h2 className="nombre">Administrador</h2>
      </div>
      <nav className="menu">
        <Link to="/admin/inicio">
          <Button text="Inicio" />
        </Link>
        <Link to="/admin/productos">
          <Button text="Productos" />
        </Link>
        <Link to="/admin/por-cobrar">
          <Button text="Por Cobrar" />
        </Link>
        <Link to="/admin/sugerencias">
          <Button text="Sugerencias" />
        </Link>
        <Link to="/admin/estadisticas">
          <Button text="Estadísticas" />
        </Link>
        <Link to="/admin/usuarios">
          <Button text="Usuarios" />
        </Link>
        <Link to="/admin/ajustes">
          <Button text="Ajustes" />
        </Link>
      </nav>

      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default MenuAdmin;
