import React from "react";
import SearchBar from "../../components/SearchBar";
import ButtonNewElements from "../../components/ButtonNewElements";
import TableElements from "../../components/User_components/TableElements";
import "./Usuarios.css";


const Usuarios = () => {
  const headers = ["Nombre", "Rol", "Email", "Telefono", "Estado"];

  const dataUsuarios = [
    {
      nombre: "Carmen Luna",
      rol: "Gestora de ventas",
      email: "Carmenluna@gmail.com",
      telefono: "3501265978",
      estado: "Habilitado",
    },
    {
      nombre: "Monica Rojas",
      rol: "Gestora de ventas",
      email: "Monicarojas@gmail.com",
      telefono: "3204895472",
      estado: "Deshabilitado",
    },
  ];

  const handleEditUser = (usuario) => {
    console.log("Editar usuario:", usuario);
    // Aquí más adelante puedes abrir un modal de edición
  };

  return (
  <div className="usuarios-wrapper">
    <h1 className="usuarios-title">Usuarios del sistema</h1>

    <div className="usuarios-container">
      <div className="usuarios-tools">
        <ButtonNewElements label="Nuevo +" />
        <SearchBar placeholder="Buscar usuario..." />
      </div>

      <TableElements
        headers={headers}
        data={dataUsuarios}
        onEdit={handleEditUser}
      />
    </div>
  </div>
);

};

export default Usuarios;
