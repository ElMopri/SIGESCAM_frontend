import React, { useState } from "react";
import MenuAdmin from "./MenuAdmin";
import { Outlet } from "react-router-dom";
import "./AdminLayout.css";
import { FaBars } from "react-icons/fa"; 

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="admin-layout">
      {/* Botón para abrir/cerrar el menú */}
      <button 
        className="toggle-menu-button"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <FaBars />
      </button>
      
      {/* Pasamos el estado isOpen a MenuAdmin */}
      <MenuAdmin isOpen={isOpen} />
      
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
