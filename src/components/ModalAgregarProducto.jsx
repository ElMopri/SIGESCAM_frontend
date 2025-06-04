import React, { useState, useEffect, useRef } from "react";
import "./ModalAgregarProducto.css";
import { FaTimes } from "react-icons/fa";
import { obtenerCategorias } from "../api/CategoriaApi";
import Modal from "./Modal"; // importa tu Modal de error aquí

const ModalAgregarProducto = ({
  onClose,
  onSave,
  productoInicial,
  productos,
}) => {
  const [nombreProducto, setNombreProducto] = useState(productoInicial?.producto || "");
  const [categoria, setCategoria] = useState(productoInicial?.categoria || "");
  const [precio, setPrecio] = useState(productoInicial?.precio || "");
  const [precioCompra, setPrecioCompra] = useState(productoInicial?.precioCompra || "");
  const [cantidadExistente, setCantidadExistente] = useState(productoInicial?.unidades || 0);
  const [cantidadAgregar, setCantidadAgregar] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [coincidencias, setCoincidencias] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [error, setError] = useState(null); // estado para manejar errores
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // controla apertura modal error

  const inputRef = useRef(null);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data.map((cat) => cat.nombre)); // si tus objetos tienen {id, nombre, descripcion}
      } catch (err) {
        console.error("Error cargando categorías:", err.message);
        setError(`Error cargando categorías: ${err.message}`);
        setIsErrorModalOpen(true);
      }
    };

    cargarCategorias();
  }, []);

  useEffect(() => {
    if (nombreProducto.trim() === "") {
      setCoincidencias([]);
      return;
    }
    const resultados = productos.filter((p) =>
      p.producto.toLowerCase().includes(nombreProducto.toLowerCase())
    );
    setCoincidencias(resultados);
  }, [nombreProducto, productos]);

  const seleccionarProducto = (producto) => {
    setNombreProducto(producto.producto);
    setCategoria(producto.categoria);
    setPrecio(producto.precio);
    setPrecioCompra(producto.precioCompra);
    setCantidadExistente(producto.unidades);
    setCoincidencias([]);
  };

  const guardar = () => {
    try {
      const cantidadAgregarInt = parseInt(cantidadAgregar, 10);
      if (isNaN(cantidadAgregarInt) || cantidadAgregarInt < 0) {
        throw new Error("La cantidad a agregar debe ser un número válido y positivo.");
      }
      if (!nombreProducto.trim()) {
        throw new Error("El nombre del producto no puede estar vacío.");
      }
      if (!categoria.trim()) {
        throw new Error("Debe seleccionar una categoría.");
      }
      if (isNaN(parseFloat(precio)) || parseFloat(precio) < 0) {
        throw new Error("El precio de venta debe ser un número válido y positivo.");
      }
      if (isNaN(parseFloat(precioCompra)) || parseFloat(precioCompra) < 0) {
        throw new Error("El precio de compra debe ser un número válido y positivo.");
      }

      const nuevoProducto = {
        ...productoInicial,
        producto: nombreProducto,
        categoria,
        precio: parseFloat(precio),
        precioCompra: parseFloat(precioCompra),
        cantidadAgregar: cantidadAgregarInt,
        fechaCompra,
      };

      if (productoInicial) {
        nuevoProducto.unidades = productoInicial.unidades + cantidadAgregarInt;
      } else {
        nuevoProducto.unidades = cantidadAgregarInt;
      }

      onSave(nuevoProducto);
    } catch (err) {
      console.error("Error guardando producto:", err.message);
      setError(`Error guardando producto: ${err.message}`);
      setIsErrorModalOpen(true);
    }
  };

  const cerrarModalError = () => {
    setIsErrorModalOpen(false);
    setError(null);
  };

  return (
    <>
      <div className="modal-agregar-overlay">
        <div className="modal-agregar">
          <FaTimes className="cerrar-icono" onClick={onClose} />
          <div className="registrar-producto">
            <h2>{productoInicial ? "Editar Producto" : "Registrar Producto"}</h2>
          </div>

          <div style={{ position: "relative" }}>
            <label htmlFor="nombreProducto">Nombre del producto</label>
            <input
              id="nombreProducto"
              type="text"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
              onBlur={() => setTimeout(() => setCoincidencias([]), 100)}
              onFocus={() => {
                if (nombreProducto.trim() !== "") {
                  const resultados = productos.filter((p) =>
                    p.producto.toLowerCase().includes(nombreProducto.toLowerCase())
                  );
                  setCoincidencias(resultados);
                }
              }}
              ref={inputRef}
            />
            {coincidencias.length > 0 && (
              <ul className="sugerencias-lista">
                {coincidencias.map((p, idx) => (
                  <li key={idx} onMouseDown={() => seleccionarProducto(p)}>
                    {p.producto}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="precio">Precio de venta</label>
            <input
              id="precio"
              type="number"
              min="0"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="precioCompra">Precio de compra</label>
            <input
              id="precioCompra"
              type="number"
              min="0"
              value={precioCompra}
              onChange={(e) => setPrecioCompra(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="cantidadExistente">Cantidad existente</label>
            <input
              id="cantidadExistente"
              type="number"
              min="0"
              value={cantidadExistente}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="cantidadAgregar">Cantidad a agregar</label>
            <input
              id="cantidadAgregar"
              type="number"
              min="0"
              value={cantidadAgregar}
              onChange={(e) => setCantidadAgregar(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="fechaCompra">Fecha de compra</label>
            <input
              id="fechaCompra"
              type="date"
              value={fechaCompra}
              onChange={(e) => setFechaCompra(e.target.value)}
            />
          </div>

          <button onClick={guardar} className="btn-registrar-modal">
            Registrar
          </button>
        </div>
      </div>

      {/* Modal de error */}
      <Modal
        isOpen={isErrorModalOpen}
        onClose={cerrarModalError}
        title="Error"
        message={error}
        type="error"
        confirmText="Cerrar"
        cancelText=""
        onConfirm={cerrarModalError}
      />
    </>
  );
};

export default ModalAgregarProducto;
