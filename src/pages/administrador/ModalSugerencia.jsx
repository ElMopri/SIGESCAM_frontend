import React from "react";
import { FaCheckSquare, FaTrashAlt, FaTimes } from "react-icons/fa";
import "./ModalSugerencia.css";

const ModalSugerencia = ({ tipo, sugerencias, onCerrar, onMover }) => {
  return (
    <div className="modal-sugerencias">
      <div className="modal-content">
        <FaTimes className="cerrar-icono" onClick={onCerrar} />
        <h2>{tipo === "aceptada" ? "Sugerencias Aceptadas" : "Sugerencias Rechazadas"}</h2>
        <div className="scroll-body">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Cambiar estado</th>
              </tr>
            </thead>
            <tbody>
              {sugerencias.map((s) => (
                <tr key={s.id_sugerencia}>
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
              {sugerencias.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No hay sugerencias {tipo}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModalSugerencia;
