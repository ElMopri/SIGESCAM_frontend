import React, { useState } from "react";
import "./EditarCategoriaModal.css";

const EditarCategoriaModal = ({ categoria, onClose, onGuardar }) => {
  const [formData, setFormData] = useState({
    nombre: categoria.nombre,
    descripcion: categoria.descripcion,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.nombre.trim() && formData.descripcion.trim()) {
      onGuardar({ ...categoria, ...formData });
      onClose();
    }
  };

  return (
    <div className="modal-editar-overlay">
      <div className="modal-editar">
        <button className="btn-cerrar" onClick={onClose}>✕</button>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />

        <label>Descripcion</label>
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />

        <button className="btn-guardar" onClick={handleSubmit}>
          Editar
        </button>
      </div>
    </div>
  );
};

export default EditarCategoriaModal;
