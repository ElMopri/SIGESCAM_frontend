import { useEffect, useState } from "react";
import TablaDeudores from "../../components/por_cobrar/TablaDeudores";
import SearchBarWaitForClick from "../../components/SearchBarWaitForClick";
import { obtenerDeudores, obtenerDeudorPorDNI } from "../../api/DeudorApi.js";
import "./PorCobrarAdmin.css";

const PorCobrarAdmin = () => {
  const [clientesDeudores, setClientesDeudores] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [todosLosDeudores, setTodosLosDeudores] = useState([]);

  useEffect(() => {
    cargarDeudores();
  }, []);

  useEffect(() => {
    const texto = textoBusqueda.trim().toLowerCase();

    if (texto === "") {
      setClientesDeudores(todosLosDeudores);
      return;
    }

    const filtrados = todosLosDeudores.filter((deudor) =>
      deudor.nombre.toLowerCase().includes(texto) ||
      deudor.cedula.toLowerCase().includes(texto)
    );

    setClientesDeudores(filtrados);
  }, [textoBusqueda, todosLosDeudores]);

  const cargarDeudores = async () => {
    try {
      const datos = await obtenerDeudores();
      if (datos) {
        const datosFormateados = datos.map((deudor) => ({
          id: deudor.dni_deudor,
          nombre: deudor.nombre,
          cedula: deudor.dni_deudor,
          monto_pendiente: parseFloat(deudor.deuda_total),
        }));
        setClientesDeudores(datosFormateados);
        setTodosLosDeudores(datosFormateados);
      }
    } catch (error) {
      console.error("Error al cargar deudores:", error.message);
    }
  };

  const obtenerFechaActual = () => {
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
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
          <SearchBarWaitForClick
            placeholder="Buscar clientes por nombre o cédula..."
            value={textoBusqueda}
            onChange={(e) => setTextoBusqueda(e.target.value)}
            onSearch={() => {}} // Ya no se necesita esta función
          />
        </div>

        <TablaDeudores clientes={clientesDeudores} />
      </div>
    </div>
  );
};

export default PorCobrarAdmin;
