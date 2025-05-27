import { useEffect, useState } from "react";
import TablaDeudores from "../../components/por_cobrar/TablaDeudores";
import SearchBarWaitForClick from "../../components/SearchBarWaitForClick";
import { obtenerDeudores, obtenerDeudorPorDNI } from "../../api/DeudorApi.js";
import "./PorCobrarAdmin.css";
import Modal from "../../components/Modal";


const PorCobrarAdmin = () => {
  const [clientesDeudores, setClientesDeudores] = useState([]);
  const [busqueda, setBusqueda] = useState(""); // ⬅️ Estado del input
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");

  // Carga inicial de todos los deudores
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
          telefono: deudor.telefono,
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
    const texto = busqueda.trim();
    if (!texto) {
      cargarDeudores(); // Si está vacío, carga todos
      return;
    }

    try {
      // Buscar por cédula
      const deudor = await obtenerDeudorPorDNI(texto);
      if (deudor) {
        setClientesDeudores([
          {
            id: deudor.dni_deudor,
            nombre: deudor.nombre,
            telefono: deudor.telefono,
            cedula: deudor.dni_deudor,
            monto_pendiente: parseFloat(deudor.monto_pendiente),
          },
        ]);
        return;
      }

      // Si no se encuentra por cédula, buscar por nombre
      const todos = await obtenerDeudores();
      const filtrados = todos.filter((deudor) =>
        deudor.nombre.toLowerCase().includes(texto.toLowerCase())
      );

      if (filtrados.length === 0) {
        // Mostrar modal si no se encuentra ningún cliente
        setMensajeModal(`No se encontró ningún deudor con el nombre o cédula: "${texto}"`);
        setMostrarModal(true);
      }

      const datosFormateados = filtrados.map((deudor) => ({
        id: deudor.dni_deudor,
        nombre: deudor.nombre,
        telefono: deudor.telefono,
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
          <SearchBarWaitForClick
            placeholder="Buscar clientes por nombre o cédula..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onSearch={buscarClientes}
          />
        </div>

        <TablaDeudores clientes={clientesDeudores} />
        <Modal
          isOpen={mostrarModal}
          onClose={() => setMostrarModal(false)}
          title="Deudor no encontrado"
          message={mensajeModal}
          type="error"
        />
      </div>
    </div>
  );
};

export default PorCobrarAdmin;
