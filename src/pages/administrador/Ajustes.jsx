import React, { useState } from "react";
import "./Ajustes.css";

const Ajustes = () => {
  const [nombre, setNombre] = useState("Diana Triana");
  const [correo, setCorreo] = useState("dianatr@gmail.com");
  const [notiSugerencias, setNotiSugerencias] = useState(true);
  const [notiProductos, setNotiProductos] = useState(true);

  const [editable, setEditable] = useState({
    nombre: false,
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

  const handleGuardar = () => {
    alert("Cambios guardados");
    setEditable({ nombre: false, correo: false });
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
              <span className="icon" onClick={() => toggleEditable("nombre")}>
                <img
                  src={
                    editable.nombre ? "/public/save.png" : "/public/create.png"
                  }
                  alt={editable.nombre ? "Guardar nombre" : "Editar nombre"}
                />
              </span>
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
