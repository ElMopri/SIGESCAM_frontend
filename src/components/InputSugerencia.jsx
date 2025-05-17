import React, { useState } from "react";

const InputSugerencia = ({ onAgregar }) => {
  const [nombre_producto, setNombreProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const manejarAgregar = () => {
    if (nombre_producto.trim() !== "" && descripcion.trim() !== "") {
      const nueva = {
        nombre_producto,
        descripcion,
      };
      onAgregar(nueva);
      setNombreProducto("");
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
          value={nombre_producto}
          onChange={(e) => setNombreProducto(e.target.value)}
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
