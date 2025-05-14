// src/pages/administrador/Usuarios.jsx
import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import ButtonNewElements from "../../components/ButtonNewElements";
import TableElements from "../../components/User_components/TableElements";
import { listarUsuarios, obtenerPorId,cambiarEstadoUsuario } from "../../api/UsuarioApi";
import UserDetailModal from "../../components/User_components/UserDetailModal";
import UserCreateModal from "../../components/User_components/UserCreateModal";
import UserEditModal from "../../components/User_components/UserEditModal"; // NUEVO IMPORT
import "./Usuarios.css";

const Usuarios = () => {
  const headers = ["Nombre", "Rol"];
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false); // NUEVO ESTADO
  const [userToEdit, setUserToEdit] = useState(null); // NUEVO ESTADO

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await listarUsuarios();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEditUser = (usuario) => {
    setUserToEdit(usuario); 
    setModalEditVisible(true);
  };

  const handleViewUser = async (usuario) => {
    try {
      const data = await obtenerPorId(usuario.dni);
      setSelectedUser(data);
      setModalVisible(true);
    } catch (error) {
      alert("Error al obtener los datos");
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
  };

  const handleToggleStatus = async (dni, nuevoEstado) => {
  try {
    await cambiarEstadoUsuario(dni, nuevoEstado);
    console.log("Estado cambiado:", dni, nuevoEstado);
    // Actualiza la lista de usuarios después del cambio
    const data = await listarUsuarios();
    setUsuarios(data);
  } catch (error) {
    console.error("Error al cambiar estado:", error);
    alert("No se pudo cambiar el estado del usuario");
  }
};

  return (
    <div className="usuarios-wrapper">
      <h1 className="usuarios-title">Usuarios del sistema</h1>

      <div className="usuarios-container">
        <div className="usuarios-tools">
          <ButtonNewElements label="Nuevo +" onClick={() => setModalCreateVisible(true)} />
          <SearchBar placeholder="Buscar usuario..." />
        </div>

        {cargando ? (
          <p>Cargando usuarios...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <TableElements
            headers={headers}
            data={usuarios}
            onEdit={handleEditUser}
            onView={handleViewUser}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>

      {modalVisible && (
        <UserDetailModal user={selectedUser} onClose={closeModal} />
      )}

      {modalCreateVisible && (
        <UserCreateModal
          onClose={() => setModalCreateVisible(false)}
          onUserCreated={async () => {
            setModalCreateVisible(false);
            try {
              const data = await listarUsuarios();
              setUsuarios(data);
            } catch (err) {
              console.error("Error actualizando la lista:", err.message);
            }
          }}
        />
      )}

      {/* NUEVO MODAL DE EDICIÓN */}
      {modalEditVisible && userToEdit && (
        <UserEditModal
          user={userToEdit}
          onClose={() => {
            setModalEditVisible(false);
            setUserToEdit(null);
          }}
          onUpdate={async () => {
            try {
              const data = await listarUsuarios();
              setUsuarios(data);
            } catch (err) {
              console.error("Error actualizando la lista:", err.message);
            }
          }}
        />
      )}
    </div>
  );
};

export default Usuarios;