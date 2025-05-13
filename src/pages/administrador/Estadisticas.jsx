import React, { useState, useEffect } from "react";
import {
  obtenerHistorialCompras,
  filtrarComprasPorFecha,
  filtrarComprasPorProducto,
} from "../../api/CompraApi";
import "./Estadisticas.css";

const Estadisticas = () => {
  const [filtroPor, setFiltroPor] = useState("fecha");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [producto, setProducto] = useState("");
  const [pestañaActiva, setPestañaActiva] = useState("entradas");
  const [compras, setCompras] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const mostrarHistorial = async () => {
      try {
        const data = await obtenerHistorialCompras();
        setCompras(data.compras);
        setTotal(data.totalGeneral);
      } catch (error) {
        console.error("Error al obtener el historial:", error);
      }
    };
    mostrarHistorial();
  }, []);

  // Función para manejar el filtrado por fecha
  const filtrarPorFecha = async () => {
    if (fechaInicio && fechaFin) {
      try {
        const data = await filtrarComprasPorFecha(fechaInicio, fechaFin);
        setCompras(data.compras);
        setTotal(data.totalGeneral);
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const data = await obtenerHistorialCompras();
        setCompras(data.compras);
        setTotal(data.totalGeneral);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Función para manejar el filtrado por producto
  const filtrarPorProducto = async () => {
    if (producto) {
      try {
        const data = await filtrarComprasPorProducto(producto);
        setCompras(data.compras);
        setTotal(data.totalGeneral);
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const data = await obtenerHistorialCompras();
        setCompras(data.compras);
        setTotal(data.totalGeneral);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    if (filtroPor === "fecha") {
      setProducto("");
      filtrarPorFecha();
    } else if (filtroPor === "producto") {
      setFechaInicio("");
      setFechaFin("");
      filtrarPorProducto();
    }
  }, [filtroPor, fechaInicio, fechaFin, producto]);

  return (
    <div className="estadisticas-container">
      <h1 className="titulo-general">
        <strong>Estadísticas</strong>
      </h1>

      <div className="tabs">
        <div
          className={`tab ${pestañaActiva === "entradas" ? "active" : ""}`}
          onClick={() => setPestañaActiva("entradas")}
        >
          Histórico de Entradas
        </div>
        <div
          className={`tab ${pestañaActiva === "salidas" ? "active" : ""}`}
          onClick={() => setPestañaActiva("salidas")}
        >
          Histórico de Salidas
        </div>
      </div>
      <div className="tab-content">
        {pestañaActiva === "salidas" && (
          <>
            <div className="filtro-section">
              <label className="filtro-label">Filtro por</label>
              <select
                className="filtro-select"
                value={filtroPor}
                onChange={(e) => setFiltroPor(e.target.value)}
              >
                <option value="fecha">Fecha</option>
                <option value="producto">Producto</option>
              </select>

              {filtroPor === "fecha" ? (
                <div className="fecha-inputs">
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                  />
                  <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                  />
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="busqueda-input"
                  value={producto}
                  onChange={(e) => setProducto(e.target.value)}
                />
              )}
            </div>
            <div className="tabla-container">
              <table className="tabla-estadisticas">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio (U)</th>
                    <th>Fecha Compra</th>
                    <th>Total de la compra</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.map((item, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "fila-par" : "fila-impar"}
                    >
                      <td>{item.producto.nombre}</td>
                      <td>{item.cantidad_agregar}</td>
                      <td>${item.precio.toLocaleString()}</td>
                      <td>
                        {new Date(item.fecha_compra).toLocaleDateString(
                          "es-ES"
                        )}
                      </td>
                      <td>${item.total_compra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="total-container">
              <span>Total:</span>
              <input
                type="text"
                value={`$ ${total.toLocaleString()}`}
                readOnly
                className="total-input"
              />
            </div>
          </>
        )}

        {pestañaActiva === "entradas" && (
          <div className="salidas-placeholder">
            <p>Aquí va el histórico de Entradas.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Estadisticas;
