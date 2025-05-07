import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./MenuGestor.css";

const MenuGestor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="gestor-menu">
      <div className="gestor-profile">
        <h2 className="nombre">Gestor de Ventas</h2>
      </div>
      <nav className="menu">
        <Link to="/gestorDeVentas/inicio">
          <Button text="Inicio" />
        </Link>
        <Link to="/gestorDeVentas/ventas">
          <Button text="Ventas" />
        </Link>
        <Link to="/gestorDeVentas/devoluciones">
          <Button text="Devoluciones" />
        </Link>
        <Link to="/gestorDeVentas/clientes">
          <Button text="Clientes" />
        </Link>
        <Link to="/gestorDeVentas/estadisticas">
          <Button text="Estadísticas" />
        </Link>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default MenuGestor;
