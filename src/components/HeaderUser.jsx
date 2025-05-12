import React, { useContext } from "react";
import { FaBell } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import "./HeaderUser.css";

const HeaderUser = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="header-user">
      <button className="notificacion-btn">
        <FaBell className="bell-icon" size={20} />
      </button>

      <div className="usuario-info">
        <div className="foto-usuario">
          <img
            src="/user.png"
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
