import React from "react";
import "./InicioAdmin.css";
import {
  obtenerVentasDelDia,
  obtenerProductosMasVendidos,
} from "../../api/VentaApi";
import { useEffect, useState } from "react";

const InicioAdmin = () => {
  const [ventasDelDia, setVentasDelDia] = useState(0);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);

  useEffect(() => {
    const cargarVentas = async () => {
      try {
        const ventas = await obtenerVentasDelDia();
        setVentasDelDia(ventas);
      } catch (error) {
        console.error("No se pudieron cargar las ventas del día.");
      }
    };

    const cargarProductosMasVendidos = async () => {
      try {
        const productos = await obtenerProductosMasVendidos();
        setProductosMasVendidos(productos);
      } catch (error) {
        console.error("No se pudieron cargar los productos más vendidos.");
      }
    };

    cargarVentas();
    cargarProductosMasVendidos();
    const intervalo = setInterval(() => {
      cargarVentas();
      cargarProductosMasVendidos();
    }, 10000); //

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="inicio-admin">
      {/* Contenedor de todo el dashboard */}
      <div className="dashboard-container">
        {/* Más vendidos */}
        <div className="mas-vendidos-container">
          <h2>Más vendidos de la semana</h2>
          <div className="productos-mas-vendidos">
            {productosMasVendidos.length === 0 ? (
              <p>No hay productos vendidos esta semana.</p>
            ) : (
              productosMasVendidos.map((producto, index) => {
                let claseColor = "";
                if (index === 0) claseColor = "verde";
                else if (index === 1) claseColor = "amarillo";
                else if (index === 2) claseColor = "naranja";

                return (
                  <div
                    key={producto.idProducto}
                    className={`producto ${claseColor}`}
                  >
                    <p>{producto.nombre}</p>
                    <strong>{producto.totalVendido} unds</strong>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Ventas del día */}
        <div className="ventas-dia-container">
          <h3 className="ventas-dia-titulo">Ventas del día</h3>
          <div className="ventas-dia-content">
            <div className="ventas-dia-icono">
              <img src="/carrito.png" alt="Carrito de ventas" />
            </div>
            <span className="ventas-numero">{ventasDelDia}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioAdmin;
