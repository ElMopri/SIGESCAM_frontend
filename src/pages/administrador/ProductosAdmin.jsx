import React, { useState } from "react";
import CategoriasModal from "./CategoriasModal";
import TablaProductos from "../../components/TablaProductos";
import iconEditar from "/EditYellow.png";
import iconDelete from "/Delete.png";
import "./ProductosAdmin.css";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";

const ProductosAdmin = () => {
  const [mostrarModalCategorias, setMostrarModalCategorias] = useState(false);

  const columnasAdmin = [
    { key: "producto", label: "Producto" },
    { key: "categoria", label: "Categoría" },
    { key: "unidades", label: "Unidades" },
    {
      key: "precio",
      label: "Precio",
      render: (item) => `$${item.precio.toLocaleString()}`
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
      producto: "camiseta hombre",
      categoria: "ropa deportiva",
      unidades: 10,
      precio: 20000,
    },
    {
      id: 2,
      producto: "Jean",
      categoria: "ropa deportiva",
      unidades: 15,
      precio: 50000,
    },
  ];

  const editar = (producto) => {
    console.log("Editar", producto);
  };

  const eliminar = (id) => {
    console.log("Eliminar", id);
  };

  return (
    <div className="productos-admin-container">
      <div className="barra-busqueda">
        <input type="text" placeholder="Buscar producto..." />
        <button className="btn-buscar">
          <FaSearch />
        </button>
      </div>

      <button className="btn-filtrar">
        Filtrar <FaFilter />
      </button>

      <TablaProductos columnas={columnasAdmin} datos={datos} />

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

      {mostrarModalCategorias && (
        <CategoriasModal onClose={() => setMostrarModalCategorias(false)} />
      )}
    </div>
  );
};

export default ProductosAdmin;
