import React from "react";
import "./InicioAdmin.css";
import {
  obtenerVentasDelDia,
  obtenerProductosMasVendidos,
} from "../../api/VentaApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InicioAdmin = () => {
  const [ventasDelDia, setVentasDelDia] = useState(0);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const navigate = useNavigate();

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
    }, 10000);

    return () => clearInterval(intervalo);
  }, []);

  const handleRegistrarCompra = () => {
    // Navegar a productos con un parámetro que indique abrir el modal
    navigate('/admin/productos?openModal=true');
  };

  const handleRegistrarVenta = () => {
    // Navegar a productos con un parámetro que indique abrir el modal de venta
    navigate('/admin/productos?openVentaModal=true');
  };

  const handleRegistrarSugerencia = () => {
    // Navegar a la sección de sugerencias
    navigate('/admin/sugerencias');
  };

  return (
    <div className="inicio-admin">
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

        <div className="contenedor-inferior">
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

          {/* Botones de acción */}
          <div className="botones-acciones">
            <button 
              className="boton-accion"
              onClick={handleRegistrarCompra}
            >
              Registrar compra
              <img src="/compra.png" alt="Icono compra" />
            </button>
            <button 
              className="boton-accion"
              onClick={handleRegistrarVenta}
            >
              Registrar venta
              <img src="/venta.png" alt="Icono venta" />
            </button>
            <button 
              className="boton-accion"
              onClick={handleRegistrarSugerencia}
            >
              Registrar sugerencia
              <img src="/idea.png" alt="Icono sugerencia" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioAdmin;
