import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Ajustes.css";
import { editarCorreo } from "../../api/UsuarioApi";

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

  const [editable, setEditable] = useState({
    correo: false,
  });

  const toggleEditable = (campo) => {
    // Si ya está habilitado, al hacer clic se guarda y desactiva
    if (editable[campo]) {
      // Aquí podrías agregar lógica adicional para guardar individualmente
      setEditable((prev) => ({ ...prev, [campo]: false }));
    } else {
      setEditable((prev) => ({ ...prev, [campo]: true }));
    }
  };

  const handleGuardar = async () => {
    const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexCorreo.test(correo)) {
      alert("Por favor, ingrese un correo válido.");
      return;
    }
    try {
      await editarCorreo(user.dni, correo);
      alert("Correo actualizado correctamente");
      setEditable({ nombre: false, correo: false });
    } catch (error) {
      alert(error.message);
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
    </div>
  );
};

export default Ajustes;
