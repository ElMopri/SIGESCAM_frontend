import { FaEdit } from "react-icons/fa";
import "./TableElements.css";

const TableElements = ({ headers, data, onEdit }) => {
  return (
    <div className="table-container">
      <div className="table-title">Usuarios del sistema</div>
      <table className="styled-table">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td className="user-cell">
                <FaEdit className="edit-icon" onClick={() => onEdit(user)} />
                {user.nombre}
              </td>
              <td>{user.rol}</td>
              <td>{user.email}</td>
              <td>{user.telefono}</td>
              <td>
                <span className={`estado ${user.estado === "Habilitado" ? "habilitado" : "deshabilitado"}`}>
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
