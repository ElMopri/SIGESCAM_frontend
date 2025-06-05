import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./ModalDetalleDeuda.css";
import "../../api/DeudorApi.js";
import { registrarAbono } from "../../api/DeudorApi.js";
import Modal from "../Modal.jsx";

const ModalDetalleDeuda = ({ onClose, cliente, detalles, totalVenta, abonoInicial, ventaId, onPagoGuardado }) => {
  const totalOriginal = detalles.reduce(
    (sum, item) =>
      sum + (parseFloat(item.precio_unitario || 0) * item.cantidad),
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

  const [modalError, setModalError] = useState({ open: false, mensaje: "" });
  const [modalSuccess, setModalSuccess] = useState({ open: false, mensaje: "" });

  const handleGuardar = async () => {
    // ✅ VALIDACIÓN MEJORADA PARA LETRAS
    if (/[a-zA-Z]/.test(abono)) {
      setModalError({ 
        open: true, 
        mensaje: "El campo de abono no puede contener letras. Solo se permiten números." 
      });
      return;
    }

    // Limpia caracteres no numéricos pero mantiene el signo negativo
    const valorLimpio = abono.replace(/[^\d.-]/g, "");
    const valorAbono = parseFloat(valorLimpio);

    // ✅ VALIDACIÓN MEJORADA PARA NÚMEROS NEGATIVOS
    if (valorAbono < 0) {
      setModalError({ 
        open: true, 
        mensaje: "El abono no puede ser un número negativo." 
      });
      return;
    }

    // Validación para valores no numéricos o cero
    if (isNaN(valorAbono) || valorAbono === 0) {
      setModalError({ 
        open: true, 
        mensaje: "Por favor ingrese un abono válido mayor a cero." 
      });
      return;
    }

    if (valorAbono > deudaRestante) {
      setModalError({ open: true, mensaje: "El abono no puede ser mayor al total de la deuda." });
      return;
    }

    const fecha_abono = new Date().toISOString().slice(0, 19).replace("T", " ");

    const abonoData = {
      dni_deudor: cliente?.documento,
      id_venta: ventaId,
      monto_abono: valorAbono,
      fecha_abono,
    };

    try {
      await registrarAbono(abonoData);

      setDeudaRestante((prev) => prev - valorAbono);
      if (typeof onPagoGuardado === "function") {
        onPagoGuardado();
      }

      setModalSuccess({ open: true, mensaje: "Abono registrado exitosamente." });

      setTimeout(() => {
        setModalSuccess({ open: false, mensaje: "" });
        onClose(); // Cierra el modal principal
      }, 2000); // 2 segundos
    } catch (error) {
      let mensaje = "Error al registrar abono. Intenta nuevamente.";
      if (error?.response?.data?.mensaje) {
        mensaje = error.response.data.mensaje;
      } else if (error?.message) {
        mensaje = error.message;
      }
      setModalError({ open: true, mensaje });
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
                <td>
                  {item.precio_unitario
                    ? `$${parseFloat(item.precio_unitario).toLocaleString()}`
                    : "$ 0"}
                </td>
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
              onChange={(e) => setAbono(e.target.value)} // ✅ VOLVEMOS AL MANEJADOR ORIGINAL
              placeholder="$ 0"
            />
          </div>
        </div>

        <button className="btn-guardar" onClick={handleGuardar}>Guardar Pago</button>
      </div>

      {modalError.open && (
        <Modal
          isOpen={modalError.open}
          onClose={() => setModalError({ open: false, mensaje: "" })}
          title="Error de validación"
          message={modalError.mensaje}
          type="error"
          confirmText="Aceptar"
        />
      )}

      {modalSuccess.open && (
        <Modal
          isOpen={modalSuccess.open}
          onClose={() => setModalSuccess({ open: false, mensaje: "" })}
          title="Éxito"
          message={modalSuccess.mensaje}
          type="success"
          confirmText="Aceptar"
        />
      )}
    </div>
  );
};

export default ModalDetalleDeuda;