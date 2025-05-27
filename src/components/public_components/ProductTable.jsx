import React from "react";
import "./PublicProducts.css";

const ProductTable = ({ products }) => {
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
          {products.length === 0 ? (
            <tr>
              <td colSpan="3">No se encontraron productos</td>
            </tr>
          ) : (
            products.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.precio_venta}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
