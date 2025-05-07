import React from "react";
import MenuGestor from "./MenuGestor";
import { Outlet } from "react-router-dom";
import "./GestorLayout.css";

const GestorLayout = () => {
  return (
    <div className="gestor-layout">
      <MenuGestor />
      <main className="gestor-content">
        <Outlet />
      </main>
    </div>
  );
};

export default GestorLayout;
