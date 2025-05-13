import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Ajustes.css";
import { editarCorreo } from "../../api/UsuarioApi";
import Modal from "../../components/Modal";

const Ajustes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [nombre, setNombre] = useState(
    user?.nombre || "No hay un perfil con sesión activa"
  );
  const [correo, setCorreo] = useState(
    user?.email || "No hay un perfil con sesión activa"
  );
  const [notiSugerencias, setNotiSugerencias] = useState(true);
  const [notiProductos, setNotiProductos] = useState(true);

  // Estados para el modal
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "confirm",
    title: "",
    message: "",
    onConfirm: null,
  });

  const [editable, setEditable] = useState({
    correo: false,
  });

  const toggleEditable = (campo) => {
    if (editable[campo]) {
      // Validar antes de guardar
      if (campo === "correo") {
        const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regexCorreo.test(correo)) {
          setModalConfig({
            type: "confirm",
            title: "Correo inválido",
            message: "Por favor, ingrese un correo válido.",
            onConfirm: () => setShowModal(false),
          });
          setShowModal(true);
          return;
        }

        // Mostrar modal de confirmación para cambiar correo
        setModalConfig({
          type: "confirm",
          title: "Confirmar cambio de correo",
          message: "¿Estás seguro de que deseas cambiar tu correo electrónico?",
          onConfirm: () => {
            handleGuardar();
            setShowModal(false);
          },
        });
        setShowModal(true);
      }
      setEditable((prev) => ({ ...prev, [campo]: false }));
    } else {
      setEditable((prev) => ({ ...prev, [campo]: true }));
    }
  };

  const handleGuardar = async () => {
    try {
      await editarCorreo(user.dni, correo);

      // Mostrar modal de éxito
      setModalConfig({
        type: "success",
        title: "¡Éxito!",
        message: "Correo actualizado correctamente",
        onConfirm: () => {
          setShowModal(false);
          setEditable({ nombre: false, correo: false });
          // Actualizar el contexto si es necesario
          setUser({ ...user, email: correo });
        },
      });
      setShowModal(true);
    } catch (error) {
      setModalConfig({
        type: "confirm",
        title: "Error",
        message: error.message || "Error al actualizar el correo",
        onConfirm: () => setShowModal(false),
      });
      setShowModal(true);
    }
  };

  return (
    <div className="ajustes-background">
      <h1 className="titulo-ajustes">Ajustes del sistema</h1>

      <div className="settings-card">
        <h2>Cuenta</h2>
        <div className="account-section">
          <div className="profile-container">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
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
                disabled={!editable.nombre}
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
          <p>Notificaciones</p>

          <div className="switch">
            <span>Activar notificaciones de sugerencias</span>
            <div
              className={`toggle ${notiSugerencias ? "on" : "off"}`}
              onClick={() => setNotiSugerencias(!notiSugerencias)}
            ></div>
          </div>

          <div className="switch">
            <span>Activar notificaciones de productos</span>
            <div
              className={`toggle ${notiProductos ? "on" : "off"}`}
              onClick={() => setNotiProductos(!notiProductos)}
            ></div>
          </div>
        </div>

        <button className="save-button" onClick={handleGuardar}>
          Guardar
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />
    </div>
  );
};

export default Ajustes;
