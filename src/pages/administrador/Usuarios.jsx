import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import ButtonNewElements from "../../components/ButtonNewElements";
import TableElements from "../../components/User_components/TableElements";
import FiltroUsuariosModal from "../../components/User_components/FiltroUsuariosModal";
import Modal from "../../components/Modal";
import { MdOutlineFilterAlt } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import {
  listarUsuarios,
  obtenerPorId,
  cambiarEstadoUsuario,
} from "../../api/UsuarioApi";
import UserDetailModal from "../../components/User_components/UserDetailModal";
import UserCreateModal from "../../components/User_components/UserCreateModal";
import UserEditModal from "../../components/User_components/UserEditModal";
import "./Usuarios.css";

const Usuarios = () => {
  const headers = ["Nombre", "Rol"];
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [mostrarFiltroModal, setMostrarFiltroModal] = useState(false);
  const [filtros, setFiltros] = useState({ rol: "", estado: "" });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    user: null,
    newStatus: null
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await listarUsuarios();
        setUsuarios(data);
        setUsuariosFiltrados(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    const filteredUsers = usuarios.filter(user => {
      const coincideNombre = user.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const coincideRol = !filtros.rol || user.rol === filtros.rol;
      const coincideEstado = !filtros.estado || user.estado === filtros.estado;
      
      return coincideNombre && coincideRol && coincideEstado;
    });
    setUsuariosFiltrados(filteredUsers);
  }, [searchTerm, usuarios, filtros]);

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
    setConfirmModal({
      show: true,
      user: dni,
      newStatus: nuevoEstado
    });
  };

  const confirmToggleStatus = async () => {
    try {
      await cambiarEstadoUsuario(confirmModal.user, confirmModal.newStatus);
      const data = await listarUsuarios();
      setUsuarios(data);
      setConfirmModal({ show: false, user: null, newStatus: null });
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("No se pudo cambiar el estado del usuario");
    }
  };

  const handleFiltrar = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  const revertirFiltros = () => {
    setFiltros({ rol: "", estado: "" });
    setSearchTerm("");
  };

  return (
    <div className="usuarios-wrapper">
      <h1 className="usuarios-title">Usuarios del sistema</h1>

      <div className="usuarios-container">
        <div className="usuarios-tools">
          <ButtonNewElements
            label="Nuevo +"
            onClick={() => setModalCreateVisible(true)}
          />
          <div className="search-filter-container">
            <div className="botones-filtro">
              <button className="btn-filtrar" onClick={() => setMostrarFiltroModal(true)}>
                <MdOutlineFilterAlt style={{ marginRight: "8px" }} />
                Filtros
              </button>
              <button className="btn-revertir" onClick={revertirFiltros}>
                <FaUndo style={{ marginRight: "8px" }} />
                Limpiar
              </button>
            </div>
            <SearchBar 
              placeholder="Buscar usuario..." 
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>

        {cargando ? (
          <p>Cargando usuarios...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <TableElements
            headers={headers}
            data={usuariosFiltrados}
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

      {mostrarFiltroModal && (
        <FiltroUsuariosModal
          onFiltrar={handleFiltrar}
          onClose={() => setMostrarFiltroModal(false)}
        />
      )}

      {/* Modal de confirmación para cambiar estado */}
      <Modal
        isOpen={confirmModal.show}
        onClose={() => setConfirmModal({ show: false, user: null, newStatus: null })}
        onConfirm={confirmToggleStatus}
        title="Confirmar cambio de estado"
        message={`¿Está seguro que desea ${confirmModal.newStatus ? 'habilitar' : 'deshabilitar'} este usuario?`}
        type="confirm"
        confirmText={confirmModal.newStatus ? "Habilitar" : "Deshabilitar"}
        cancelText="Cancelar"
      />
    </div>
  );
};

export default Usuarios;
