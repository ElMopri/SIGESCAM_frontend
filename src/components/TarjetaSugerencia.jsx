import React from "react";
import { FaCheckSquare, FaTrashAlt } from "react-icons/fa";

const TarjetaSugerencia = ({ sugerencia, onAceptar, onRechazar }) => {
  return (
    <div className="tarjeta-sugerencia">
      <div className="fecha">{sugerencia.fecha}</div>
      <p className="nombre"><strong>{sugerencia.nombre}</strong></p>
      <div className="contenido-scroll">
        <div className="contenido-limitado">
  <h3 className="titulo-producto">{sugerencia.nombre_producto}</h3>
  <hr className="linea-divisoria" />
  <p className="descripcion-producto">{sugerencia.descripcion}</p>
</div>
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
