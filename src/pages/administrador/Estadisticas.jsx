import React, { useState, useEffect } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { FaUndo } from "react-icons/fa";
import {
  obtenerHistorialCompras,
  filtrarComprasPorFecha,
  filtrarComprasPorProducto,
} from "../../api/CompraApi";
import {
  filtrarVentasPorFecha,
  obtenerHistorialMargenesDeGanancia,
  obtenerHistorialVentas,
  obtenerDetalleVenta,
  obtenerMargenDeGananciaDelMes,
} from "../../api/VentaApi";

import "./Estadisticas.css";
import Modal from "../../components/Modal";
import ModalDetalleVenta from "../../components/statistics_components/ModalDetalleVenta";

const obtenerAnioActual = () => new Date().getFullYear();

const Estadisticas = () => {
  const [filtroPorEntradas, setFiltroPorEntradas] = useState("fecha");
  const [fechaInicioEntradas, setFechaInicioEntradas] = useState("");
  const [fechaFinEntradas, setFechaFinEntradas] = useState("");

  const [filtroPorSalidas, setFiltroPorSalidas] = useState("fecha");
  const [fechaInicioSalidas, setFechaInicioSalidas] = useState("");
  const [fechaFinSalidas, setFechaFinSalidas] = useState("");
  const [productoSalidas, setProductoSalidas] = useState("");

  const [anioFiltro, setAnioFiltro] = useState(obtenerAnioActual());

  // Estado para márgenes de ganancia desde la API
  const [datosMargenes, setDatosMargenes] = useState([]);

  const [pestañaActiva, setPestañaActiva] = useState("entradas");
  const [compras, setCompras] = useState([]);
  const [total, setTotal] = useState(0);

  const [ventas, setVentas] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);

  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [detalleVenta, setDetalleVenta] = useState([]);
  const [totalDetalleVenta, setTotalDetalleVenta] = useState(0);

  const [entradasMes, setEntradasMes] = useState(0);
  const [salidasMes, setSalidasMes] = useState(0);
  const [margenMes, setMargenMes] = useState(0);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
  });

  useEffect(() => {
    const cargarMargenes = async () => {
      try {
        const data = await obtenerHistorialMargenesDeGanancia(anioFiltro);
        setDatosMargenes(data.historial || []);
      } catch (error) {
        mostrarError(
          error.message || "Error al obtener el histórico de márgenes"
        );
        setDatosMargenes([]);
      }
    };
    cargarMargenes();
  }, [anioFiltro]);

  useEffect(() => {
    const cargarMargenMes = async () => {
      try {
        // Usamos el primer día del mes actual
        const fecha = new Date();
        const fechaStr = `${fecha.getFullYear()}-${String(
          fecha.getMonth() + 1
        ).padStart(2, "0")}-01`;
        const data = await obtenerMargenDeGananciaDelMes(fechaStr);
        setEntradasMes(data.entradas || 0);
        setSalidasMes(data.salidas || 0);
        setMargenMes(data.margenNegocio || 0);
      } catch (error) {
        setEntradasMes(0);
        setSalidasMes(0);
        setMargenMes(0);
      }
    };
    cargarMargenMes();
  }, []);

  const gananciasFiltradas = datosMargenes;
  const promedioGanancias =
    gananciasFiltradas.length > 0
      ? gananciasFiltradas.reduce((acc, item) => acc + item.margenNegocio, 0) /
        gananciasFiltradas.length
      : 0;

  const cerrarModal = () => {
    setModalConfig({
      isOpen: false,
      title: "",
      message: "",
      type: "error",
    });
  };

  const mostrarError = (mensaje) => {
    setModalConfig({
      isOpen: true,
      title: "Error",
      message: mensaje,
      type: "error",
    });
  };

  const abrirDetalleVenta = async (id_venta) => {
    try {
      const data = await obtenerDetalleVenta(id_venta);
      // data.ventas es un array, tomamos la primera venta
      const venta =
        data.ventas && data.ventas.length > 0 ? data.ventas[0] : null;
      if (!venta) {
        setDetalleVenta([]);
        setTotalDetalleVenta(0);
        setModalDetalleOpen(true);
        return;
      }
      // Mapear los productos al formato que espera el modal
      const productos = (venta.detalle_venta || []).map((item) => ({
        nombre: item.producto?.nombre || "",
        cantidad: item.cantidad,
        precio_unitario: Number(item.precio),
        subtotal: Number(item.precio) * Number(item.cantidad),
      }));
      setDetalleVenta(productos);
      setTotalDetalleVenta(Number(venta.total));
      setModalDetalleOpen(true);
    } catch (error) {
      mostrarError(error.message || "No se pudo cargar el detalle de la venta");
    }
  };

  useEffect(() => {
    const mostrarHistorialSalidas = async () => {
      try {
        const data = await obtenerHistorialCompras();
        setCompras(data.compras);
        setTotal(data.totalGeneral);
      } catch (error) {
        mostrarError(
          error.message || "Error al obtener el historial de compras"
        );
        console.error("Error al obtener el historial:", error);
      }
    };
    mostrarHistorialSalidas();
  }, []);

  useEffect(() => {
    const mostrarHistorialEntradas = async () => {
      try {
        const data = await obtenerHistorialVentas();
        setVentas(data.ventas);
        setTotalVentas(data.totalGeneral);
      } catch (error) {
        mostrarError(
          error.message || "Error al obtener el historial de compras"
        );
      }
    };
    mostrarHistorialEntradas();
  }, []);

  // Función para manejar el filtrado por fecha

  const filtrarPorFechaSalidas = async () => {
    if (fechaInicioSalidas && fechaFinSalidas) {
      try {
        const data = await filtrarComprasPorFecha(
          fechaInicioSalidas,
          fechaFinSalidas
        );
        setCompras(data.compras);
        setTotal(data.totalGeneral);
      } catch (error) {
        mostrarError(error.message || "Error al filtrar por fecha");
        setFechaInicioSalidas("");
        setFechaFinSalidas("");
      }
    } else {
      try {
        const data = await obtenerHistorialCompras();
        setCompras(data.compras);
        setTotal(data.totalGeneral);
      } catch (error) {
        mostrarError(
          error.message || "Error al obtener el historial de compras"
        );
      }
    }
  };

  // Filtro por fecha para las entradas

  const filtrarPorFechaEntradas = async () => {
    if (fechaInicioEntradas && fechaFinEntradas) {
      try {
        const data = await filtrarVentasPorFecha(
          fechaInicioEntradas,
          fechaFinEntradas
        );
        setVentas(data.ventas);
        setTotalVentas(data.totalGeneral);
      } catch (error) {
        mostrarError(error.message || "Error al filtrar por fecha");
        setFechaInicioEntradas("");
        setFechaFinEntradas("");
      }
    } else {
      try {
        const data = await obtenerHistorialVentas();
        setVentas(data.ventas);
        setTotalVentas(data.totalGeneral);
      } catch (error) {
        mostrarError(
          error.message || "Error al obtener el historial de compras"
        );
      }
    }
  };

  // Función para manejar el filtrado por producto
  const filtrarPorProducto = async () => {
    if (productoSalidas) {
      try {
        const data = await filtrarComprasPorProducto(productoSalidas);
        setCompras(data.compras);
        setTotal(data.totalGeneral);
      } catch (error) {
        mostrarError(error.message || "Error al filtrar por producto");
        setProductoSalidas("");
      }
    } else {
      try {
        const data = await obtenerHistorialCompras();
        setCompras(data.compras);
        setTotal(data.totalGeneral);
      } catch (error) {
        mostrarError(
          error.message || "Error al obtener el historial de compras"
        );
      }
    }
  };

  // Filtros del historico de salidas

  useEffect(() => {
    if (filtroPorSalidas === "fecha") {
      setProductoSalidas("");
      filtrarPorFechaSalidas();
    } else if (filtroPorSalidas === "producto") {
      setFechaInicioSalidas("");
      setFechaFinSalidas("");
      filtrarPorProducto();
    }
  }, [filtroPorSalidas, fechaInicioSalidas, fechaFinSalidas, productoSalidas]);

  useEffect(() => {
    if (filtroPorEntradas === "fecha") {
      filtrarPorFechaEntradas();
    }
  }, [filtroPorEntradas, fechaInicioEntradas, fechaFinEntradas]);

  const obtenerMesAnioActual = () => {
    const fecha = new Date();
    const opciones = { month: "long", year: "numeric" };
    const mesAnio = fecha.toLocaleDateString("es-ES", opciones);

    // Capitaliza la primera letra del mes y elimina la preposición "de"
    const [mes, anio] = mesAnio.replace(" de ", " ").split(" ");
    const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);
    return `${mesCapitalizado} ${anio}`;
  };

  const revertirFiltros = () => {
    if (pestañaActiva === "salidas") {
      setFechaInicioSalidas("");
      setFechaFinSalidas("");
      setProductoSalidas("");
      setFiltroPorSalidas("fecha");
      obtenerHistorialCompras()
        .then((data) => {
          setCompras(data.compras);
          setTotal(data.totalGeneral);
        })
        .catch((error) => {
          mostrarError(
            error.message || "Error al obtener el historial de compras"
          );
        });
    } else if (pestañaActiva === "entradas") {
      setFechaInicioEntradas("");
      setFechaFinEntradas("");
      setFiltroPorEntradas("fecha");
      obtenerHistorialVentas()
        .then((data) => {
          setVentas(data.ventas);
          setTotalVentas(data.totalGeneral);
        })
        .catch((error) => {
          mostrarError(
            error.message || "Error al obtener el historial de ventas"
          );
        });
    }
  };

  return (
    <div className="estadisticas-container">
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={cerrarModal}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />
      <h1 className="titulo-general">
        <strong>Estadísticas</strong>
      </h1>

      <div className="tabs">
        <div
          className={`tab ${pestañaActiva === "entradas" ? "active" : ""}`}
          onClick={() => setPestañaActiva("entradas")}
        >
          Histórico de Entradas
        </div>
        <div
          className={`tab ${pestañaActiva === "salidas" ? "active" : ""}`}
          onClick={() => setPestañaActiva("salidas")}
        >
          Histórico de Salidas
        </div>
      </div>
      <div className="tab-content">
        {pestañaActiva === "salidas" && (
          <>
            <div className="filtro-section">
              <label className="filtro-label">Filtro por</label>
              <select
                className="filtro-select"
                value={filtroPorSalidas}
                onChange={(e) => setFiltroPorSalidas(e.target.value)}
              >
                <option value="fecha">Fecha</option>
                <option value="producto">Producto</option>
              </select>

              {filtroPorSalidas === "fecha" ? (
                <div className="fecha-inputs">
                  <input
                    type="date"
                    value={fechaInicioSalidas}
                    onChange={(e) => setFechaInicioSalidas(e.target.value)}
                  />
                  <input
                    type="date"
                    value={fechaFinSalidas}
                    onChange={(e) => setFechaFinSalidas(e.target.value)}
                  />
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="busqueda-input"
                  value={productoSalidas}
                  onChange={(e) => setProductoSalidas(e.target.value)}
                />
              )}
              <button
                type="button"
                className="btn-revertir"
                onClick={revertirFiltros}
              >
                <FaUndo style={{ marginRight: "8px" }} />
                Revertir filtros
              </button>
            </div>
            <div className="tabla-container">
              <table className="tabla-estadisticas">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio (U)</th>
                    <th>Fecha Compra</th>
                    <th>Total de la compra</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="no-data-message">
                        No hay compras registradas.
                      </td>
                    </tr>
                  ) : (
                    compras.map((item, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "fila-par" : "fila-impar"}
                      >
                        <td>{item.producto.nombre}</td>
                        <td>{item.cantidad_agregar}</td>
                        <td>
                          $
                          {Number(item.precio).toLocaleString("es-CO", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </td>
                        <td>{item.fecha_compra.split("T")[0]}</td>
                        <td>
                          $
                          {Number(item.total_compra).toLocaleString("es-CO", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="total-container">
              <span>Total:</span>
              <input
                type="text"
                value={`$ ${total.toLocaleString()}`}
                readOnly
                className="total-input"
              />
            </div>
          </>
        )}

        {pestañaActiva === "entradas" && (
          <>
            <div className="filtro-section">
              <label className="filtro-label">Filtro por</label>
              <select
                className="filtro-select"
                value={filtroPorEntradas}
                onChange={(e) => setFiltroPorEntradas(e.target.value)}
              >
                <option value="fecha">Fecha</option>
              </select>

              <div className="fecha-inputs">
                <input
                  type="date"
                  value={fechaInicioEntradas}
                  onChange={(e) => setFechaInicioEntradas(e.target.value)}
                />
                <input
                  type="date"
                  value={fechaFinEntradas}
                  onChange={(e) => setFechaFinEntradas(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn-revertir"
                onClick={revertirFiltros}
              >
                <FaUndo style={{ marginRight: "8px" }} />
                Revertir filtros
              </button>
            </div>
            <div className="tabla-container">
              <table className="tabla-estadisticas">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Total de venta</th>
                    <th>Estado</th>
                    <th>Total pagado</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="no-data-message">
                        No hay entradas registradas.
                      </td>
                    </tr>
                  ) : (
                    ventas.map((item, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "fila-par" : "fila-impar"}
                        value={item.id_venta}
                        style={{ cursor: "pointer" }}
                        onClick={() => abrirDetalleVenta(item.id_venta)}
                      >
                        <td>{item.fecha_venta.split("T")[0]}</td>
                        <td>
                          $
                          {Number(item.total).toLocaleString("es-CO", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </td>
                        <td>{item.es_fiado ? "Fiado" : "Pagado"}</td>
                        <td>
                          {item.es_fiado
                            ? "$" + item.totalAbonos.toLocaleString()
                            : "$" +
                              Number(item.total).toLocaleString("es-CO", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="total-container">
              <span>Total Entradas:</span>
              <input
                type="text"
                value={`$ ${totalVentas.toLocaleString()}`}
                readOnly
                className="total-input"
              />
            </div>
          </>
        )}
      </div>

      <div className="secciones-inferiores">
        {/* seccion de análisis entradas/salidas*/}
        <div className="widget-margen-negocio">
          <div className="header-estadisticas">
            <span>Análisis de Entradas / Salidas</span>
            <span className="mes-ano-estadisticas" style={{ color: "#3182ce" }}>
              {obtenerMesAnioActual()}
            </span>
            <IoWalletOutline className="wallet-icon" />
          </div>
          <div className="campo">
            <label>Entradas:</label>
            <input
              className="campo-texto"
              type="text"
              value={`$ ${entradasMes.toLocaleString()}`}
              readOnly
            />
          </div>
          <div className="campo">
            <label>Salidas:</label>
            <input
              className="campo-texto"
              type="text"
              value={`$ ${salidasMes.toLocaleString()}`}
              readOnly
            />
          </div>
          <div className="campo margen">
            <label>Margen de Negocio:</label>
            <span
              className={margenMes >= 0 ? "valor-positivo" : "valor-negativo"}
            >
              ${margenMes.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Sección de Histórico de Ganancias */}
        <div className="seccion-ganancias">
          <div className="header-ganancias">
            <h3 className="titulo-ganancias">Histórico de márgenes</h3>
            <div className="filtro-anio-container">
              <input
                type="number"
                className="input-anio"
                value={anioFiltro}
                onChange={(e) =>
                  setAnioFiltro(parseInt(e.target.value) || obtenerAnioActual())
                }
                min="2000"
                max="2100"
              />
            </div>
          </div>
          <div className="contenedor-tabla-ganancias">
            <table className="tabla-ganancias">
              <thead>
                <tr className="encabezado-ganancias">
                  <th className="columna-mes">Mes</th>
                  <th className="columna-margen">Margen de ganancia</th>
                </tr>
              </thead>
              <tbody>
                {gananciasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="no-data-message">
                      No hay datos disponibles para {anioFiltro}
                    </td>
                  </tr>
                ) : (
                  <>
                    {gananciasFiltradas.map((item, idx) => (
                      <tr key={idx} className="fila-ganancias" tabIndex={0}>
                        <td className="celda-mes">{item.mes}</td>
                        <td
                          className={`celda-margen ${
                            item.margenNegocio >= 0
                              ? "valor-positivo"
                              : "valor-negativo"
                          }`}
                        >
                          $ {item.margenNegocio.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr className="fila-promedio-ganancias">
                      <td className="celda-promedio">Promedio mensual</td>
                      <td
                        className={`celda-total ${
                          promedioGanancias >= 0
                            ? "valor-positivo"
                            : "valor-negativo"
                        }`}
                      >
                        ${" "}
                        {promedioGanancias.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalDetalleVenta
        isOpen={modalDetalleOpen}
        onClose={() => setModalDetalleOpen(false)}
        detalle={detalleVenta}
        total={totalDetalleVenta}
      />
    </div>
  );
};

export default Estadisticas;
