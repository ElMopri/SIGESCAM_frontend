import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dni === "123" && password === "admin") {
      navigate("/admin");
    } else if (dni === "456" && password === "gestor") {
      navigate("/gestorDeVentas");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="dni">Documento de identidad</label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
