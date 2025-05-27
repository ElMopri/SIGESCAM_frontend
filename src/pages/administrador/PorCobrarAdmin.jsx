import { useState } from "react";
import TablaDeudores from "../../components/por_cobrar/TablaDeudores";
import SearchBarWaitForClick from "../../components/SearchBarWaitForClick";
import { buscarDeudoresPorNombreODNI } from "../../api/DeudorApi";
import Modal from "../../components/Modal"; 
import "./PorCobrarAdmin.css";

const PorCobrarAdmin = () => {
  const [busqueda, setBusqueda] = useState("");
  const [deudores, setDeudores] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false); // 👉 Modal visible o no

  const manejarBusqueda = async () => {
    if (!busqueda.trim()) return;

    try {
      const resultados = await buscarDeudoresPorNombreODNI(busqueda);
      if (resultados.length === 0) {
        setMostrarModal(true); // 👉 Mostrar modal si no hay resultados
      }
      setDeudores(resultados);
    } catch (error) {
      console.error("Error al buscar deudores:", error.message);
      setDeudores([]);
      setMostrarModal(true); // 👉 Mostrar modal en caso de error también
    }
  };

  return (
    <div className="padre-por-cobrar-container">
      <div className="por-cobrar-container">
        <div className="informacion-superior">
          <h1 className="titulo">Pendientes de pago</h1>
          <span className="fecha_actual">
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </span>
        </div>

        <div className="buscador-container">
          <SearchBarWaitForClick
            placeholder="Buscar clientes..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onSearch={manejarBusqueda}
          />
        </div>

        <TablaDeudores clientes={deudores} textoBusqueda={busqueda} />

        {/* Modal de error si no se encuentran resultados */}
        <Modal
          isOpen={mostrarModal}
          onClose={() => setMostrarModal(false)}
          title="Sin resultados"
          message={`No se encontraron coincidencias para "${busqueda}".`}
          type="error"
        />
      </div>
    </div>
  );
};

export default PorCobrarAdmin;
