import React from "react";
import "./EstructuraLogin.css";

const EstructuraLogin = ({ children }) => {
  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-card">
          <div className="login-left">{children}</div>
          <div className="login-right">
            <img src="/logo.png" alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstructuraLogin;
