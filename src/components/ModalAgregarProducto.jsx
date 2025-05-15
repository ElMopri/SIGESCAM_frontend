import React, { useState, useEffect, useRef } from "react";
import "./ModalAgregarProducto.css";
import { FaTimes } from "react-icons/fa";

const ModalAgregarProducto = ({
  onClose,
  onSave,
  productoInicial,
  categorias,
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
  const inputRef = useRef(null);

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
    const cantidadAgregarInt = parseInt(cantidadAgregar, 10);

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
      // Si es edición, actualiza la cantidad total sumando las unidades existentes + las nuevas
      nuevoProducto.unidades = productoInicial.unidades + cantidadAgregarInt;
    } else {
      // Si es nuevo producto, asigna solo la cantidad a agregar
      nuevoProducto.unidades = cantidadAgregarInt;
    }

    onSave(nuevoProducto);
  };

  return (
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
                <li
                  key={idx}
                  onMouseDown={() => seleccionarProducto(p)} // Changed to onMouseDown
                >
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
  );
};

export default ModalAgregarProducto;