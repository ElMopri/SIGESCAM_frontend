import { FaEdit, FaEye } from "react-icons/fa";
import "./TableElements.css";
import iconEditar from "../../../public/EditYellow.png";

const TableElements = ({ headers, data, onEdit, onView, onToggleStatus }) => {
  return (
    <div className="table-container">
      <div className="table-title">Usuarios del sistema</div>
      <table className="styled-table">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
            <th>Acciones</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td className="user-cell">
                <div className="user-name-container">
                  <button
                    onClick={() => onEdit(user)}
                    className="boton-icono editar"
                    aria-label="Editar usuario"
                  >
                    <img
                      src={iconEditar}
                      alt="Editar"
                      className="icono-accion"
                    />
                  </button>
                  <span className="user-name">{user.nombre}</span>
                </div>
              </td>
              <td>{user.rol}</td>

              <td className="action-cell">
                <div className="actions-container">
                  <FaEye
                    className="view-icon"
                    title="Ver detalles"
                    onClick={() => onView(user)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </td>

              <td>
                <span
                  className={`estado ${
                    user.estado === "Habilitado"
                      ? "habilitado"
                      : "deshabilitado"
                  }`}
                  onClick={() => onToggleStatus(user.dni, user.estado === "Habilitado" ? false : true)}
                  style={{ cursor: 'pointer' }}
                >
                  {user.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableElements;