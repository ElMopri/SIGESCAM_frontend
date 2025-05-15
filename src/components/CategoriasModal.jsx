import React, { useState, useEffect } from "react";
import "./CategoriasModal.css";
import EditarCategoriaModal from "./EditarCategoriaModal";
import iconEditar from "/EditYellow.png";
import iconDelete from "/Delete.png";

import {
  obtenerCategorias,
  crearCategoria,
  eliminarCategoria,
} from "../api/CategoriaApi"; // Asegúrate de que el nombre del archivo sea correcto

const CategoriasModal = ({ onClose }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  // Cargar categorías desde la API al montar el componente
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (err) {
        alert("Error al cargar las categorías.");
      }
    };

    cargarCategorias();
  }, []);

  const handleChange = (e) => {
    setNuevaCategoria({ ...nuevaCategoria, [e.target.name]: e.target.value });
  };

  const handleAgregar = async () => {
    const { nombre, descripcion } = nuevaCategoria;

    if (!nombre || !descripcion) {
      alert("Nombre y descripción requeridos.");
      return;
    }

    try {
      const nueva = await crearCategoria(nombre, descripcion);
      setCategorias((prev) => [...prev, nueva]);
      setNuevaCategoria({ nombre: "", descripcion: "" });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEliminar = async (id_categoria) => {
    if (confirm("¿Deseas eliminar esta categoría?")) {
      try {
        await eliminarCategoria(id_categoria);
        setCategorias((prev) => prev.filter((cat) => cat.id_categoria !== id_categoria));
      } catch (error) {
        alert(error.message);
      }
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
                    <button className="btn-accion eliminar" onClick={() => handleEliminar(cat.id_categoria)}>
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
                cat.nombre === categoriaActualizada.nombre
                  ? categoriaActualizada
                  : cat
              )
            );
            setCategoriaSeleccionada(null);
          }}
        />
      )}
    </div>
  );
};

export default CategoriasModal;
