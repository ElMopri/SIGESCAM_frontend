import React, { useState } from "react";
import "./FiltroModal.css";
import { FaTimes } from "react-icons/fa";

const FiltroModal = ({ categorias, onFiltrar, onClose }) => {
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");

  const manejarFiltrado = () => {
    onFiltrar({ cantidad, categoria, precio });
    onClose(); // Cierra el modal después de buscar
  };

  return (
    <div className="modal-filtro-overlay">
      <div className="modal-filtro">
        <FaTimes className="cerrar-icono" onClick={onClose} />
        <h3>Filtrar Productos</h3>

        <input
          type="number"
          placeholder="Cantidad"
          min="0"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Categorías</option>
          {categorias.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Precio"
          min="0"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <button className="btn-buscar-modal" onClick={manejarFiltrado}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default FiltroModal;
