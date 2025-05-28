import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import "./HeaderUser.css";

const HeaderUser = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imagenUrl, setImagenUrl] = useState("/usericon.png");

  useEffect(() => {
    if (user?.url_imagen) {
      setImagenUrl(user.url_imagen);
    } else {
      setImagenUrl("/usericon.png");
    }
  }, [user]);

  const handleNotificationClick = () => {
    if (user?.rol === "Administrador") {
      navigate("/admin/notificaciones");
    } else if (user?.rol === "Gestor de ventas") {
      navigate("/gestorDeVentas/notificaciones");
    } else {
      console.warn("Rol no reconocido o no autenticado");
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/usericon.png";
  };

  return (
    <header className="header-user">
      <button className="notificacion-btn" onClick={handleNotificationClick}>
        <FaBell className="bell-icon" size={20} />
      </button>

      <div className="usuario-info">
        <div className="foto-usuario">
          <img
            src={imagenUrl}
            alt="Foto de usuario"
            className="imagen-usuario"
            onError={handleImageError}
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
