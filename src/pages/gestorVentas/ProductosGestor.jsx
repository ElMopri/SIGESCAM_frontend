import React from "react";
import TablaProductos from "../../components/TablaProductos";

const columnasGestor = [
  { key: "producto", label: "Producto" },
  { key: "categoria", label: "Categoria" },
  { key: "unidades", label: "Unidades" },
  { key: "precio", label: "Precio" },
];

const datos = [
  { id: 1, nombre: "Camiseta", precio: 20, stock: 10 },
  // ...
];

const ProductosGestor = () => (
  <div>
    <h2>Productos - Gestor</h2>
    <TablaProductos columnas={columnasGestor} datos={datos} />
  </div>
);

export default ProductosGestor;
