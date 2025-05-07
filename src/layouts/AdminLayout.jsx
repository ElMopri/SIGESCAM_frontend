import React from "react";
import MenuAdmin from "./MenuAdmin";
import { Outlet } from "react-router-dom";
import "./AdminLayout.css"; 

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MenuAdmin />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
