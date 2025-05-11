import React from "react";
import { FaCheckSquare, FaTrashAlt } from "react-icons/fa";
import "./Sugerencias.css";

const TarjetaSugerencia = ({ sugerencia, onAceptar, onRechazar }) => {
  return (
    <div className="tarjeta-sugerencia">
      <div className="fecha">{sugerencia.fecha}</div>
      <p className="nombre"><strong>{sugerencia.nombre}</strong></p>
      <div className="contenido-scroll">
        <div className="contenido-limitado">{sugerencia.descripcion}</div>
      </div>
      <div className="acciones">
        {onAceptar && (
          <FaCheckSquare className="icono verde" title="Aceptar" onClick={onAceptar} />
        )}
        {onRechazar && (
          <FaTrashAlt className="icono rojo" title="Rechazar" onClick={onRechazar} />
        )}
      </div>
    </div>
  );
};

export default TarjetaSugerencia;
