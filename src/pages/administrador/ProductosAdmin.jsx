import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import CategoriasModal from "../../components/CategoriasModal";
import TablaProductos from "../../components/TablaProductos";
import SearchBarWaitForClick from "../../components/SearchBarWaitForClick";
import FiltroModal from "../../components/FiltroModal";
import iconEditar from "/EditYellow.png";
import iconDelete from "/Delete.png";
import { FaPlus, FaUndo } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import "./ProductosAdmin.css";
import ModalAgregarProducto from "../../components/ModalAgregarProducto";
import ModalEditarProducto from "../../components/ModalEditarProducto";
import Modal from "../../components/Modal";
import ModalRegistrarVenta from "../../components/products_components/ModalRegistrarVenta";
import { registrarCompra } from "../../api/CompraApi";
import { obtenerCategorias } from "../../api/CategoriaApi";
import {
  obtenerProductos,
  buscarProductosPorNombreParecido,
  activarDesactivarProductoPorNombre,
  filtrarProductos,
} from "../../api/ProductoApi";

const ProductosAdmin = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [dni, setDni] = useState(
    user?.dni || "No hay un perfil con sesión activa"
  );
  const [bajoStock, setBajoStock] = useState(false);
  const [mostrarModalCategorias, setMostrarModalCategorias] = useState(false);
  const [mostrarFiltroModal, setMostrarFiltroModal] = useState(false);
  const [mostrarModalAgregarProducto, setMostrarModalAgregarProducto] =
    useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nombreBusquedaTemp, setNombreBusquedaTemp] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtrosAvanzados, setFiltrosAvanzados] = useState({});
  const [mostrarModalEditarProducto, setMostrarModalEditarProducto] =
    useState(false);

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [datos, setDatos] = useState([]);
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([]);

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    productId: null,
  });

  const [mostrarModalRegistrarVenta, setMostrarModalRegistrarVenta] =
    useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  React.useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productos = await obtenerProductos();
        const datosTransformados = productos.map((producto) => ({
          id: producto.nombre,
          producto: producto.nombre,
          categoria: producto.categoria,
          unidades: producto.cantidad,
          precio: producto.precio_venta,
        }));
        setDatos(datosTransformados);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        mostrarError(
          `Error al obtener los productos: ${
            error.message || "Ocurrió un problema inesperado"
          }`
        );
      }
    };

    fetchProductos();
  }, []);

  React.useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categorias = await obtenerCategorias();
        setCategoriasDisponibles(
          categorias.map((categoria) => categoria.nombre)
        );
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
        mostrarError(
          `Error al obtener las categorías: ${
            error.message || "Ocurrió un problema inesperado"
          }`
        );
      }
    };

    fetchCategorias();
  }, []);

  React.useEffect(() => {
    const fetchProductosFiltrados = async () => {
      try {
        if (bajoStock) {
          // Filtrar productos con cantidad <= 3
          const productos = await obtenerProductos();
          const productosBajoStock = productos.filter((p) => p.cantidad <= 3);
          const datosTransformados = productosBajoStock.map((producto) => ({
            id: producto.nombre,
            producto: producto.nombre,
            categoria: producto.categoria,
            unidades: producto.cantidad,
            precio: producto.precio_venta,
          }));
          setDatos(datosTransformados);
        } else if (filtroNombre) {
          const productos = await buscarProductosPorNombreParecido(
            filtroNombre
          );
          const datosTransformados = productos.map((producto) => ({
            id: producto.nombre,
            producto: producto.nombre,
            categoria: producto.categoria,
            unidades: producto.cantidad,
            precio: producto.precio_venta,
          }));
          setDatos(datosTransformados);
        } else if (
          (filtrosAvanzados.cantidad !== undefined &&
            filtrosAvanzados.cantidad !== "") ||
          (filtrosAvanzados.categoria && filtrosAvanzados.categoria !== "") ||
          (filtrosAvanzados.precio !== undefined &&
            filtrosAvanzados.precio !== "")
        ) {
          const productos = await filtrarProductos(
            filtrosAvanzados.cantidad || null,
            filtrosAvanzados.categoria || null,
            filtrosAvanzados.precio || null
          );
          const datosTransformados = productos.map((producto) => ({
            id: producto.nombre,
            producto: producto.nombre,
            categoria: producto.categoria,
            unidades: producto.cantidad,
            precio: producto.precio_venta,
          }));
          setDatos(datosTransformados);
        } else {
          const productos = await obtenerProductos();
          const datosTransformados = productos.map((producto) => ({
            id: producto.nombre,
            producto: producto.nombre,
            categoria: producto.categoria,
            unidades: producto.cantidad,
            precio: producto.precio_venta,
          }));
          setDatos(datosTransformados);
        }
      } catch (error) {
        console.error("Error al filtrar los productos:", error);
        mostrarError(
          `Error al filtrar los productos: ${
            error.message || "Ocurrió un problema inesperado"
          }`
        );
      }
    };

    fetchProductosFiltrados();
  }, [filtroNombre, filtrosAvanzados, bajoStock]);

  // Efecto para abrir el modal si viene el parámetro en la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('openModal') === 'true') {
      setMostrarModalAgregarProducto(true);
      // Limpiar el parámetro de la URL
      window.history.replaceState({}, '', location.pathname);
    }
    if (params.get('openVentaModal') === 'true') {
      setMostrarModalRegistrarVenta(true);
      // Limpiar el parámetro de la URL
      window.history.replaceState({}, '', location.pathname);
    }
  }, [location]);

  const columnasAdmin = [
    { key: "producto", label: "Producto" },
    { key: "categoria", label: "Categoría" },
    { key: "unidades", label: "Unidades" },
    {
      key: "precio",
      label: "Precio",
      render: (item) => `$${item.precio.toLocaleString()}`,
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="botones-accion">
          <button onClick={() => editar(item)} className="boton-icono editar">
            <img
              src={iconEditar || "/placeholder.svg"}
              alt="Editar"
              className="icono-accion"
            />
          </button>
          <button
            onClick={() => confirmarEliminar(item.id)}
            className="boton-icono eliminar"
          >
            <img
              src={iconDelete || "/placeholder.svg"}
              alt="Eliminar"
              className="icono-accion"
            />
          </button>
        </div>
      ),
    },
  ];

  const editar = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModalEditarProducto(true);
  };

  const confirmarEliminar = (id) => {
    setConfirmModal({
      show: true,
      productId: id,
    });
  };

  const eliminar = async () => {
    try {
      await activarDesactivarProductoPorNombre(confirmModal.productId, false);
      setDatos(datos.filter((d) => d.id !== confirmModal.productId));
      console.log(`Producto con id ${confirmModal.productId} desactivado.`);
      setConfirmModal({ show: false, productId: null });
    } catch (error) {
      console.error("Error al desactivar el producto:", error);
      mostrarError(
        `Error al desactivar el producto: ${
          error.message || "Ocurrió un problema inesperado"
        }`
      );
    }
  };

  const revertirFiltros = () => {
    setFiltroNombre("");
    setFiltrosAvanzados({});
    setBajoStock(false);
  };

  const agregarProducto = async (nuevoProducto) => {
    try {
      const compraData = {
        dni_usuario: dni,
        nombre_producto: nuevoProducto.producto,
        precio_compra: nuevoProducto.precioCompra,
        nombre_categoria: nuevoProducto.categoria,
        precio_venta: nuevoProducto.precio,
        cantidad_agregar: nuevoProducto.cantidadAgregar,
        fecha_compra: nuevoProducto.fechaCompra,
      };

      console.log("Datos enviados a registrarCompra:", compraData);

      await registrarCompra(compraData);

      const productos = await obtenerProductos();
      const datosTransformados = productos.map((producto) => ({
        id: producto.nombre,
        producto: producto.nombre,
        categoria: producto.categoria,
        unidades: producto.cantidad,
        precio: producto.precio_venta,
      }));
      setDatos(datosTransformados);

      setMostrarModalAgregarProducto(false);
      setProductoSeleccionado(null);

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const mostrarError = (mensaje) => {
    setErrorMessage(mensaje);
    setErrorModalOpen(true);

    // Asegurarnos de que el modal de error tenga prioridad visual
    const modalOverlays = document.querySelectorAll(".modal-overlay");
    modalOverlays.forEach((overlay) => {
      if (overlay.contains(document.querySelector('[type="error"]'))) {
        overlay.style.zIndex = "1200"; // Un valor mayor que el z-index de los otros modales
      }
    });
  };

  const handleVentaRegistrada = (productosActualizados) => {
    const datosTransformados = productosActualizados.map((producto) => ({
      id: producto.nombre,
      producto: producto.nombre,
      categoria: producto.categoria,
      unidades: producto.cantidad,
      precio: producto.precio_venta,
    }));
    setDatos(datosTransformados);
  };

  return (
    <div className="productos-admin-container">
      <div className="contenedor-centrado">
        <SearchBarWaitForClick
          placeholder="Buscar productos..."
          value={nombreBusquedaTemp}
          onChange={(e) => setNombreBusquedaTemp(e.target.value)}
          onSearch={() => {
            setFiltroNombre(nombreBusquedaTemp);
            setNombreBusquedaTemp("");
          }}
        />
      </div>

      <div className="contenedor-tabla">
        <div className="botones-filtro">
          <button
            className="btn-filtrar"
            onClick={() => setMostrarFiltroModal(true)}
          >
            Filtro <MdOutlineFilterAlt style={{ marginLeft: "8px" }} />
          </button>
          <button className="btn-revertir" onClick={revertirFiltros}>
            Revertir Filtros <FaUndo style={{ marginLeft: "4px" }} />
          </button>
          <button
            className="btn-bajo-stock"
            style={{
              backgroundColor: bajoStock ? "#f7b731" : "",
              color: bajoStock ? "#fff" : "",
              marginLeft: "8px",
            }}
            onClick={() => setBajoStock(!bajoStock)}
          >
            Bajo stock
          </button>
        </div>
        <TablaProductos columnas={columnasAdmin} datos={datos} />
      </div>

      <div className="botones-inferiores">
        <button
          className="btn-verde"
          onClick={() => {
            setProductoSeleccionado(null);
            setMostrarModalAgregarProducto(true);
          }}
        >
          Registrar Producto <FaPlus />
        </button>
        <button
          className="btn-amarillo"
          onClick={() => setMostrarModalCategorias(true)}
        >
          Ver Categorías <FaPlus />
        </button>
        <button
          className="btn-azul"
          onClick={() => setMostrarModalRegistrarVenta(true)}
        >
          Registrar Venta <FaPlus />
        </button>
      </div>

      {/* Todos los demás modales deben ir antes del modal de error */}
      {mostrarModalCategorias && (
        <CategoriasModal onClose={() => setMostrarModalCategorias(false)} />
      )}

      {mostrarFiltroModal && (
        <FiltroModal
          categorias={categoriasDisponibles}
          onFiltrar={(valores) => {
            const sanitizados = {
              ...valores,
              cantidad:
                valores.cantidad !== "" && Number(valores.cantidad) < 0
                  ? 0
                  : valores.cantidad,
              precio:
                valores.precio !== "" && Number(valores.precio) < 0
                  ? 0
                  : valores.precio,
            };
            setFiltrosAvanzados(sanitizados);
          }}
          onClose={() => setMostrarFiltroModal(false)}
        />
      )}

      {mostrarModalAgregarProducto && (
        <ModalAgregarProducto
          categorias={categoriasDisponibles}
          productos={datos}
          onClose={() => {
            setMostrarModalAgregarProducto(false);
            setProductoSeleccionado(null);
          }}
          onSave={agregarProducto}
          productoInicial={productoSeleccionado}
        />
      )}

      {mostrarModalEditarProducto && productoSeleccionado && (
        <ModalEditarProducto
          producto={productoSeleccionado}
          categorias={categoriasDisponibles}
          onClose={() => setMostrarModalEditarProducto(false)}
          onError={mostrarError}
          onGuardar={async (productoActualizado) => {
            try {
              const productos = await obtenerProductos();
              const datosTransformados = productos.map((producto) => ({
                id: producto.nombre,
                producto: producto.nombre,
                categoria: producto.categoria,
                unidades: producto.cantidad,
                precio: producto.precio_venta,
              }));
              setDatos(datosTransformados);

              setMostrarModalEditarProducto(false);
            } catch (error) {
              console.error("Error al editar el producto:", error);
              mostrarError(
                `Error al editar el producto: ${
                  error.message || "Ocurrió un problema inesperado"
                }`
              );
            }
          }}
        />
      )}

      {mostrarModalRegistrarVenta && (
        <ModalRegistrarVenta
          onClose={() => setMostrarModalRegistrarVenta(false)}
          onVentaRegistrada={handleVentaRegistrada}
        />
      )}

      {/* Modal de confirmación para eliminar producto */}
      <Modal
        isOpen={confirmModal.show}
        onClose={() => setConfirmModal({ show: false, productId: null })}
        onConfirm={eliminar}
        title="Confirmar eliminación"
        message="¿Está seguro que desea eliminar este producto?"
        type="confirm"
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
      />

      {/* El modal de error debe ser el último en renderizarse para estar por encima de los demás */}
      {errorModalOpen && (
        <Modal
          isOpen={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          title="Error"
          message={errorMessage}
          type="error"
        />
      )}

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Producto agregado"
        message="El producto fue agregado exitosamente."
        type="success"
      />
    </div>
  );
};

export default ProductosAdmin;
