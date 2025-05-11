import React from "react";
import "./ButtonNewElements.css";

const NewElementsButton = ({ onClick, label = "Nuevo +" }) => {
  return (
    <button className="new-element-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default NewElementsButton;
