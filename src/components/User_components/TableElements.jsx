import { FaEdit, FaEye } from "react-icons/fa";
import "./TableElements.css";

const TableElements = ({ headers, data, onEdit, onView }) => {
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td className="user-cell">
                <FaEdit
                  className="edit-icon"
                  title="Editar"
                  onClick={() => onEdit(user)}
                />
                {user.nombre}
              </td>
              <td>{user.rol}</td>
            
              <td className="action-cell">
                <FaEye
                  className="view-icon"
                  title="Ver más"
                  onClick={() => onView(user)}
                  style={{ cursor: "pointer" }}
                />
              </td>

              <td>
                <span
                  className={`estado ${
                    user.estado === "Habilitado"
                      ? "habilitado"
                      : "deshabilitado"
                  }`}
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
