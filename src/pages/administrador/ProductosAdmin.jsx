import React, { useState } from "react";
import CategoriasModal from "./CategoriasModal";
import TablaProductos from "../../components/TablaProductos";
import SearchBarProductos from "./SearchBarProductos";
import FiltroModal from "./FiltroModal";
import iconEditar from "/EditYellow.png";
import iconDelete from "/Delete.png";
import { FaPlus } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import { FaUndo } from "react-icons/fa"; // Importar ícono para revertir
import "./ProductosAdmin.css";

const ProductosAdmin = () => {
  const [mostrarModalCategorias, setMostrarModalCategorias] = useState(false);
  const [mostrarFiltroModal, setMostrarFiltroModal] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState(""); // Estado para la barra de búsqueda
  const [filtrosAvanzados, setFiltrosAvanzados] = useState({});
  const [nombreBusquedaTemp, setNombreBusquedaTemp] = useState(""); // Entrada temporal

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
        <>
          <button onClick={() => editar(item)} className="boton-icono editar">
            <img src={iconEditar} alt="Editar" className="icono-accion" />
          </button>
          <button
            onClick={() => eliminar(item.id)}
            className="boton-icono eliminar"
          >
            <img src={iconDelete} alt="Eliminar" className="icono-accion" />
          </button>
        </>
      ),
    },
  ];

  const datos = [
    {
      id: 1,
      producto: "Camiseta Hombre",
      categoria: "Ropa Deportiva",
      unidades: 10,
      precio: 20000,
    },
    {
      id: 2,
      producto: "Jean",
      categoria: "Ropa Deportiva",
      unidades: 15,
      precio: 50000,
    },
    {
      id: 3,
      producto: "Zapatos",
      categoria: "Calzado",
      unidades: 5,
      precio: 75000,
    },
  ];

  const editar = (producto) => {
    console.log("Editar", producto);
  };

  const eliminar = (id) => {
    console.log("Eliminar", id);
  };

  const categoriasDisponibles = [...new Set(datos.map((d) => d.categoria))];

  const datosFiltrados = datos.filter((item) => {
    const coincideNombre = item.producto
      .toLowerCase()
      .includes(filtroNombre.toLowerCase());

    const coincideCantidad =
      filtrosAvanzados.cantidad === undefined ||
      filtrosAvanzados.cantidad === "" ||
      item.unidades <= Number(filtrosAvanzados.cantidad);

    const coincideCategoria =
      !filtrosAvanzados.categoria ||
      item.categoria.toLowerCase() === filtrosAvanzados.categoria.toLowerCase();

    const coincidePrecio =
      filtrosAvanzados.precio === undefined ||
      filtrosAvanzados.precio === "" ||
      item.precio <= Number(filtrosAvanzados.precio);

    return coincideNombre && coincideCantidad && coincideCategoria && coincidePrecio;
  });

  // Función para revertir los filtros a su estado inicial
  const revertirFiltros = () => {
    setFiltroNombre(""); // Limpiar la búsqueda
    setFiltrosAvanzados({}); // Restablecer los filtros avanzados
  };

  return (
    <div className="productos-admin-container">
      {/* Barra de búsqueda */}
      <div className="contenedor-centrado">
     <SearchBarProductos
  value={nombreBusquedaTemp}
  onChange={(e) => setNombreBusquedaTemp(e.target.value)}
  onSearch={() => {
  setFiltroNombre(nombreBusquedaTemp);
  setNombreBusquedaTemp(""); // Limpiar el input
}}
/>
    </div>
      {/* Tabla de productos */}
      <div className="contenedor-tabla">
        {/* Botón de filtro */}
        <div className="botones-filtro">
      <button
        className="btn-filtrar"
        onClick={() => setMostrarFiltroModal(true)}
      >
        Filtro <MdOutlineFilterAlt style={{ marginLeft: "8px" }} />
      </button>

      {/* Botón de revertir filtros */}
      <button
        className="btn-revertir"
        onClick={revertirFiltros}
      >
        Revertir Filtros <FaUndo style={{ marginLeft: "4px" }} />
      </button> </div>

      <TablaProductos columnas={columnasAdmin} datos={datosFiltrados} /></div>

      {/* Botones inferiores */}
      <div className="botones-inferiores">
        <button className="btn-verde">
          Registrar Producto <FaPlus />
        </button>
        <button
          className="btn-amarillo"
          onClick={() => setMostrarModalCategorias(true)}
        >
          Ver Categorías <FaPlus />
        </button>
        <button className="btn-azul">
          Registrar Venta <FaPlus />
        </button>
      </div>

      {/* Modal de categorías */}
      {mostrarModalCategorias && (
        <CategoriasModal onClose={() => setMostrarModalCategorias(false)} />
      )}

      {/* Modal de filtros */}
      {mostrarFiltroModal && (
        <FiltroModal
          categorias={categoriasDisponibles}
          onFiltrar={(valores) => {
            // Asegurar que no entren valores negativos
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
    </div>
  );
};

export default ProductosAdmin;
