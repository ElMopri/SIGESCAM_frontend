import React, { useState, useContext } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import "./ModalRegistrarVenta.css";
import {
  agregarProductoAVentaTemporal,
  registrarVenta,
} from "../../api/VentaApi.js";
import { autocompletarCampos, obtenerProductos } from "../../api/ProductoApi.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { obtenerDeudorPorDNI } from "../../api/DeudorApi.js";
import Modal from "../Modal";

const ModalRegistrarVenta = ({ onClose, onVentaRegistrada }) => {
  const [deudorExistente, setDeudorExistente] = useState(false);
  const { user, setUser } = useContext(AuthContext);
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

  // Estados para los modales
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
  });

  // Estado para el modal de confirmación de eliminación
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({
    isOpen: false,
    productId: null,
  });

  const handleNombreProductoChange = async (e) => {
    const valor = e.target.value;
    const valorSinEspacios = valor.replace(/^\s+/, '');
    setNombreProducto(valorSinEspacios);

    if (valorSinEspacios.length >= 2) {
      try {
        const resultados = await autocompletarCampos(valorSinEspacios);
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

  const handleKeyDown = (e) => {
    if ((nombreProducto === '' || /^\s+$/.test(nombreProducto)) && e.key === ' ') {
      e.preventDefault();
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
      
      // Obtener productos actualizados
      const productosActualizados = await obtenerProductos();
      
      setModalState({
        isOpen: true,
        type: "success",
        title: "Venta Registrada",
        message: "La venta se ha registrado exitosamente",
      });

      // Notificar al componente padre que se actualizaron los productos
      if (onVentaRegistrada) {
        onVentaRegistrada(productosActualizados);
      }

      // Esperamos un momento antes de cerrar para que el usuario vea el mensaje de éxito
      setTimeout(() => {
        onClose();
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
    <>
      <div className="modal-venta-backdrop" onClick={onClose}></div>

      <div className="modal-venta-container" role="dialog" aria-modal="true">
        <div className="modal-venta-header">
          <h2 className="modal-venta-title">Registrar Venta</h2>
          <FaTimes className="cerrar-icono" onClick={onClose} />
        </div>

        <div className="modal-venta-body">
          <div className="venta-date-container">
            <label className="venta-date-label">Fecha de venta:</label>
            <input
              type="date"
              className="venta-date-input"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className="venta-form-row">
            <div className="venta-form-group">
              <input
                type="text"
                placeholder="Nombre del producto"
                className="venta-form-input"
                value={nombreProducto}
                onChange={handleNombreProductoChange}
                onKeyDown={handleKeyDown}
              />
              {mostrarSugerencias && sugerencias.length > 0 && (
                <ul className="venta-sugerencias-lista">
                  {sugerencias.map((s, i) => (
                    <li
                      key={i}
                      onClick={() => handleSeleccionarSugerencia(s.nombre)}
                      className="venta-sugerencia-item"
                    >
                      {s.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="venta-form-group">
              <input
                type="number"
                placeholder="Cantidad"
                min="1"
                className="venta-form-input"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="venta-btn-agregar"
              onClick={handleAgregarProducto}
            >
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
                  <tr key={producto.idProducto}>
                    <td className="venta-col-nombre">
                      {producto.nombreProducto}
                    </td>
                    <td className="venta-col-cantidad">{producto.cantidad}</td>
                    <td className="venta-col-precio">
                      ${producto.precioVenta.toLocaleString()}
                    </td>
                    <td className="venta-col-total">
                      ${producto.total.toLocaleString()}
                    </td>
                    <td className="venta-col-acciones">
                      <button
                        className="venta-btn-eliminar"
                        onClick={() => handleConfirmDelete(producto.idProducto)}
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
                  placeholder="Documento del deudor"
                  className="venta-form-input"
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
                  className="venta-form-input"
                  value={nombreDeudor}
                  onChange={(e) => setNombreDeudor(e.target.value)}
                  disabled={deudorExistente}
                />

                <input
                  type="text"
                  placeholder="Teléfono"
                  className="venta-form-input"
                  value={telefonoDeudor}
                  onChange={(e) => setTelefonoDeudor(e.target.value)}
                  disabled={deudorExistente}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="venta-btn-registrar"
            onClick={handleRegistrarVenta}
          >
            Registrar Venta
          </button>
        </div>
      </div>

      {/* Modal para mensajes de error y éxito */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />

      {/* Modal de confirmación para eliminar producto */}
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
    </>
  );
};

export default ModalRegistrarVenta;