import React, { useState } from "react";
import "./AjustesBase.css";

const AjustesBase = ({ rol, notificaciones }) => {
  const [nombre, setNombre] = useState("Diana Triana");
  const [correo, setCorreo] = useState("dianatr@gmail.com");

  const [notiEstado, setNotiEstado] = useState(() => {
    const estadosIniciales = {};
    notificaciones.forEach((n) => (estadosIniciales[n.key] = true));
    return estadosIniciales;
  });

  const [editable, setEditable] = useState({ nombre: false, correo: false });

  const toggleEditable = (campo) => {
    setEditable((prev) => ({ ...prev, [campo]: !prev[campo] }));
  };

  const handleGuardar = () => {
    alert(`Cambios guardados para ${rol}`);
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
          <p>Notificaciones para {rol}</p>
          {notificaciones.map((noti) => (
            <div className="switch" key={noti.key}>
              <span>{noti.label}</span>
              <div
                className={`toggle ${notiEstado[noti.key] ? "on" : "off"}`}
                onClick={() =>
                  setNotiEstado((prev) => ({
                    ...prev,
                    [noti.key]: !prev[noti.key],
                  }))
                }
              ></div>
            </div>
          ))}
        </div>

        <button className="save-button" onClick={handleGuardar}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default AjustesBase;
