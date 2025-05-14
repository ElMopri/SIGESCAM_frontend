// src/components/User_components/UserCreateModal.jsx

import React, { useState } from "react";
import { registrar } from "../../api/UsuarioApi";
import "./UserCreateModal.css";

const UserCreateModal = ({ onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    email: "",
    telefono: "",
    rol: "admin",
  });

  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);
    try {
      await registrar(formData);
      onUserCreated(); // Notificar al componente padre
    } catch (err) {
      setError("Error al registrar usuario");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registrar nuevo usuario</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={formData.dni}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <select name="rol" value={formData.rol} onChange={handleChange}>
            <option value="">Rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Gestor de ventas">Gestor de ventas </option>
          </select>

          {error && <p className="modal-error">{error}</p>}
          <div className="modal-buttons">
            <button type="submit" disabled={cargando}>
              {cargando ? "Guardando..." : "Registrar"}
            </button>
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreateModal;
