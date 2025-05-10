import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EstructuraLogin from "./EstructuraLogin";
import "./RestablecerContraseña.css";

const RestablecerContraseña = () => {
  const [documento, setDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (documento && email) {
      navigate("/login");
    } else {
      setError("Por favor, ingrese un documento y correo válidos.");
    }
  };

  return (
    <EstructuraLogin>
      <h2>Restablecer contraseña</h2>
      <p>
        Ingrese su número de documento y la dirección de correo electrónico
        asociado con su cuenta
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group-restablecer">
          <label>Documento:</label>
          <div className="input-with-icon">
            <i className="fas fa-envelope"></i>
            <input
              type="text"
              placeholder="CC"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group-restablecer">
          <label>Email:</label>
          <div className="input-with-icon">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="button-group-restablecer">
          <button type="submit" className="restablecer-btn">
            Restablecer contraseña
          </button>
          <button
            type="button"
            className="cancelar-btn"
            onClick={() => navigate("/login")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </EstructuraLogin>
  );
};

export default RestablecerContraseña;
