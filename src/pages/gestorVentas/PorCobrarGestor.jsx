import { useEffect, useState } from "react";
import TablaDeudoresGestor from "../../components/por_cobrar/TablaDeudoresGestor";
import SearchBarWaitForClick from "../../components/SearchBarWaitForClick";
import { obtenerDeudores, obtenerDeudorPorDNI } from "../../api/DeudorApi.js";
import "../administrador/PorCobrarAdmin.css";

const PorCobrarGestor = () => {
  const [clientesDeudores, setClientesDeudores] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState(""); // ✅ Nuevo estado

  useEffect(() => {
    cargarDeudores();
  }, []);

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
      }
    } catch (error) {
      console.error("Error al cargar deudores:", error.message);
    }
  };

  const buscarClientes = async () => {
    const texto = textoBusqueda.trim(); // ✅ textoBusqueda ya es string
    if (!texto) {
      cargarDeudores();
      return;
    }

    try {
      const deudor = await obtenerDeudorPorDNI(texto);
      if (deudor) {
        setClientesDeudores([
          {
            id: deudor.dni_deudor,
            nombre: deudor.nombre,
            cedula: deudor.dni_deudor,
            monto_pendiente: parseFloat(deudor.monto_pendiente),
          },
        ]);
        return;
      }

      const todos = await obtenerDeudores();
      const filtrados = todos.filter((deudor) =>
        deudor.nombre.toLowerCase().includes(texto.toLowerCase())
      );

      if (filtrados.length === 0) {
        alert(`No se encontró ningún deudor con el nombre o cédula: "${texto}"`);
      }

      const datosFormateados = filtrados.map((deudor) => ({
        id: deudor.dni_deudor,
        nombre: deudor.nombre,
        cedula: deudor.dni_deudor,
        monto_pendiente: parseFloat(deudor.monto_pendiente),
      }));

      setClientesDeudores(datosFormateados);
    } catch (error) {
      console.error("Error al buscar clientes:", error.message);
    }
  };

  const obtenerFechaActual = () => {
    const fecha = new Date();
    return fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
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
            placeholder="Buscar clientes..."
            value={textoBusqueda}
            onChange={(e) => setTextoBusqueda(e.target.value)}
            onSearch={buscarClientes} // ✅ No se pasa argumento, porque usa textoBusqueda directamente
          />
        </div>

        <TablaDeudoresGestor clientes={clientesDeudores} />
      </div>
    </div>
  );
};

export default PorCobrarGestor;
