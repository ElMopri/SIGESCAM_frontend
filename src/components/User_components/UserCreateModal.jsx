// src/components/User_components/UserCreateModal.jsx

import React, { useState } from "react";
import { registrar } from "../../api/UsuarioApi";
import "./UserCreateModal.css";

const UserCreateModal = ({ onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    dni: "",
    nombres: "",
    correo: "",
    contrasena: "",
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
            name="nombres"
            placeholder="Nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
          <select name="rol" value={formData.rol} onChange={handleChange}>
            <option value="admin">Administrador</option>
            <option value="gestor">Gestor</option>
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
