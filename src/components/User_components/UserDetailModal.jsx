import React from "react";
import { FaTimes } from "react-icons/fa";
import "./UserDetailModal.css";

const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className="cerrar-icono" onClick={onClose} />
        <h2>Detalles del Usuario</h2>
        
        <div className="user-details">
          <div className="profile-image">
            <img
              src={user.url_imagen || "/usericon.png"}
              alt="Foto de perfil"
              className="user-profile-pic"
              onError={(e) => { e.target.onerror = null; e.target.src = "/usericon.png"; }}
            />
          </div>
          <div className="detail-group">
            <label>DNI:</label>
            <span>{user.dni}</span>
          </div>
          <div className="detail-group">
            <label>Nombre:</label>
            <span>{user.nombre}</span>
          </div>
          <div className="detail-group">
            <label>Rol:</label>
            <span>{user.id_rol}</span>
          </div>
          <div className="detail-group">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className="detail-group">
            <label>Teléfono:</label>
            <span>{user.telefono}</span>
          </div>
          <div className="detail-group">
            <label>Estado:</label>
            <span className={user.estado ? "estado-activo" : "estado-inactivo"}>
              {user.estado ? "Habilitado" : "Deshabilitado"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
