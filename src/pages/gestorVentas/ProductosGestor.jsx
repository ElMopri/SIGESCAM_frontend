import React, { useState } from "react";
import TablaProductos from "../../components/TablaProductos";
import SearchBarProductos from "../../components/SearchBarProductos";
import FiltroModal from "../../components/FiltroModal";
import { FaPlus, FaUndo } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import "./ProductosGestor.css";

const ProductosGestor = () => {

  const [mostrarFiltroModal, setMostrarFiltroModal] = useState(false);
  const [nombreBusquedaTemp, setNombreBusquedaTemp] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtrosAvanzados, setFiltrosAvanzados] = useState({});

  const [datos, setDatos] = useState([
    {
      id: 1,
      producto: "Camiseta Hombre",
      categoria: "Ropa Deportiva",
      unidades: 10,
      precio: 20000,
      precioCompra: 15000,
    },
    {
      id: 2,
      producto: "Jean",
      categoria: "Ropa Deportiva",
      unidades: 15,
      precio: 50000,
      precioCompra: 30000,
    },
    {
      id: 3,
      producto: "Zapatos",
      categoria: "Calzado",
      unidades: 5,
      precio: 75000,
      precioCompra: 50000,
    },
  ]);

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

  const revertirFiltros = () => {
    setFiltroNombre("");
    setFiltrosAvanzados({});
  };

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
        <TablaProductos columnas={columnasAdmin} datos={datosFiltrados} />
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

    </div>
  );
};

export default ProductosGestor;