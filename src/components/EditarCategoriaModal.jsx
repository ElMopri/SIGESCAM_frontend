import React, { useState } from "react";
import "./EditarCategoriaModal.css";
import { actualizarCategoria } from "../api/CategoriaApi";


const EditarCategoriaModal = ({ categoria, onClose, onGuardar }) => {
    const [formData, setFormData] = useState({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (formData.nombre.trim() && formData.descripcion.trim()) {
            try {
                const categoriaActualizada = await actualizarCategoria(
                    categoria.id_categoria,        // ← clave primaria
                    formData.nombre,
                    formData.descripcion
                );
                onGuardar(categoriaActualizada);
                onClose();
            } catch (error) {
                alert(error.message);
            }
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
