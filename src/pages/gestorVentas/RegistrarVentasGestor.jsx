import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./RegistrarVentasGestor.css";

const RegistrarVentasGestor = () => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [productos, setProductos] = useState([]);
  const [esFiado, setEsFiado] = useState(false);
  const [documentoDeudor, setDocumentoDeudor] = useState("");
  const [nombreDeudor, setNombreDeudor] = useState("");
  const [telefonoDeudor, setTelefonoDeudor] = useState("");
  const [fechaVenta, setFechaVenta] = useState(
    new Date().toISOString().split("T")[0]
  );

  const agregarProducto = () => {
    if (nombreProducto && cantidad && precio) {
      const nuevoProducto = {
        nombre: nombreProducto,
        cantidad: parseInt(cantidad),
        precio: parseFloat(precio),
        subtotal: parseInt(cantidad) * parseFloat(precio),
      };
      setProductos([...productos, nuevoProducto]);
      setNombreProducto("");
      setCantidad("");
      setPrecio("");
    }
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  const calcularTotal = () => {
    return productos.reduce((total, producto) => total + producto.subtotal, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para registrar la venta
    console.log({
      productos,
      total: calcularTotal(),
      esFiado,
      nombreDeudor: esFiado ? nombreDeudor : null,
      telefonoDeudor: esFiado ? telefonoDeudor : null,
      fechaVenta,
    });
  };

  return (
    <div className="gestor-venta-container">
      <div className="gestor-venta-header">
        <h2 className="gestor-venta-title">Registrar Venta</h2>
        <div className="gestor-fecha-header-group">
          <label
            className="gestor-fecha-label"
            style={{ marginRight: "0.5rem" }}
          >
            Fecha de venta
          </label>
          <input
            className="gestor-fecha-input"
            type="date"
            value={fechaVenta}
            onChange={(e) => setFechaVenta(e.target.value)}
          />
        </div>
      </div>

      <div className="gestor-form-row">
        <div className="gestor-form-group">
          <label
            className="gestor-fecha-label"
            style={{ visibility: "hidden" }}
          >
            Producto
          </label>
          <input
            className="gestor-form-input"
            placeholder="Nombre del producto"
            value={nombreProducto}
            onChange={(e) => setNombreProducto(e.target.value)}
          />
        </div>
        <div className="gestor-form-group">
          <label
            className="gestor-fecha-label"
            style={{ visibility: "hidden" }}
          >
            Cantidad
          </label>
          <input
            className="gestor-form-input"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="gestor-btn-agregar"
          onClick={agregarProducto}
        >
          Agregar
        </button>
      </div>

      <div className="gestor-productos-container">
        <table className="gestor-table">
          <thead>
            <tr>
              <th className="gestor-col-nombre">Producto</th>
              <th className="gestor-col-cantidad">Cantidad</th>
              <th className="gestor-col-precio">Precio (U)</th>
              <th className="gestor-col-total">Total</th>
              <th className="gestor-col-acciones"></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombre}</td>
                <td className="gestor-col-cantidad">{producto.cantidad}</td>
                <td className="gestor-col-precio">
                  ${producto.precio.toLocaleString()}
                </td>
                <td className="gestor-col-total">
                  ${producto.subtotal.toLocaleString()}
                </td>
                <td>
                  <button
                    type="button"
                    className="gestor-btn-eliminar"
                    onClick={() => eliminarProducto(index)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            <tr className="gestor-total-row">
              <td colSpan="3">Total</td>
              <td className="gestor-col-total">
                ${calcularTotal().toLocaleString()}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="gestor-payment-status">
        <label className="gestor-checkbox-label">
          <input
            type="checkbox"
            checked={esFiado}
            onChange={(e) => setEsFiado(e.target.checked)}
          />
          ¿Es fiado?
        </label>

        {esFiado && (
          <div className="gestor-deudor-info">
            <input
              type="text"
              className="gestor-form-input"
              placeholder="Documento del deudor"
              value={documentoDeudor}
              onChange={(e) => setDocumentoDeudor(e.target.value)}
            />
            <input
              type="text"
              className="gestor-form-input"
              placeholder="Nombre del deudor"
              value={nombreDeudor}
              onChange={(e) => setNombreDeudor(e.target.value)}
            />
            <input
              type="tel"
              className="gestor-form-input"
              placeholder="Teléfono del deudor"
              value={telefonoDeudor}
              onChange={(e) => setTelefonoDeudor(e.target.value)}
            />
          </div>
        )}
      </div>

      <button type="submit" className="gestor-btn-registrar">
        Registrar Venta
      </button>
    </div>
  );
};

export default RegistrarVentasGestor;
