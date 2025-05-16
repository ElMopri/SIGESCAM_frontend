import React, { useState, useEffect, useContext } from "react";
import { editarCorreo, obtenerPorId } from "../api/UsuarioApi";
import Modal from "./Modal";
import "./AjustesBase.css";
import { AuthContext } from "../context/AuthContext";

const AjustesBase = ({ imagenPerfil, notificaciones }) => {
  const { user, setUser } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState({ correo: false });
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "confirm",
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null,
  });

  const [estadoNotificaciones, setEstadoNotificaciones] = useState(
    notificaciones.reduce((acc, noti) => {
      acc[noti.id] = true;
      return acc;
    }, {})
  );

  useEffect(() => {
    const cargarUsuario = async () => {
      if (user?.dni) {
        try {
          const usuario = await obtenerPorId(user.dni);
          setNombre(usuario.nombre || "Nombre no disponible");
          setCorreo(usuario.email || "Correo no disponible");
        } catch (error) {
          console.error("Error al cargar usuario:", error);
          setModalConfig({
            type: "error",
            title: "Error al cargar datos",
            message: "No se pudieron cargar los datos del usuario",
            onConfirm: null,
            onCancel: null,
          });
          setShowModal(true);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, [user]);

  const toggleEditable = (campo) => {
    if (editable[campo]) {
      if (campo === "correo") {
        const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regexCorreo.test(correo)) {
          setCorreo(user.email);
          setEditable({ correo: false });
          setModalConfig({
            type: "error",
            title: "Correo inválido",
            message: "Por favor, ingrese un correo válido.",
            onConfirm: null,
            onCancel: null,
          });
          setShowModal(true);
          return;
        }

        setModalConfig({
          type: "confirm",
          title: "Confirmar cambio de correo",
          message: "¿Estás segura de que deseas cambiar tu correo electrónico?",
          onConfirm: async () => {
            try {
              await handleGuardar();
              // Mostrar modal de éxito sin botones
              setModalConfig({
                type: "success",
                title: "¡Éxito!",
                message: "Correo actualizado correctamente",
                onConfirm: null,
                onCancel: null,
              });
              setShowModal(true);
              setEditable({ correo: false }); // Desactivar edición
            } catch (error) {
              // El error ya se maneja en handleGuardar
            }
          },
          onCancel: () => {
            setCorreo(user.email);
            setEditable({ correo: false });
            setShowModal(false);
          },
        });
        setShowModal(true);
      }
    } else {
      setEditable((prev) => ({ ...prev, [campo]: true }));
    }
  };

  const handleGuardar = async () => {
    try {
      await editarCorreo(user.dni, correo);
      setUser((prevUser) => ({
        ...prevUser,
        email: correo,
      }));
    } catch (error) {
      setCorreo(user.email);
      setEditable({ correo: false });
      setModalConfig({
        type: "error",
        title: "Error",
        message: error.message || "Error al actualizar el correo",
        onConfirm: null,
        onCancel: null,
      });
      setShowModal(true);
      throw error;
    }
  };

  const handleToggle = (id) => {
    setEstadoNotificaciones((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!user) {
    return <div>No hay un perfil con sesión activa</div>;
  }

  return (
    <div className="ajustes-background">
      <h1 className="titulo-ajustes">Ajustes del sistema</h1>
      <div className="settings-card">
        <h2>Cuenta</h2>
        <div className="account-section">
          <div className="profile-container">
            <img
              src={
                imagenPerfil ||
                "https://randomuser.me/api/portraits/women/65.jpg"
              }
              alt="Perfil"
              className="profile-pic"
            />
            <span className="profile-icon">
              <img src="/public/create.png" alt="Editar perfil" />
            </span>
          </div>
          <div className="input-fields">
            <div className="input-group">
              <label>Nombre de perfil</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={true}
              />
            </div>
            <div className="input-group">
              <label>Correo</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                disabled={!editable.correo}
              />
              <span className="icon" onClick={() => toggleEditable("correo")}>
                <img
                  src={
                    editable.correo ? "/public/save.png" : "/public/create.png"
                  }
                  alt={editable.correo ? "Guardar correo" : "Editar correo"}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="notifications-section">
          <h2>Notificaciones</h2>
          {notificaciones.map((noti) => (
            <div key={noti.id} className="switch">
              <span>{noti.label}</span>
              <div
                className={`toggle ${
                  estadoNotificaciones[noti.id] ? "on" : "off"
                }`}
                onClick={() => handleToggle(noti.id)}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          if (modalConfig.onCancel) modalConfig.onCancel();
        }}
        onConfirm={modalConfig.onConfirm}
        onCancel={modalConfig.onCancel}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />
    </div>
  );
};

export default AjustesBase;
