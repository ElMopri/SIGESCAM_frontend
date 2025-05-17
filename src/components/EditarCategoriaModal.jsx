import React, { useState } from "react";
import "./EditarCategoriaModal.css";
import { actualizarCategoria } from "../api/CategoriaApi";
import Modal from "./Modal"

const EditarCategoriaModal = ({ categoria, onClose, onGuardar }) => {
    const [formData, setFormData] = useState({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
    });

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: "",
        message: "",
        type: "error",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.nombre.trim() || !formData.descripcion.trim()) {
            setModalConfig({
                isOpen: true,
                title: "Campos vacíos",
                message: "Debe ingresar nombre y descripción.",
                type: "error",
            });
            return;
        }

        try {
            const categoriaActualizada = await actualizarCategoria(
                categoria.id_categoria,
                formData.nombre,
                formData.descripcion
            );
            onGuardar(categoriaActualizada);
            onClose();
        } catch (error) {
            setModalConfig({
                isOpen: true,
                title: "Error al actualizar",
                message: error.message || "No se pudo actualizar la categoría.",
                type: "error",
            });
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

                <label>Descripción</label>
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

            <Modal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
            />
        </div>
    );
};

export default EditarCategoriaModal;
