import React, { useState, useEffect, useRef } from "react";
import "./ModalAgregarProducto.css";
import { FaTimes } from "react-icons/fa";
import Modal from "./Modal";
import { obtenerCategorias } from "../api/CategoriaApi"

const ModalAgregarProducto = ({
  onClose,
  onSave,
  productoInicial,
  categorias: categoriasProp,
  productos,
}) => {
  const [nombreProducto, setNombreProducto] = useState(productoInicial?.producto || "");
  const [categoria, setCategoria] = useState(productoInicial?.categoria || "");
  const [precio, setPrecio] = useState(productoInicial?.precio || "");
  const [precioCompra, setPrecioCompra] = useState(productoInicial?.precioCompra || "");
  const [cantidadExistente, setCantidadExistente] = useState(productoInicial?.unidades || 0);
  const [cantidadAgregar, setCantidadAgregar] = useState("");
  const [categorias, setCategorias] = useState(categoriasProp || []);
  const [fechaCompra, setFechaCompra] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [coincidencias, setCoincidencias] = useState([]);
  const [errorModal, setErrorModal] = useState({ show: false, message: "" });
  const inputRef = useRef(null);
  const ignoreBlur = useRef(false);

 useEffect(() => {
  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data.map((cat) => cat.nombre));
    } catch (error) {
      console.error("Error cargando categorías:", error.message);
    }
  };

  cargarCategorias();
}, []);
  
  useEffect(() => {
    const textoBusqueda = nombreProducto.trimStart();
    if (textoBusqueda === "") {
      setCoincidencias([]);
      return;
    }
    const resultados = productos.filter((p) =>
      p.producto.toLowerCase().includes(textoBusqueda.toLowerCase())
    );
    setCoincidencias(resultados);
  }, [nombreProducto, productos]);

  const handleNombreProductoChange = (e) => {
    const valor = e.target.value;
    // Eliminar espacios al inicio mientras se escribe
    const valorSinEspacios = valor.replace(/^\s+/, '');
    setNombreProducto(valorSinEspacios);
  };

  const handleKeyDown = (e) => {
    // Si el input está vacío o solo contiene espacios, prevenir la entrada de espacios
    if ((nombreProducto === '' || /^\s+$/.test(nombreProducto)) && e.key === ' ') {
      e.preventDefault();
    }
  };

  const seleccionarProducto = (producto) => {
    setNombreProducto(producto.producto);
    setCategoria(producto.categoria);
    setPrecio(producto.precio);
    setPrecioCompra(producto.precioCompra);
    setCantidadExistente(producto.unidades);
    setCoincidencias([]);
  };

  const guardar = () => {
    // Validar campos requeridos
    if (!nombreProducto.trim()) {
      setErrorModal({
        show: true,
        message: "Por favor ingrese el nombre del producto"
      });
      return;
    }
    if (!categoria) {
      setErrorModal({
        show: true,
        message: "Por favor seleccione una categoría"
      });
      return;
    }
    if (!precio || precio <= 0) {
      setErrorModal({
        show: true,
        message: "Por favor ingrese un precio de venta válido"
      });
      return;
    }
    if (!precioCompra || precioCompra <= 0) {
      setErrorModal({
        show: true,
        message: "Por favor ingrese un precio de compra válido"
      });
      return;
    }
    if (!cantidadAgregar || cantidadAgregar <= 0) {
      setErrorModal({
        show: true,
        message: "Por favor ingrese una cantidad válida a agregar"
      });
      return;
    }

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
      nuevoProducto.unidades = productoInicial.unidades + cantidadAgregarInt;
    } else {
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
    onChange={handleNombreProductoChange}
    onKeyDown={handleKeyDown}
    onBlur={() => {
      if (!ignoreBlur.current) {
        setCoincidencias([]);
      }
    }}
    onFocus={() => {
      const textoBusqueda = nombreProducto.trimStart();
      if (textoBusqueda !== "") {
        const resultados = productos.filter((p) =>
          p.producto.toLowerCase().includes(textoBusqueda.toLowerCase())
        );
        setCoincidencias(resultados);
      }
    }}
    ref={inputRef}
  />
  {coincidencias.length > 0 && (
    <ul
      className="sugerencias-lista"
      onMouseDown={() => {
        ignoreBlur.current = true;
      }}
      onMouseUp={() => {
        ignoreBlur.current = false;
        inputRef.current?.focus(); // Volver a enfocar el input si es necesario
      }}
    >
      {coincidencias.map((p, idx) => (
        <li key={idx} onClick={() => seleccionarProducto(p)}>
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

      <Modal
        isOpen={errorModal.show}
        onClose={() => setErrorModal({ show: false, message: "" })}
        title="Error"
        message={errorModal.message}
        type="error"
      />
    </div>
  );
};

export default ModalAgregarProducto;