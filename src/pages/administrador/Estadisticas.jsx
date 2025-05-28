import React, { useState, useEffect } from "react";
import { IoWalletOutline } from "react-icons/io5";
import {
  obtenerHistorialCompras,
  filtrarComprasPorFecha,
  filtrarComprasPorProducto,
} from "../../api/CompraApi";
import "./Estadisticas.css";
import Modal from "../../components/Modal";
import { obtenerHistorialMargenesDeGanancia } from "../../api/VentaApi";
const obtenerAnioActual = () => new Date().getFullYear();

const datosEntradasEjemplo = [
  {
    producto: { nombre: "Cartera" },
    cantidad: 10,
    precio: 1500,
    fecha_entrada: "2024-05-01T00:00:00Z",
    total_entrada: 15000,
    estado: "Pagado",
    abono: 0,
  },
  {
    producto: { nombre: "Esmalte" },
    cantidad: 20,
    precio: 800,
    fecha_entrada: "2024-05-03T00:00:00Z",
    total_entrada: 16000,
    estado: "Pendiente",
    abono: 8000,
  },
  {
    producto: { nombre: "Balaca" },
    cantidad: 15,
    precio: 500,
    fecha_entrada: "2024-05-05T00:00:00Z",
    total_entrada: 7500,
    estado: "Pagado",
    abono: 0,
  },
];

const Estadisticas = () => {
  const [filtroPorEntradas, setFiltroPorEntradas] = useState("fecha");
  const [fechaInicioEntradas, setFechaInicioEntradas] = useState("");
  const [fechaFinEntradas, setFechaFinEntradas] = useState("");
  const [productoEntradas, setProductoEntradas] = useState("");

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
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
  });

  // Cargar márgenes de ganancia desde la API cuando cambia el año
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

  const gananciasFiltradas = datosMargenes;
  const promedioGanancias =
    gananciasFiltradas.length > 0
      ? gananciasFiltradas.reduce((acc, item) => acc + item.margenNegocio, 0) /
        gananciasFiltradas.length
      : 0;

  // Estado para las entradas de ejemplo
  const [entradas] = useState(datosEntradasEjemplo);
  const totalEntradas = entradas.reduce(
    (acc, item) => acc + item.total_entrada,
    0
  );

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

  useEffect(() => {
    const mostrarHistorial = async () => {
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
    mostrarHistorial();
  }, []);

  // Función para manejar el filtrado por fecha
  const filtrarPorFecha = async () => {
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

  useEffect(() => {
    if (filtroPorSalidas === "fecha") {
      setProductoSalidas("");
      filtrarPorFecha();
    } else if (filtroPorSalidas === "producto") {
      setFechaInicioSalidas("");
      setFechaFinSalidas("");
      filtrarPorProducto();
    }
  }, [filtroPorSalidas, fechaInicioSalidas, fechaFinSalidas, productoSalidas]);

  const entradasFiltradas = entradas.filter((item) => {
    if (filtroPorEntradas === "producto" && productoEntradas) {
      return item.producto.nombre
        .toLowerCase()
        .includes(productoEntradas.toLowerCase());
    }
    if (
      filtroPorEntradas === "fecha" &&
      fechaInicioEntradas &&
      fechaFinEntradas
    ) {
      return (
        item.fecha_entrada >= fechaInicioEntradas &&
        item.fecha_entrada <= fechaFinEntradas
      );
    }
    return true;
  });

  const obtenerMesAnioActual = () => {
  const fecha = new Date();
  const opciones = { month: "long", year: "numeric" };
  const mesAnio = fecha.toLocaleDateString("es-ES", opciones);

  // Capitaliza la primera letra del mes y elimina la preposición "de"
  const [mes, anio] = mesAnio.replace(" de ", " ").split(" ");
  const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);
  return `${mesCapitalizado} ${anio}`;
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
                        <td>${item.precio.toLocaleString()}</td>
                        <td>{item.fecha_compra.split("T")[0]}</td>
                        <td>${item.total_compra}</td>
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
                <option value="producto">Producto</option>
              </select>

              {filtroPorEntradas === "fecha" ? (
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
              ) : (
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="busqueda-input"
                  value={productoEntradas}
                  onChange={(e) => setProductoEntradas(e.target.value)}
                />
              )}
            </div>
            <div className="tabla-container">
              <table className="tabla-estadisticas">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio (U)</th>
                    <th>Fecha Entrada</th>
                    <th>Total de la entrada</th>
                    <th>Estado</th>
                    <th>Abono</th>
                  </tr>
                </thead>
                <tbody>
                  {entradas.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="no-data-message">
                        No hay entradas registradas.
                      </td>
                    </tr>
                  ) : entradasFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="no-data-message">
                        No hay entradas que coincidan con los filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    entradasFiltradas.map((item, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "fila-par" : "fila-impar"}
                      >
                        <td>{item.producto.nombre}</td>
                        <td>{item.cantidad}</td>
                        <td>${item.precio.toLocaleString()}</td>
                        <td>{item.fecha_entrada.split("T")[0]}</td>
                        <td>${item.total_entrada.toLocaleString()}</td>
                        <td>
                          <span
                            className={`estado-badge estado-${item.estado.toLowerCase()}`}
                          >
                            {item.estado}
                          </span>
                        </td>
                        <td>${item.abono?.toLocaleString() || "0"}</td>
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
                value={`$ ${totalEntradas.toLocaleString()}`}
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
            <span className="mes-ano-estadisticas" style={{ color: "#3182ce" }}>{obtenerMesAnioActual()}</span>
            <IoWalletOutline className="wallet-icon" />
          </div>
          <div className="campo">
            <label>Entradas:</label>
            <input
              className="campo-texto"
              type="text"
              value={`$ ${total.toLocaleString()}`}
              readOnly
            />
          </div>
          <div className="campo">
            <label>Salidas:</label>
            <input
              className="campo-texto"
              type="text"
              value={`$ ${totalEntradas.toLocaleString()}`}
              readOnly
            />
          </div>
          <div className="campo margen">
            <label>Margen de Negocio:</label>
            <span
              className={
                total - totalEntradas >= 0 ? "valor-positivo" : "valor-negativo"
              }
            >
              ${(total - totalEntradas).toLocaleString()}
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
    </div>
  );
};

export default Estadisticas;
