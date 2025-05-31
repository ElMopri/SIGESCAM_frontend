import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ModalDetalleDeuda from "./ModalDetalleDeuda";
import { AuthContext } from '../../context/AuthContext';
import "./TablaDeudores.css";

const TablaDeudores = ({ clientes }) => {
  const [clientesActuales, setClientesActuales] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [clienteDetalle, setClienteDetalle] = useState(null);
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  useEffect(() => {
    if (Array.isArray(clientes)) {
      setClientesActuales(clientes);
    }
  }, [clientes]);

  const formatearMoneda = (monto) => `$${monto.toFixed(2)}`;

const irADetalleCliente = (cliente) => {
  let path = "";
  if (role === "Administrador") {
    path = `/admin/por-cobrar/deudor/${cliente.cedula}`;
  } else if (role === "Gestor de ventas") {
    path = `/gestorDeVentas/por-cobrar/deudor/${cliente.cedula}`;
  } else {
    console.warn("Rol no reconocido:", role);
    return;
  }

  navigate(path, { state: { cliente } });
};

  return (
    <div className="tabla-wrapper">
      <div className="tabla-deudores-container">
        {clientesActuales.length === 0 ? (
          <p>No hay deudores registrados.</p>
        ) : (
          <table className="tabla-deudores">
            <thead>
              <tr>
                <th className="col-icono"></th>
                <th className="col-nombre">Nombre</th>
                <th className="col-deuda">Deuda</th>
                <th className="col-cedula">Cédula</th>
                <th className="col-acciones">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientesActuales.map((cliente, index) => (
                <tr
                  key={cliente.cedula}
                  className={index % 2 === 0 ? "fila-par" : "fila-impar"}
                >
                  <td className="icono-persona col-icono">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                        stroke="#333"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke="#333"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </td>
                  <td className="nombre col-nombre">{cliente.nombre}</td>
                  <td className="deuda col-deuda">
                    {formatearMoneda(cliente.monto_pendiente)}
                  </td>
                  <td className="cedula col-cedula">{cliente.cedula}</td>
                  <td className="acciones col-acciones">
                    <button
                      className="btn-ver"
                      onClick={() => irADetalleCliente(cliente)}
                      title="Ver detalles"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                          stroke="#8B4513"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                          stroke="#8B4513"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalAbierto && (
        <ModalDetalleDeuda
          onClose={() => setModalAbierto(false)}
          cliente={clienteDetalle}
        />
      )}
    </div>
  );
};

export default TablaDeudores;