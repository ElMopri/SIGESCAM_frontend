import React, { useState } from "react";
import TablaProductos from "../../components/TablaProductos";
import SearchBarProductos from "../../components/SearchBarProductos";
import FiltroModal from "../../components/FiltroModal";
import { FaPlus, FaUndo } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import "./ProductosGestor.css";

import Modal from "../../components/Modal"

import {
  obtenerProductos,
  buscarProductosPorNombreParecido,
  filtrarProductos,
} from "../../api/ProductoApi"

import { obtenerCategorias } from "../../api/CategoriaApi"

const ProductosGestor = () => {

  const [mostrarFiltroModal, setMostrarFiltroModal] = useState(false);
  const [nombreBusquedaTemp, setNombreBusquedaTemp] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtrosAvanzados, setFiltrosAvanzados] = useState({});

  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [datos, setDatos] = useState([])
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([])

  React.useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productos = await obtenerProductos()
        const datosTransformados = productos.map((producto) => ({
          id: producto.nombre,
          producto: producto.nombre,
          categoria: producto.categoria,
          unidades: producto.cantidad,
          precio: producto.precio_venta,
        }))
        setDatos(datosTransformados)
      } catch (error) {
        console.error("Error al obtener los productos:", error)
        mostrarError(`Error al obtener los productos: ${error.message || "Ocurrió un problema inesperado"}`)
      }
    }

    fetchProductos()
  }, [])

  React.useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categorias = await obtenerCategorias()
        setCategoriasDisponibles(categorias.map((categoria) => categoria.nombre))
      } catch (error) {
        console.error("Error al obtener las categorías:", error)
        mostrarError(`Error al obtener las categorías: ${error.message || "Ocurrió un problema inesperado"}`)
      }
    }

    fetchCategorias()
  }, [])

  React.useEffect(() => {
    const fetchProductosFiltrados = async () => {
      try {
        if (filtroNombre) {
          const productos = await buscarProductosPorNombreParecido(filtroNombre)
          const datosTransformados = productos.map((producto) => ({
            id: producto.nombre,
            producto: producto.nombre,
            categoria: producto.categoria,
            unidades: producto.cantidad,
            precio: producto.precio_venta,
          }))
          setDatos(datosTransformados)
        } else if (
          (filtrosAvanzados.cantidad !== undefined && filtrosAvanzados.cantidad !== "") ||
          (filtrosAvanzados.categoria && filtrosAvanzados.categoria !== "") ||
          (filtrosAvanzados.precio !== undefined && filtrosAvanzados.precio !== "")
        ) {
          const productos = await filtrarProductos(
            filtrosAvanzados.cantidad || null,
            filtrosAvanzados.categoria || null,
            filtrosAvanzados.precio || null,
          )
          const datosTransformados = productos.map((producto) => ({
            id: producto.nombre,
            producto: producto.nombre,
            categoria: producto.categoria,
            unidades: producto.cantidad,
            precio: producto.precio_venta,
          }))
          setDatos(datosTransformados)
        } else {
          const productos = await obtenerProductos()
          const datosTransformados = productos.map((producto) => ({
            id: producto.nombre,
            producto: producto.nombre,
            categoria: producto.categoria,
            unidades: producto.cantidad,
            precio: producto.precio_venta,
          }))
          setDatos(datosTransformados)
        }
      } catch (error) {
        console.error("Error al filtrar los productos:", error)
        mostrarError(`Error al filtrar los productos: ${error.message || "Ocurrió un problema inesperado"}`)
      }
    }

    fetchProductosFiltrados()
  }, [filtroNombre, filtrosAvanzados])

  const columnasAdmin = [
    { key: "producto", label: "Producto" },
    { key: "categoria", label: "Categoría" },
    { key: "unidades", label: "Unidades" },
    {
      key: "precio",
      label: "Precio",
      render: (item) => `$${item.precio.toLocaleString()}`,
    },
  ];

  const revertirFiltros = () => {
    setFiltroNombre("");
    setFiltrosAvanzados({});
  };

    const mostrarError = (mensaje) => {
    setErrorMessage(mensaje)
    setErrorModalOpen(true)

    // Asegurarnos de que el modal de error tenga prioridad visual
    const modalOverlays = document.querySelectorAll(".modal-overlay")
    modalOverlays.forEach((overlay) => {
      if (overlay.contains(document.querySelector('[type="error"]'))) {
        overlay.style.zIndex = "1200" // Un valor mayor que el z-index de los otros modales
      }
    })
  }

  return (
    <div className="productos-admin-container">
      <div className="contenedor-centrado">
        <SearchBarProductos
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
          <button className="btn-filtrar" onClick={() => setMostrarFiltroModal(true)}>
            Filtro <MdOutlineFilterAlt style={{ marginLeft: "8px" }} />
          </button>
          <button className="btn-revertir" onClick={revertirFiltros}>
            Revertir Filtros <FaUndo style={{ marginLeft: "4px" }} />
          </button>
        </div>
        <TablaProductos columnas={columnasAdmin} datos={datos} />
      </div>

      {mostrarFiltroModal && (
        <FiltroModal
          categorias={categoriasDisponibles}
          onFiltrar={(valores) => {
            const sanitizados = {
              ...valores,
              cantidad: valores.cantidad !== "" && Number(valores.cantidad) < 0 ? 0 : valores.cantidad,
              precio: valores.precio !== "" && Number(valores.precio) < 0 ? 0 : valores.precio,
            };
            setFiltrosAvanzados(sanitizados);
          }}
          onClose={() => setMostrarFiltroModal(false)}
        />
      )}

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
    </div>
  );
};

export default ProductosGestor;