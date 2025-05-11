import React, { useState } from "react";
import "./Estadisticas.css";

const Estadisticas = () => {
  const [filtroPor, setFiltroPor] = useState("fecha");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [producto, setProducto] = useState("");
  const [pestañaActiva, setPestañaActiva] = useState("entradas");

  const data = [
    { nombre: "DetoDito Picante de 165 g", cantidad: 20, precio: 3000 },
    { nombre: "DetoDito Natural de 165 g", cantidad: 17, precio: 3000 },
    { nombre: "Doritos de 150 g", cantidad: 14, precio: 2500 },
    { nombre: "Lapicero Mongol H2", cantidad: 10, precio: 1100 },
    { nombre: "Bolsa de globos rosa x 20", cantidad: 4, precio: 5000 },
  ];

  const total = data.reduce(
    (acc, item) => acc + item.cantidad * item.precio,
    0
  );

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

      {pestañaActiva === "entradas" && (
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

          <table className="tabla-estadisticas">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio (U)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "fila-par" : ""}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.precio.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

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

      {pestañaActiva === "salidas" && (
        <div className="salidas-placeholder">
          <p>Aquí va el histórico de salidas.</p>
        </div>
      )}
    </div>
  );
};

export default Estadisticas;
