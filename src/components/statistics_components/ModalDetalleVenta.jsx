import React from "react";
import "./ModalDetalleVenta.css";

const ModalDetalleVenta = ({ isOpen, onClose, detalle, total }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-detalle-venta-overlay">
      <div className="modal-detalle-venta">
        <div className="modal-detalle-header">
          <h2>Detalle de la Venta</h2>
          <button className="modal-detalle-close" onClick={onClose}>
            ×
          </button>
        </div>
        <table className="tabla-detalle-venta">
          <thead>
            <tr>
              <th>Nombre del producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {detalle && detalle.length > 0 ? (
              detalle.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>
                    $
                    {Number(item.precio_unitario).toLocaleString("es-CO", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td>
                    $
                    {(item.cantidad * item.precio_unitario).toLocaleString(
                      "es-CO",
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No hay productos en esta venta.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="modal-detalle-total">
          <span>Total de la venta:</span>
          <span className="modal-detalle-total-valor">
            ${Number(total).toLocaleString("es-CO", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalleVenta;