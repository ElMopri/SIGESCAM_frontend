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
    },
    {
      id: 2,
      nombre: "Juan Perez",
      deuda: 20000,
      cedula: "135665688",
    },
    {
      id: 3,
      nombre: "Alexander Blanco",
      deuda: 2000,
      cedula: "118416478",
    },
    {
      id: 4,
      nombre: "Felipe López",
      deuda: 1200000,
      cedula: "135665688",
    },
    {
      id: 5,
      nombre: "Daniela Vargas",
      deuda: 40000,
      cedula: "xxxxxxxx",
    },
    {
      id: 6,
      nombre: "Jose Perez",
      deuda: 120000,
      cedula: "xxxxxxxxx",
    },
    {
      id: 7,
      nombre: "Xxxxx",
      deuda: 0,
      cedula: "xxxxxxxxx",
    },
    {
      id: 8,
      nombre: "xxxx xxxx",
      deuda: 0,
      cedula: "xxxxxxxxxx",
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
