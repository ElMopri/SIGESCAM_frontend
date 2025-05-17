import React from "react";

const TabSugerencia = ({ onVerAceptadas, onVerRechazadas }) => {
  return (
    <div className="tabs-sugerencias">
      <button className="btn-aceptadas" onClick={onVerAceptadas}>Ver sugerencias aceptadas</button>
      <button className="btn-rechazadas" onClick={onVerRechazadas}>Ver sugerencias rechazadas</button>
    </div>
  );
};

export default TabSugerencia;
