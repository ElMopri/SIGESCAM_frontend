import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import "./HeaderUser.css";

const HeaderUser = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    if (user?.rol === "Administrador") {
      navigate("/admin/notificaciones");
    } else if (user?.rol === "Gestor de ventas") {
      navigate("/gestorDeVentas/notificaciones");
    } else {
      console.warn("Rol no reconocido o no autenticado");
    }
  };

  return (
    <header className="header-user">
      <button className="notificacion-btn" onClick={handleNotificationClick}>
        <FaBell className="bell-icon" size={20} />
      </button>

      <div className="usuario-info">
        <div className="foto-usuario">
          <img
            src="https://randomuser.me/api/portraits/women/65.jpg"
            alt="Foto de usuario"
            className="imagen-usuario"
          />
        </div>
        <span className="nombre-usuario">
          {user?.nombre ? `${user.nombre}` : "Usuario no encontrado"}
        </span>
      </div>
    </header>
  );
};

export default HeaderUser;
