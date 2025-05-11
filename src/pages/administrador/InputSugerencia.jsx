import React, { useState } from "react";
import "./Sugerencias.css";

const InputSugerencia = ({ onAgregar }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const manejarAgregar = () => {
    if (nombre.trim() !== "" && descripcion.trim() !== "") {
      const nueva = {
        id: Date.now(),
        fecha: new Date().toLocaleDateString(),
        nombre,
        descripcion,
        estado: "pendiente",
      };
      onAgregar(nueva);
      setNombre("");
      setDescripcion("");
    }
  };

  return (
    <div className="input-sugerencia">
      <label>Producto Sugerido</label>
      <div className="input-agregar">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button onClick={manejarAgregar}>Agregar</button>
      </div>
    </div>
  );
};

export default InputSugerencia;
