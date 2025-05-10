import React from "react";
import TablaProductos from "../../components/TablaProductos";
import iconEditar from "/EditYellow.png";
import iconDelete from "/Delete.png";
import "./ProductosAdmin.css";

const columnasAdmin = [
  { key: "producto", label: "Producto" },
  { key: "categoria", label: "Categoria" },
  { key: "unidades", label: "Unidades" },
  { key: "precio", label: "Precio" },
  {
    key: "acciones",
    label: "",
    render: (item) => (
      <>
        <button onClick={() => editar(item)} className="boton-icono editar">
          <img src={iconEditar} alt="Editar" className="icono-accion"></img>
        </button>
        <button
          onClick={() => eliminar(item.id)}
          className="boton-icono eliminar"
        >
          <img src={iconDelete} alt="Eliminar" className="icono-accion"></img>
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
    precio: 20,
    stock: 10,
  },
  {
    id: 1,
    producto: "Jean",
    categoria: "ropa deportiva",
    unidades: 10,
    precio: 20,
    stock: 10,
  },
  // ...
];

const ProductosAdmin = () => (
  <div>
    <h2>Productos - Admin</h2>
    <TablaProductos columnas={columnasAdmin} datos={datos} />
  </div>
);

export default ProductosAdmin;
