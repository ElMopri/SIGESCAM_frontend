import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./ModalRegistrarVenta.css";

const ModalRegistrarVenta = ({ onClose }) => {
  const [isPendingPayment, setIsPendingPayment] = useState(false);
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Cartera", cantidad: 1, precio: 2000 },
    { id: 2, nombre: "Esmalte", cantidad: 5, precio: 2000 },
    { id: 3, nombre: "Balaca", cantidad: 2, precio: 500 },
    { id: 4, nombre: "Balaca", cantidad: 2, precio: 500 },
    { id: 5, nombre: "Balaca", cantidad: 2, precio: 500 },
    { id: 6, nombre: "Balaca", cantidad: 2, precio: 500 },
    { id: 7, nombre: "Balaca", cantidad: 2, precio: 500 },
    { id: 8, nombre: "Balaca", cantidad: 2, precio: 500 },
  ]);

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const calcularTotal = () => {
    return productos.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
  };

  return (
    <>
      <div className="modal-venta-backdrop" onClick={onClose}></div>

      <div className="modal-venta-container" role="dialog" aria-modal="true">
        <div className="modal-venta-header">
          <h2 className="modal-venta-title">Registrar Venta</h2>
          <button
            className="modal-venta-close-btn"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>

        <div className="modal-venta-body">
          <div className="venta-form-row">
            <div className="venta-form-group">
              <input
                type="text"
                placeholder="Nombre del producto"
                className="venta-form-input"
              />
            </div>

            <div className="venta-form-group">
              <input
                type="number"
                placeholder="Cantidad"
                min="1"
                className="venta-form-input"
              />
            </div>

            <div className="venta-form-group">
              <input
                type="number"
                placeholder="Precio"
                min="0"
                className="venta-form-input"
              />
            </div>

            <button type="button" className="venta-btn-agregar">
              Agregar
            </button>
          </div>

          <div className="venta-productos-container">
            <h3 className="venta-subtitle">Productos en la Venta</h3>
            <table className="venta-table">
              <thead>
                <tr>
                  <th className="venta-col-nombre">Nombre</th>
                  <th className="venta-col-cantidad">Cantidad</th>
                  <th className="venta-col-precio">Precio Unit.</th>
                  <th className="venta-col-total">Total</th>
                  <th className="venta-col-acciones"></th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td className="venta-col-nombre">{producto.nombre}</td>
                    <td className="venta-col-cantidad">
                      {producto.cantidad}
                    </td>
                    <td className="venta-col-precio">
                      ${producto.precio.toLocaleString()}
                    </td>
                    <td className="venta-col-total">
                      $
                      {(producto.precio * producto.cantidad).toLocaleString()}
                    </td>
                    <td className="venta-col-acciones">
                      <button
                        className="venta-btn-eliminar"
                        onClick={() => eliminarProducto(producto.id)}
                        aria-label="Eliminar producto"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="venta-total-row">
                  <td className="venta-col-nombre" colSpan="3">
                    Total
                  </td>
                  <td className="venta-col-total">
                    ${calcularTotal().toLocaleString()}
                  </td>
                  <td className="venta-col-acciones"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="venta-payment-status">
            <label className="venta-checkbox-label">
              <input
                type="checkbox"
                checked={isPendingPayment}
                onChange={() => setIsPendingPayment(!isPendingPayment)}
              />
              Pendiente de pago
            </label>

            {isPendingPayment && (
              <div className="venta-deudor-info">
                <input
                  type="text"
                  placeholder="Nombre del deudor"
                  className="venta-form-input"
                />
                <input
                  type="text"
                  placeholder="Documento del deudor"
                  className="venta-form-input"
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  className="venta-form-input"
                />
              </div>
            )}
          </div>

          <button type="submit" className="venta-btn-registrar">
            Registrar Venta
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalRegistrarVenta;