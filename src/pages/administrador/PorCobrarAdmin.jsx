import TablaDeudores from "../../components/por_cobrar/TablaDeudores"
import SearchBarWaitForClick from "../../components/SearchBarWaitForClick"
import "./PorCobrarAdmin.css"

const PorCobrarAdmin = () => {
  
  const clientesDeudores = [
    {
      id: 1,
      nombre: "Michelle Rojas",
      deuda: 120000,
      cedula: "1094131661",
      telefono: "3214444444",
    },
    {
      id: 2,
      nombre: "Juan Perez",
      deuda: 20000,
      cedula: "135665688",
      telefono: "3214444444",
    },
    {
      id: 3,
      nombre: "Alexander Blanco",
      deuda: 2000,
      cedula: "118416478",
      telefono: "3214444444",
    },
    {
      id: 4,
      nombre: "Felipe López",
      deuda: 1200000,
      cedula: "135665688",
      telefono: "3214444444",
    },
    {
      id: 5,
      nombre: "Daniela Vargas",
      deuda: 40000,
      cedula: "1111111111",
      telefono: "3214444444",
    },
    {
      id: 6,
      nombre: "Jose Perez",
      deuda: 120000,
      cedula: "2222222222",
      telefono: "3214444444",
    },
    {
      id: 7,
      nombre: "Daniela Barreto",
      deuda: 200000,
      cedula: "1005028830",
      telefono: "3214444444",
    },
    {
      id: 8,
      nombre: "Shakira Mebarak",
      deuda: 15000,
      cedula: "1210149200",
      telefono: "3214444444",
    },
  ]

  const obtenerFechaActual = () => {
    const fecha = new Date()
    const opciones = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    }
    return fecha.toLocaleDateString("es-ES", opciones)
  }

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
        />
      </div>

      <TablaDeudores clientes={clientesDeudores} />
    </div>
    </div>
  )
}

export default PorCobrarAdmin
