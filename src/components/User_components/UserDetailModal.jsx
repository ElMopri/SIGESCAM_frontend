import React from "react";
import "./UserDetailModal.css";

const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalles del Usuario</h2>
        <div className="user-details">
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
        <div className="modal-footer">
          <button onClick={onClose} className="btn-cerrar">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
