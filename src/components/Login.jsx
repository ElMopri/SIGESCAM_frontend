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
    <div className="login-background">
      <div className="login-container">
        <div className="login-card">
          <div className="login-left">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Documento:</label>
                <input
                  type="text"
                  placeholder="CC"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <a href="/forgot-password" className="forgot-link">
                  ¿Olvidó su contraseña ?
                </a>
              </div>

              <div className="form-group">
                <button type="submit">Ingresar</button>
              </div>

              {error && (
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
              )}
            </form>
          </div>

          <div className="login-right">
            <img src="/logo.png" alt="Variedades Carmencita" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
