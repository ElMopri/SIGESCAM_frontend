import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { IoLogOut } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import Modal from "./Modal";

const Menu = ({ menuItems, role, isOpen, setIsOpen }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "Cerrar Sesión",
    message: "¿Está seguro que desea cerrar sesión?",
    type: "confirm"
  });

  const cerrarSesion = () => {
    setModalConfig({
      ...modalConfig,
      isOpen: true
    });
  };

  const confirmarCierreSesion = () => {
    logout();
    navigate("/");
    setModalConfig({
      ...modalConfig,
      isOpen: false
    });
  };

  const cancelarCierreSesion = () => {
    setModalConfig({
      ...modalConfig,
      isOpen: false
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={menuRef}
      className={`menu-container ${isOpen ? "open" : "closed"}`}
    >
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={cancelarCierreSesion}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={confirmarCierreSesion}
        confirmText="Salir"
        cancelText="Cancelar"
      />
      <div className={`${role}-menu`}>
        <div className={`${role}-profile`}>
          <img src="/logo.png" alt="Logo" className="menu-logo" />
        </div>
        <nav className="menu">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.text}
              onClick={() => setIsOpen(false)} // Cierra al hacer clic en opción
            >
              <Button text={item.text} icon={item.icon} />
            </Link>
          ))}
        </nav>
        <br />
        <button className="logout-button" onClick={cerrarSesion}>
          <span>Salir </span>
          <IoLogOut className="salir-button" />
        </button>
      </div>
    </div>
  );
};

export default Menu;
