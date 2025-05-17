import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./FiltroUsuariosModal.css";

const FiltroUsuariosModal = ({ onFiltrar, onClose }) => {
  const [rol, setRol] = useState("");
  const [estado, setEstado] = useState("");

  const manejarFiltrado = () => {
    onFiltrar({ rol, estado });
    onClose();
  };

  return (
    <div className="modal-filtro-overlay">
      <div className="modal-filtro">
        <FaTimes className="cerrar-icono" onClick={onClose} />
        <h3>Filtrar Usuarios</h3>

        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="filtro-select"
        >
          <option value="">Todos los roles</option>
          <option value="Administrador">Administrador</option>
          <option value="Gestor de ventas">Gestor de ventas</option>
        </select>

        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="filtro-select"
        >
          <option value="">Todos los estados</option>
          <option value="Habilitado">Habilitado</option>
          <option value="Deshabilitado">Deshabilitado</option>
        </select>

        <button className="btn-buscar-modal" onClick={manejarFiltrado}>
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default FiltroUsuariosModal; 