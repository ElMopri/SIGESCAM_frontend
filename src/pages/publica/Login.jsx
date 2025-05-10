import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EstructuraLogin from "./EstructuraLogin";
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
    <EstructuraLogin>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dni">Documento:</label>
          <input
            id="dni"
            type="text"
            placeholder="CC"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="/RestablecerContraseña" className="forgot-link">
            ¿Olvidó su contraseña?
          </a>
        </div>

        <div className="form-group">
          <button type="submit">Ingresar</button>
        </div>

        {error && <p className="login-error">{error}</p>}
      </form>
    </EstructuraLogin>
  );
};

export default Login;
