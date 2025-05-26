import React from "react";
import "./InicioAdmin.css";

const InicioAdmin = () => {
  return (
    <div className="inicio-admin">
      {/* Contenedor de todo el dashboard */}
      <div className="dashboard-container">
        {/* Más vendidos */}
        <div className="mas-vendidos-container">
          <h2>Más vendidos de la semana</h2>
          <div className="productos-mas-vendidos">
            <div className="producto verde">
              <p>Detodito Picante de 165 g</p>
              <strong>10unds</strong>
            </div>
            <div className="producto amarillo">
              <p>Detodito Natural de 165 g</p>
              <strong>8unds</strong>
            </div>
            <div className="producto naranja">
              <p>Lápiz Mongol H2</p>
              <strong>5unds</strong>
            </div>
          </div>
        </div>

        {/* Ventas del día */}
        <div className="ventas-dia-container">
          <h3 className="ventas-dia-titulo">Ventas del día</h3>
          <div className="ventas-dia-content">
            <div className="ventas-dia-icono">
              <img src="/carrito.png" alt="Carrito de ventas" />
            </div>
            <span className="ventas-numero">15</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioAdmin;
