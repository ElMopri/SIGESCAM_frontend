import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./ModalDetalleDeuda.css";

const ModalDetalleDeuda = ({ onClose, cliente, detalles, totalVenta, abonoInicial, ventaId, onPagoGuardado }) => {
  const totalOriginal = detalles.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

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

  const handleGuardar = async () => {
    const valorAbono = parseInt(abono.replace(/\D/g, ""), 10); // limpia $ y puntos

    if (isNaN(valorAbono) || valorAbono < 0) {
      alert("Por favor ingrese un abono válido.");
      return;
    }

    if (valorAbono > deudaRestante) {
      alert("El abono no puede ser mayor al total de la deuda.");
      return;
    }

    try {
      const response = await fetch(`/ventas-fiadas/${ventaId}/abono`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ monto: valorAbono }),
      });

      if (response.ok) {
        alert("Abono registrado exitosamente.");
        setDeudaRestante((prev) => prev - valorAbono);

        if (typeof onPagoGuardado === "function") {
          onPagoGuardado(); // actualiza la tabla en el padre
        }

        onClose(); // cierra el modal
      } else {
        const error = await response.json();
        alert("Error al registrar abono: " + (error.message || "Intenta nuevamente."));
      }
    } catch (error) {
      console.error("Error al guardar el abono:", error);
      alert("Hubo un problema al registrar el abono.");
    }
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
              <tr key={index}>
                <td>{item.nombre_producto}</td>
                <td>{item.cantidad}</td>
                <td>${item.precio?.toLocaleString()}</td>
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
