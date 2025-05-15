import React from "react";
import "./Sugerencias.css";

const TabSugerencia = ({ onVerAceptadas, onVerRechazadas }) => {
  return (
    <div className="tabs-sugerencias">
      <button className="btn-aceptadas" onClick={onVerAceptadas}>Ver sugerencias aceptadas</button>
      <button className="btn-rechazadas" onClick={onVerRechazadas}>Ver sugerencias rechazadas</button>
    </div>
  );
};

export default TabSugerencia;
