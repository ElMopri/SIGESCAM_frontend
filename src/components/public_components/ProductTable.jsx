import React from "react";
import "./PublicProducts.css";

const products = [
  { id: 1, nombre: "Arroz Diana", precio: 3500, stock: 15 },
  { id: 2, nombre: "Aceite Premier", precio: 8500, stock: 7 },
  { id: 3, nombre: "Pan Bimbo", precio: 5000, stock: 20 },
  { id: 4, nombre: "Leche Alquería", precio: 4000, stock: 30 },
];

const ProductTable = () => {
  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Disponibles</th>
            <th>Precio Unitario</th>
          </tr>
        </thead>
        <tbody>
          {products.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.stock}</td>
              <td>${producto.precio.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
