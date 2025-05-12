import React, { useState } from "react";
import "./CategoriasModal.css";
import EditarCategoriaModal from "./EditarCategoriaModal";
import iconEditar from "/EditYellow.png";
import iconDelete from "/Delete.png";

const CategoriasModal = ({ onClose }) => {
    const [categorias, setCategorias] = useState([
        { id: 1, nombre: "Mecato", descripcion: "Productos empaquetados" },
        { id: 2, nombre: "Maquillaje", descripcion: "Aperitivos que se compran entre comidas" },
        { id: 3, nombre: "Ropa", descripcion: "Prendas de vestir" },
        { id: 4, nombre: "Aseo", descripcion: "Productos de limpieza e higiene." },
        { id: 5, nombre: "Manualidades", descripcion: "Productos para crear objetos o arte" },
        { id: 6, nombre: "Dulces", descripcion: "Alimentos que tienen un sabor dulce." },
    ]);

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    const [nuevaCategoria, setNuevaCategoria] = useState({
        nombre: "",
        descripcion: "",
    });

    const handleChange = (e) => {
        setNuevaCategoria({ ...nuevaCategoria, [e.target.name]: e.target.value });
    };

    const handleAgregar = () => {
        if (nuevaCategoria.nombre && nuevaCategoria.descripcion) {
            const nueva = {
                id: categorias.length + 1,
                ...nuevaCategoria,
            };
            setCategorias([...categorias, nueva]);
            setNuevaCategoria({ nombre: "", descripcion: "" });
        }
    };

    const handleEliminar = (id) => {
        setCategorias(categorias.filter((cat) => cat.id !== id));
    };

    return (
        <div className="modal-categorias-overlay">
            <div className="modal-categorias">
                <div className="modal-header">
                    <h2>Categorías</h2>
                    <button className="btn-cerrar" onClick={onClose}>✕</button>
                </div>

                <div className="tabla-scroll">
                    <table className="tabla-categorias">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map((cat) => (
                                <tr key={cat.id}>
                                    <td>{cat.nombre}</td>
                                    <td>{cat.descripcion}</td>
                                    <td>
                                        <button className="btn-accion editar" onClick={() => setCategoriaSeleccionada(cat)}>
                                            <img src={iconEditar} alt="Editar" />
                                        </button>
                                        <button
                                            className="btn-accion eliminar"
                                            onClick={() => handleEliminar(cat.id)}
                                        >
                                            <img src={iconDelete} alt="Eliminar" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="formulario-categoria">
                    <h4>Nueva Categoría</h4>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={nuevaCategoria.nombre}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="descripcion"
                        placeholder="Descripción"
                        value={nuevaCategoria.descripcion}
                        onChange={handleChange}
                    />
                    <button className="btn-guardar" onClick={handleAgregar}>
                        Guardar
                    </button>
                </div>
            </div>
            {categoriaSeleccionada && (
                <EditarCategoriaModal
                    categoria={categoriaSeleccionada}
                    onClose={() => setCategoriaSeleccionada(null)}
                    onGuardar={(categoriaActualizada) => {
                        setCategorias((prev) =>
                            prev.map((cat) =>
                                cat.id === categoriaActualizada.id ? categoriaActualizada : cat
                            )
                        );
                        setCategoriaSeleccionada(null);
                    }}
                />
            )}
        </div>
    );
};

export default CategoriasModal;
