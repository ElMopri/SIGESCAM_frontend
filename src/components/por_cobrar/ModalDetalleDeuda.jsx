import React from "react";
import { FaTimes } from "react-icons/fa";
import "./ModalDetalleDeuda.css";

const ModalDetalleDeuda = ({ onClose, cliente }) => {
  const detalles = [
    {
      nombre: "DetoDito Picante de 165 g",
      cantidad: 20,
      precio: 1500,
      fecha: "23/02/2025",
    },
    {
      nombre: "DetoDito Natural de 165 g",
      cantidad: 20,
      precio: 1500,
      fecha: "23/02/2025",
    },
    {
      nombre: "Doritos de 150 g",
      cantidad: 20,
      precio: 1000,
      fecha: "28/02/2025",
    },
    {
      nombre: "Lapicero Mongol H2",
      cantidad: 40,
      precio: 500,
      fecha: "28/02/2025",
    },
    {
      nombre: "Bolsas de globos rosa x 20",
      cantidad: 10,
      precio: 4500,
      fecha: "24/02/2025",
    },
  ];

  const total = detalles.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const obtenerFechaActual = () => {
  const fecha = new Date();
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
  return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
};

  return (
    <div className="modal-deuda-overlay">
      <div className="modal-deuda">
        <div className="modal-header">
          <div>
            <p>
              <strong>Nombre:</strong> {cliente?.nombre}
            </p>
            <p>
              <strong>Documento de identidad:</strong> {cliente?.documento}
            </p>
            <p>
              <strong>Teléfono:</strong> {cliente?.telefono}
            </p>
          </div>
          <div className="modal-header-right-detalle-deuda">
            <span className="fecha-actual-detalle-deuda">{obtenerFechaActual()}</span>
            <FaTimes
              className="close-button-detalle-deuda"
              onClick={onClose}
              title="Cerrar"
            />
          </div>
        </div>

        <h2 className="modal-title">Detalle de Deuda</h2>

        <table className="tabla-deuda">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio (U)</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "fila-par-detalle-deuda" : "fila-impar-detalle-deuda"}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>${item.precio.toLocaleString()}</td>
                <td>{item.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="modal-total">
          <div>
            <label>Total</label>
            <input type="text" readOnly value={`$ ${total.toLocaleString()}`} />
          </div>
          <div>
            <label>Abono</label>
            <input type="text" value={`$ ${total.toLocaleString()}`} />
          </div>
        </div>

        <button className="btn-guardar">Guardar Pago</button>
      </div>
    </div>
  );
};

export default ModalDetalleDeuda;
