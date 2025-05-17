// src/components/User_components/UserCreateModal.jsx

import React, { useState } from "react";
import { registrar } from "../../api/UsuarioApi";
import Modal from "../Modal";
import "./UserCreateModal.css";

const UserCreateModal = ({ onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    email: "",
    telefono: "",
    rol: "",
  });

  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.rol) {
      setError("Por favor, seleccione un rol para el usuario");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setCargando(true);
    setError(null);
    try {
      await registrar(formData);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        onUserCreated();
      }, 1500);
    } catch (err) {
      // Manejo específico de errores
      if (err.message.toLowerCase().includes('dni') && err.message.toLowerCase().includes('existe')) {
        setError("El DNI ingresado ya está registrado en el sistema");
      } else if (err.message.toLowerCase().includes('correo') || err.message.toLowerCase().includes('email')) {
        setError("El correo electrónico ingresado ya está en uso");
      } else {
        setError(err.message || "Error al registrar usuario");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Registrar nuevo usuario</h2>
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <input
                type="text"
                name="dni"
                placeholder="DNI"
                value={formData.dni}
                onChange={handleChange}
                className={error?.includes('DNI') ? 'error' : ''}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="nombre"
                placeholder="Nombres"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className={error?.includes('correo') ? 'error' : ''}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <select 
                name="rol" 
                value={formData.rol} 
                onChange={handleChange}
                className={error && !formData.rol ? "error" : ""}
              >
                <option value="">Seleccione un rol</option>
                <option value="Administrador">Administrador</option>
                <option value="Gestor de ventas">Gestor de ventas</option>
              </select>
            </div>

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

      {/* Modal de éxito */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="¡Éxito!"
        message="Usuario registrado correctamente"
        type="success"
      />
    </>
  );
};

export default UserCreateModal;
