import React, { useState, useEffect } from "react";
import "./CategoriasModal.css";
import EditarCategoriaModal from "./EditarCategoriaModal";
import iconEditar from "/EditYellow.png";
import iconDelete from "/Delete.png";
import Modal from "./Modal";

import {
  obtenerCategorias,
  crearCategoria,
  eliminarCategoria,
} from "../api/CategoriaApi";

const CategoriasModal = ({ onClose }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
    onConfirm: null,
    showButtons: false,
  });

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (err) {
        mostrarModal("Error", "Error al cargar las categorías.");
      }
    };

    cargarCategorias();
  }, []);

  const mostrarModal = (title, message, type = "error", showButtons = false, onConfirm = null) => {
    setModal({
      isOpen: true,
      title,
      message,
      type,
      showButtons,
      onConfirm,
    });
  };

  const cerrarModal = () => {
    setModal({ ...modal, isOpen: false, onConfirm: null });
  };

  const handleChange = (e) => {
    setNuevaCategoria({ ...nuevaCategoria, [e.target.name]: e.target.value });
  };

  const handleAgregar = async () => {
    const { nombre, descripcion } = nuevaCategoria;

    if (!nombre || !descripcion) {
      mostrarModal("Campos incompletos", "Nombre y descripción son obligatorios.");
      return;
    }

    try {
      const nueva = await crearCategoria(nombre, descripcion);
      setCategorias((prev) => [...prev, nueva]);
      setNuevaCategoria({ nombre: "", descripcion: "" });
    } catch (error) {
      mostrarModal("Error al crear", error.message || "No se pudo crear la categoría.");
    }
  };

  const confirmarEliminar = (id_categoria) => {
    mostrarModal(
      "¿Eliminar categoría?",
      "¿Deseas eliminar esta categoría?",
      "confirm",
      true,
      () => handleEliminar(id_categoria)
    );
  };

  const handleEliminar = async (id_categoria) => {
    try {
      await eliminarCategoria(id_categoria);
      setCategorias((prev) => prev.filter((cat) => cat.id_categoria !== id_categoria));
      cerrarModal();
    } catch (error) {
      mostrarModal("Error al eliminar", error.message || "No se pudo eliminar la categoría.");
    }
  };

  return (
    <div className="modal-categorias-overlay">
      <div className="modal-categorias">
        <div className="modal-header">
          <h2>Categorías</h2>
          <button className="btn-cerrar" onClick={onClose}>✕</button>
        </div>

        <div className="tabla-scroll">
          <table className="tabla-categorias">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat) => (
                <tr key={cat.id_categoria}>
                  <td>{cat.nombre}</td>
                  <td>{cat.descripcion}</td>
                  <td>
                    <button className="btn-accion editar" onClick={() => setCategoriaSeleccionada(cat)}>
                      <img src={iconEditar} alt="Editar" />
                    </button>
                    <button className="btn-accion eliminar" onClick={() => confirmarEliminar(cat.id_categoria)}>
                      <img src={iconDelete} alt="Eliminar" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="formulario-categoria">
          <h4>Nueva Categoría</h4>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevaCategoria.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={nuevaCategoria.descripcion}
            onChange={handleChange}
          />
          <button className="btn-guardar" onClick={handleAgregar}>
            Guardar
          </button>
        </div>
      </div>

      {categoriaSeleccionada && (
        <EditarCategoriaModal
          categoria={categoriaSeleccionada}
          onClose={() => setCategoriaSeleccionada(null)}
          onGuardar={(categoriaActualizada) => {
            setCategorias((prev) =>
              prev.map((cat) =>
                cat.id_categoria === categoriaActualizada.id_categoria
                  ? categoriaActualizada
                  : cat
              )
            );
            setCategoriaSeleccionada(null);
          }}
        />
      )}

      <Modal
        isOpen={modal.isOpen}
        onClose={cerrarModal}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default CategoriasModal;
