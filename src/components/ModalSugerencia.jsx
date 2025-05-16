import React from "react";
import { FaCheckSquare, FaTrashAlt, FaTimes } from "react-icons/fa";

const ModalSugerencia = ({ tipo, sugerencias, onCerrar, onMover }) => {
  const titulo = tipo === "aceptada" ? "Sugerencias Aceptadas" : "Sugerencias Rechazadas";
  const mensajeVacio = tipo === "aceptada"
    ? "No se encontraron sugerencias aceptadas."
    : "No se encontraron sugerencias rechazadas.";

  return (
    <div className="modal-sugerencias">
      <div className="modal-content">
        <FaTimes className="cerrar-icono" onClick={onCerrar} />
        <h2>{titulo}</h2>
        <div className="scroll-body">
          {sugerencias.length === 0 ? (
            <p className="mensaje-vacio">{mensajeVacio}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sugerencias.map((s) => (
                  <tr key={s.id}>
                    <td>{new Date(s.fecha_registro).toLocaleDateString()}</td>
                    <td>{s.nombre_producto}</td>
                    <td>{s.descripcion}</td>
                    <td className="col-icon">
                      <div className="icono" onClick={() => onMover(s.id_sugerencia)}>
                        {tipo === "aceptada" ? (
                          <FaTrashAlt className="rojo" />
                        ) : (
                          <FaCheckSquare className="verde" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalSugerencia;
