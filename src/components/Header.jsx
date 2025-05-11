import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ toggleMenu }) => {
  return (
    <header className="header">
        <div className="logo-container">
          <h1 className="titulo-inicio">Variedades Carmencita</h1>
        </div>
        <Link to="/login">
          <button className="boton-iniciar-sesion">Iniciar sesión</button>
        </Link>
      </header>
  );
};

export default Header;
