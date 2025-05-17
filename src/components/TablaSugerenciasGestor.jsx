import React from "react";
import "./TabsSugerencia.jsx"

 // Retorna el estado, con mayúscula la primera letra
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const TablaSugerenciasGestor = ({ sugerencias }) => {
  // Función para mostrar el estado con el color correspondiente
  const renderEstado = (estado) => {
    let className = ""

    switch (estado) {
      case "aceptada":
        className = "estado-aceptada"
        break
      case "rechazada":
        className = "estado-rechazada"
        break
      default:
        className = "estado-pendiente"
    }

    return <span className={className}>{capitalizeFirstLetter(estado)}</span>
  }

  return (
    <div className="tabla-container">
      <table className="tabla-sugerencias">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {sugerencias.length > 0 ? (
            sugerencias.map((sug) => (
              <tr key={sug.id_sugerencia}>
                <td>{new Date(sug.fecha_registro).toLocaleDateString()}</td>
                <td>{sug.nombre_producto}</td>
                <td className="descripcion-celda">{sug.descripcion}</td>
                <td>{renderEstado(sug.estado)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="sin-datos">
                No hay sugerencias para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TablaSugerenciasGestor
