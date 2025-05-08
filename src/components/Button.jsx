import React from "react";
import "../components/Menu.css";

const Button = ({ text, isActive, onClick, icon }) => {
  return (
    <button
      className={`menu-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
    {icon && <span className="menu-icon">{icon}</span>}
    <span>{text}</span>

    </button>
  );
};

export default Button;
