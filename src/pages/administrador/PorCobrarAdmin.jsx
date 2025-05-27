import { useEffect, useState } from "react";
import TablaDeudores from "../../components/por_cobrar/TablaDeudores";
import SearchBarWaitForClick from "../../components/SearchBarWaitForClick";
import { obtenerDeudores } from "../../api/DeudorApi.js";
import "./PorCobrarAdmin.css";

const PorCobrarAdmin = () => {
  const [clientesDeudores, setClientesDeudores] = useState([]);

  useEffect(() => {
    const cargarDeudores = async () => {
      try {
        const datos = await obtenerDeudores();
        if (datos) {
          // Mapear los datos para que coincidan con las propiedades que espera la tabla
          const datosFormateados = datos.map((deudor) => ({
            id: deudor.dni_deudor,
            nombre: deudor.nombre,
            cedula: deudor.dni_deudor,
            monto_pendiente: parseFloat(deudor.deuda_total)
          }));
          setClientesDeudores(datosFormateados);
        }
      } catch (error) {
        console.error("Error al cargar deudores:", error.message);
      }
    };

    cargarDeudores();
  }, []);

  const obtenerFechaActual = () => {
    const fecha = new Date();
    const opciones = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
    return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
  };

  return (
    <div className="padre-por-cobrar-container">
      <div className="por-cobrar-container">
        <div className="informacion-superior">
          <h1 className="titulo">Pendientes de pago</h1>
          <span className="fecha_actual">{obtenerFechaActual()}</span>
        </div>

        <div className="buscador-container">
          <SearchBarWaitForClick placeholder="Buscar clientes..." />
        </div>

        <TablaDeudores clientes={clientesDeudores} />
      </div>
    </div>
  );
};

export default PorCobrarAdmin;
