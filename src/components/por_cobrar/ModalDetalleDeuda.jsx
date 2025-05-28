import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./ModalDetalleDeuda.css";

const ModalDetalleDeuda = ({ onClose, cliente, detalles, totalVenta, abonoInicial }) => {
  const totalOriginal = detalles.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  console.log(detalles);
  const [abono, setAbono] = useState("");
  const [deudaRestante, setDeudaRestante] = useState(totalVenta - abonoInicial);

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

  const handleGuardar = () => {
    const valorAbono = parseInt(abono.replace(/\D/g, ""), 10); // limpia $ y puntos

    if (isNaN(valorAbono) || valorAbono < 0) {
      alert("Por favor ingrese un abono válido.");
      return;
    }

    if (valorAbono > deudaRestante) {
      alert("El abono no puede ser mayor al total de la deuda.");
      return;
    }

    const nuevaDeuda = deudaRestante - valorAbono;
    setDeudaRestante(nuevaDeuda);

    console.log("Detalles actualizados:", detalles);
    console.log("Abono registrado:", valorAbono);
    console.log("Nueva deuda:", nuevaDeuda);

    onClose(); // cerrar el modal
  };

  return (
    <div className="modal-deuda-overlay">
      <div className="modal-deuda">
        <div className="modal-header">
          <div>
            <p><strong>Nombre:</strong> {cliente?.nombre}</p>
            <p><strong>Documento de identidad:</strong> {cliente?.documento}</p>
            <p><strong>Teléfono:</strong> {cliente?.telefono}</p>
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

        <h2 className="modal-title">Productos de la Venta</h2>

        <table className="tabla-deuda">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio (U)</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "fila-par-detalle-deuda" : "fila-impar-detalle-deuda"}>
                <td>{item.producto.nombre}</td>
                <td>{item.cantidad}</td>
                <td>${item.precio.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="modal-total">
          <div>
            <label>Total</label>
            <input type="text" readOnly value={`$ ${totalOriginal.toLocaleString()}`} />
          </div>
          <div>
            <label>Abono</label>
            <input
              type="text"
              value={abono}
              onChange={(e) => setAbono(e.target.value)}
              placeholder="$ 0"
            />
          </div>
        </div>

        <button className="btn-guardar" onClick={handleGuardar}>Guardar Pago</button>
      </div>
    </div>
  );
};

export default ModalDetalleDeuda;
