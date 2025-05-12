import React, { useState } from "react";
import MenuGestor from "./MenuGestor";
import { Outlet } from "react-router-dom";
import "./GestorLayout.css";
import { FaBars } from "react-icons/fa";
import HeaderUser from "../components/HeaderUser";

const GestorLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="gestor-layout">
      {/* Botón para abrir/cerrar el menú */}
      <button
        className="toggle-menu-button"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <FaBars />
      </button>

      {/* Pasamos el estado isOpen a MenuGestor */}
      <MenuGestor isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="gestor-content">
        <HeaderUser nombre="Gestor" />
        <Outlet />
      </main>
    </div>
  );
};

export default GestorLayout;
