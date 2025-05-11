// src/sections/usuarios/UsuariosView.jsx
import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaEye } from "react-icons/fa";
import "../../components/Table.css"; // Si tienes estilos
import EstadoBadge from "../../components/EstadoBadge"; // Opcional, si ya está creado

const mockUsuarios = [
  {
    id: 1,
    nombre: "Juan Pérez",
    rol: "Administrador",
    correo: "juan@correo.com",
    estado: "Habilitado",
  },
  {
    id: 2,
    nombre: "Laura Gómez",
    rol: "Gestor de Ventas",
    correo: "laura@correo.com",
    estado: "Deshabilitado",
  },
];

const UsuariosView = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    // Simula carga de datos
    setUsuarios(mockUsuarios);
  }, []);

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaPlus /> Nuevo Usuario
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 p-2 border rounded w-full md:w-1/3"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id} className="border-t">
                  <td className="px-4 py-2">{usuario.nombre}</td>
                  <td className="px-4 py-2">{usuario.rol}</td>
                  <td className="px-4 py-2">{usuario.correo}</td>
                  <td className="px-4 py-2">
                    <EstadoBadge estado={usuario.estado} />
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="text-blue-600 hover:underline">
                      <FaEye />
                    </button>
                    <button className="text-yellow-600 hover:underline">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosView;
