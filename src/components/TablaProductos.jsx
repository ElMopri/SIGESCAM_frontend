"use client"

import { useRef, useEffect } from "react"
import "./TablaProductos.css"

const TablaProductos = ({ columnas, datos }) => {
  const scrollContainerRef = useRef(null)
  const headerTableRef = useRef(null)
  const bodyTableRef = useRef(null)
  const scrollCornerRef = useRef(null)

  // Ajustar el ancho del encabezado y el scroll corner
  useEffect(() => {
    const adjustLayout = () => {
      if (scrollContainerRef.current && headerTableRef.current && bodyTableRef.current && scrollCornerRef.current) {
        // Obtener el ancho de la barra de desplazamiento
        const scrollbarWidth = scrollContainerRef.current.offsetWidth - scrollContainerRef.current.clientWidth

        // Ajustar el ancho de la tabla de encabezado para compensar la barra de desplazamiento
        headerTableRef.current.style.width = `calc(100% - ${scrollbarWidth}px)`

        // Ajustar el ancho del scroll corner
        scrollCornerRef.current.style.width = `${scrollbarWidth}px`
      }
    }

    // Ejecutar después de un pequeño retraso para asegurar que los elementos estén renderizados
    setTimeout(adjustLayout, 0)
    window.addEventListener("resize", adjustLayout)

    return () => {
      window.removeEventListener("resize", adjustLayout)
    }
  }, [])

  return (
    <div className="tabla-contenedor">
      <div className="tabla-header-container">
        <table className="tabla-productos" ref={headerTableRef}>
          <colgroup>
            {columnas.map((col) => (
              <col key={`header-col-${col.key}`} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columnas.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
        </table>
        {/* Elemento decorativo para cubrir el espacio sobre la barra de desplazamiento */}
        <div className="scroll-corner" ref={scrollCornerRef}></div>
      </div>
      <div className="tabla-cuerpo-scroll" ref={scrollContainerRef}>
        <table className="tabla-productos" ref={bodyTableRef}>
          <colgroup>
            {columnas.map((col) => (
              <col key={`body-col-${col.key}`} />
            ))}
          </colgroup>
          <tbody>
            {datos.length > 0 ? (
              datos.map((item, idx) => (
                <tr key={idx}>
                  {columnas.map((col) => (
                    <td key={col.key}>{col.render ? col.render(item) : item[col.key]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columnas.length} className="no-data">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaProductos
