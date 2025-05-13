// src/pages/administrador/Usuarios.jsx

import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import ButtonNewElements from "../../components/ButtonNewElements";
import TableElements from "../../components/User_components/TableElements";
import { listarUsuarios, obtenerPorId } from "../../api/UsuarioApi";
import UserDetailModal from "../../components/User_components/UserDetailModal";
import UserCreateModal from "../../components/User_components/UserCreateModal"; // NUEVO
import "./Usuarios.css";

const Usuarios = () => {
  const headers = ["Nombre", "Rol"];
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCreateVisible, setModalCreateVisible] = useState(false); // NUEVO

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
    console.log("Editar usuario:", usuario);
    // Aquí podrías abrir un modal en el futuro
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
    </div>
  );
};

export default Usuarios;
