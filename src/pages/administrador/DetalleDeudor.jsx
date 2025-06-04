import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ModalDetalleDeuda from "../../components/por_cobrar/ModalDetalleDeuda";
import {
  obtenerVentasFiadasDeudor,
  obtenerDeudorPorDNI,
} from "../../api/DeudorApi";
import { obtenerDetalleVentaFiada } from "../../api/VentaApi";
import { AuthContext } from "../../context/AuthContext";

const DetalleDeudor = () => {
  const { clienteId } = useParams();
  const navigate = useNavigate();
  const [deudor, setDeudor] = useState(null);
  const [ventasFiadas, setVentasFiadas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const { user, role } = useContext(AuthContext);

  useEffect(() => {
    const fetchVentasFiadas = async () => {
      try {
        const data = await obtenerVentasFiadasDeudor(clienteId);
        setDeudor({
          nombre: data.nombre,
          documento: data.dni_deudor,
          telefono: data.telefono || "---",
        });
        setVentasFiadas(data?.ventas || []);
      } catch (error) {
        console.error("Error obteniendo ventas fiadas:", error);
      }
    };

    if (clienteId) fetchVentasFiadas();
  }, [clienteId]);

  const handleAbono = async (venta) => {
    // 🔍 DEBUG: Mostrar datos de la venta que se recibe
    console.log("Venta recibida al hacer clic:", venta);
    console.log("ID de venta recibido:", venta.id_venta);

    // Validación defensiva
    if (!venta?.id_venta) {
      console.error("ID de venta es inválido o undefined:", venta);
      return;
    }

    try {
      const detalle = await obtenerDetalleVentaFiada(venta.id_venta);
      setVentaSeleccionada({
        detalles: detalle.detallesVenta || [],
        totalVenta: venta.monto_total,
        abonoInicial: venta.abono || 0,
        venta: venta,
      });
      setMostrarModal(true);
    } catch (error) {
      console.error("Error obteniendo detalle de venta:", error);
    }
  };

  const handleCloseModal = () => {
    setMostrarModal(false);
    setVentaSeleccionada(null);
  };

  return (
    <div className="modal-detalle-deudor-overlay">
      <label className="ventas-fiadas">Ventas Fiadas</label>
      <div className="modal-deuda">
        <div className="modal-header">
          <div>
            <p>
              <strong>Nombre:</strong> {deudor?.nombre || "---"}
            </p>
            <p>
              <strong>Documento:</strong> {deudor?.documento || "---"}
            </p>
            <p className="fecha-actual-detalle-deuda">
              <strong>Fecha:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="modal-header-right-detalle-deuda">
            <span
              className="close-button-detalle-deuda"
              onClick={() => {
                if (role === "Administrador") {
                  navigate("/admin/por-cobrar");
                } else if (role === "Gestor de ventas") {
                  navigate("/gestorDeVentas/por-cobrar");
                }
              }}
            >
              &times;
            </span>
          </div>
        </div>

        <div className="modal-title">Detalle de Ventas Fiadas</div>

        <table className="tabla-deuda">
          <thead>
            <tr>
              <th>Venta</th>
              <th>Monto pendiente</th>
              <th>Fecha</th>
              <th>Registrar Abono</th>
            </tr>
          </thead>
          <tbody>
            {ventasFiadas.map((item, index) => {
              console.log("item:", item); // 👈 Agrega esto

              return (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "fila-par-detalle-deuda"
                      : "fila-impar-detalle-deuda"
                  }
                >
                  <td>Venta {index + 1}</td>
                  <td>${item.monto_pendiente.toLocaleString()}</td>
                  <td>{item.fecha_venta.split("T")[0]}</td>
                  <td>
                    <button
                      className="btn-abono"
                      onClick={() => handleAbono(item)}
                    >
                      Registrar Abono
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {mostrarModal && ventaSeleccionada && (
          <ModalDetalleDeuda
            onClose={handleCloseModal}
            cliente={deudor}
            detalles={ventaSeleccionada.detalles}
            totalVenta={ventaSeleccionada.totalVenta}
            abonoInicial={ventaSeleccionada.abonoInicial}
            ventaId={ventaSeleccionada.venta.id_venta}
            onPagoGuardado={() => {
              // Refrescar la lista de ventas fiadas después del abono
              const reloadVentasFiadas = async () => {
                const data = await obtenerVentasFiadasDeudor(clienteId);
                setVentasFiadas(data?.ventas || []);
              };
              reloadVentasFiadas();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DetalleDeudor;
