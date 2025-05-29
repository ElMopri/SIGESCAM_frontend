import React, { useState, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import "./RegistrarVentasGestor.css";
import {
  agregarProductoAVentaTemporal,
  registrarVenta,
} from "../../api/VentaApi.js";
import { autocompletarCampos, obtenerProductos } from "../../api/ProductoApi.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { obtenerDeudorPorDNI } from "../../api/DeudorApi.js";
import Modal from "../../components/Modal";

const RegistrarVentasGestor = () => {
  const [deudorExistente, setDeudorExistente] = useState(false);
  const { user } = useContext(AuthContext);
  const [isPendingPayment, setIsPendingPayment] = useState(false);
  const [fecha, setFecha] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  const [productos, setProductos] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidad, setCantidad] = useState("");

  const [nombreDeudor, setNombreDeudor] = useState("");
  const [dniDeudor, setDniDeudor] = useState("");
  const [telefonoDeudor, setTelefonoDeudor] = useState("");

  const dni_usuario = user?.dni || "00000000";

  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
  });

  const [confirmDeleteModal, setConfirmDeleteModal] = useState({
    isOpen: false,
    productId: null,
  });

  const handleNombreProductoChange = async (e) => {
    const valor = e.target.value;
    setNombreProducto(valor);

    // Eliminar espacios extras y verificar si hay al menos 2 caracteres sin contar espacios
    const valorLimpio = valor.trim();
    if (valorLimpio.length >= 2) {
      try {
        const resultados = await autocompletarCampos(valorLimpio);
        setSugerencias(resultados);
        setMostrarSugerencias(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSugerencias([]);
      setMostrarSugerencias(false);
    }
  };

  const handleSeleccionarSugerencia = (nombreSeleccionado) => {
    setNombreProducto(nombreSeleccionado);
    setSugerencias([]);
    setMostrarSugerencias(false);
  };

  const handleAgregarProducto = async () => {
    if (!nombreProducto || !cantidad) {
      setModalState({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Todos los campos son obligatorios",
      });
      return;
    }

    const cantidadNueva = parseInt(cantidad);
    const productoExistente = productos.find(
      (p) => p.nombreProducto === nombreProducto
    );

    const cantidadTotal = productoExistente
      ? productoExistente.cantidad + cantidadNueva
      : cantidadNueva;

    try {
      const productoAgregado = await agregarProductoAVentaTemporal({
        nombreProducto,
        cantidad: cantidadTotal,
      });

      setProductos((prevProductos) => {
        if (productoExistente) {
          return prevProductos.map((p) =>
            p.nombreProducto === nombreProducto
              ? { ...productoAgregado, cantidad: cantidadTotal }
              : p
          );
        } else {
          return [...prevProductos, productoAgregado];
        }
      });
      setNombreProducto("");
      setCantidad("");
    } catch (error) {
      setModalState({
        isOpen: true,
        type: "error",
        title: "Error",
        message: error.message,
      });
    }
  };

  const handleRegistrarVenta = async () => {
    if (productos.length === 0) {
      setModalState({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Debe agregar al menos un producto",
      });
      return;
    }

    const venta = {
      productos,
      dni_usuario,
      deudor: isPendingPayment
        ? {
            nombre: nombreDeudor,
            dni: dniDeudor,
            telefono: telefonoDeudor,
          }
        : null,
      es_fiado: isPendingPayment,
      fecha,
    };

    try {
      await registrarVenta(venta);
      
      setModalState({
        isOpen: true,
        type: "success",
        title: "Venta Registrada",
        message: "La venta se ha registrado exitosamente",
      });

      setTimeout(() => {
        setModalState(prev => ({ ...prev, isOpen: false }));
        // Limpiar todos los campos
        setProductos([]);
        setNombreProducto("");
        setCantidad("");
        setIsPendingPayment(false);
        setDniDeudor("");
        setNombreDeudor("");
        setTelefonoDeudor("");
        setDeudorExistente(false);
        setSugerencias([]);
        setMostrarSugerencias(false);

        // Restablecer la fecha al día actual
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        setFecha(`${year}-${month}-${day}`);
      }, 1500);

    } catch (error) {
      setModalState({
        isOpen: true,
        type: "error",
        title: "Error",
        message: error.message,
      });
    }
  };

  const handleConfirmDelete = (id) => {
    setConfirmDeleteModal({
      isOpen: true,
      productId: id,
    });
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.idProducto !== id));
    setConfirmDeleteModal({ isOpen: false, productId: null });
  };

  const calcularTotal = () => {
    return productos.reduce((total, producto) => {
      return total + producto.total;
    }, 0);
  };

  return (
    <div className="gestor-venta-container">
      <div className="gestor-venta-header">
        <h2 className="gestor-venta-title">Registrar Venta</h2>
        <div className="gestor-fecha-header-group">
          <label className="gestor-fecha-label">Fecha:</label>
          <input
            type="date"
            className="gestor-fecha-input"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
      </div>

      <div className="gestor-venta-body">
        <div className="gestor-form-row">
          <div className="gestor-form-group">
            <input
              type="text"
              placeholder="Nombre del producto"
              className="gestor-form-input"
              value={nombreProducto}
              onChange={handleNombreProductoChange}
            />
            {mostrarSugerencias && sugerencias.length > 0 && (
              <ul className="gestor-sugerencias-lista">
                {sugerencias.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleSeleccionarSugerencia(s.nombre)}
                    className="gestor-sugerencia-item"
                  >
                    {s.nombre}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="gestor-form-group">
            <input
              type="number"
              placeholder="Cantidad"
              min="1"
              className="gestor-form-input"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="gestor-btn-agregar"
            onClick={handleAgregarProducto}
          >
            Agregar
          </button>
        </div>

        <div className="gestor-productos-container">
          <div className="gestor-table-wrapper">
            <table className="gestor-table">
              <thead>
                <tr>
                  <th className="gestor-col-nombre">Nombre</th>
                  <th className="gestor-col-cantidad">Cantidad</th>
                  <th className="gestor-col-precio">Precio Unit.</th>
                  <th className="gestor-col-total">Total</th>
                  <th className="gestor-col-acciones"></th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.idProducto}>
                    <td className="gestor-col-nombre">
                      {producto.nombreProducto}
                    </td>
                    <td className="gestor-col-cantidad">{producto.cantidad}</td>
                    <td className="gestor-col-precio">
                      ${producto.precioVenta.toLocaleString()}
                    </td>
                    <td className="gestor-col-total">
                      ${producto.total.toLocaleString()}
                    </td>
                    <td className="gestor-col-acciones">
                      <button
                        className="gestor-btn-eliminar"
                        onClick={() => handleConfirmDelete(producto.idProducto)}
                        aria-label="Eliminar producto"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {productos.length > 0 && (
            <table className="gestor-table gestor-total-table">
              <tbody>
                <tr className="gestor-total-row">
                  <td className="gestor-col-nombre">Total</td>
                  <td className="gestor-col-cantidad"></td>
                  <td className="gestor-col-precio"></td>
                  <td className="gestor-col-total">
                    ${calcularTotal().toLocaleString()}
                  </td>
                  <td className="gestor-col-acciones"></td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="gestor-payment-status">
          <label className="gestor-checkbox-label">
            <input
              type="checkbox"
              checked={isPendingPayment}
              onChange={() => setIsPendingPayment(!isPendingPayment)}
            />
            Pendiente de pago
          </label>

          {isPendingPayment && (
            <div className="gestor-deudor-info">
              <input
                type="text"
                placeholder="Documento del deudor"
                className="gestor-form-input"
                value={dniDeudor}
                onChange={async (e) => {
                  const valor = e.target.value;
                  setDniDeudor(valor);

                  if (valor.length >= 2) {
                    try {
                      const deudor = await obtenerDeudorPorDNI(valor);
                      if (deudor) {
                        setNombreDeudor(deudor.nombre);
                        setTelefonoDeudor(deudor.telefono);
                        setDeudorExistente(true);
                      } else {
                        setNombreDeudor("");
                        setTelefonoDeudor("");
                        setDeudorExistente(false);
                      }
                    } catch (error) {
                      setNombreDeudor("");
                      setTelefonoDeudor("");
                      setDeudorExistente(false);
                    }
                  } else {
                    setDeudorExistente(false);
                  }
                }}
              />

              <input
                type="text"
                placeholder="Ingrese nombre del deudor"
                className="gestor-form-input"
                value={nombreDeudor}
                onChange={(e) => setNombreDeudor(e.target.value)}
                disabled={deudorExistente}
              />

              <input
                type="text"
                placeholder="Teléfono"
                className="gestor-form-input"
                value={telefonoDeudor}
                onChange={(e) => setTelefonoDeudor(e.target.value)}
                disabled={deudorExistente}
              />
            </div>
          )}
        </div>

        <button
          type="button"
          className="gestor-btn-registrar"
          onClick={handleRegistrarVenta}
        >
          Registrar Venta
        </button>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />

      <Modal
        isOpen={confirmDeleteModal.isOpen}
        onClose={() => setConfirmDeleteModal({ ...confirmDeleteModal, isOpen: false })}
        onConfirm={() => eliminarProducto(confirmDeleteModal.productId)}
        title="Confirmar eliminación"
        message="¿Está seguro que desea eliminar este producto de la venta?"
        type="confirm"
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default RegistrarVentasGestor;