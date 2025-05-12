import React from "react";
import "./TablaProductos.css";

const TablaProductos = ({ columnas, datos }) => {
  return (
    <table className="tabla-productos">
      <thead>
        <tr>
          {columnas.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datos.map((item, idx) => (
          <tr key={idx}>
            {columnas.map((col) => (
              <td key={col.key}>
                {col.render ? col.render(item) : item[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaProductos;
