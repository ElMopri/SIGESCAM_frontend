import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CategoriasModal from "./CategoriasModal";
import TablaProductos from "../../components/TablaProductos";
import SearchBarProductos from "./SearchBarProductos";
import FiltroModal from "./FiltroModal";
import iconEditar from "/EditYellow.png";
import iconDelete from "/Delete.png";
import { FaPlus, FaUndo } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import "./ProductosAdmin.css";
import ModalAgregarProducto from "./ModalAgregarProducto";

import {
  obtenerProductos, // Tabla de productos
  buscarProductosPorNombreParecido, // Buscador de productos
  editarProductoPorNombre,
  activarDesactivarProductoPorNombre,
  filtrarProductos
} from "../../api/ProductoApi"; // Asegúrate de que el nombre del archivo sea correcto

import {
  registrarCompra
} from "../../api/CompraApi"; // Asegúrate de que el nombre del archivo sea correcto

import {
  obtenerCategorias
} from "../../api/CategoriaApi"; // Asegúrate de que el nombre del archivo sea correcto

const ProductosAdmin = () => {
  const [mostrarModalCategorias, setMostrarModalCategorias] = useState(false);
  const [mostrarFiltroModal, setMostrarFiltroModal] = useState(false);
  const [mostrarModalAgregarProducto, setMostrarModalAgregarProducto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nombreBusquedaTemp, setNombreBusquedaTemp] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtrosAvanzados, setFiltrosAvanzados] = useState({});
  
  const { user, setUser } = useContext(AuthContext);

  const [datos, setDatos] = useState([]);

  React.useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productos = await obtenerProductos();
        const datosTransformados = productos.map((producto) => ({
          id: producto.nombre, // Assuming nombre is unique
          producto: producto.nombre,
          categoria: producto.id_categoria,
          unidades: producto.cantidad,
          precio: producto.precio_venta,
        }));
        setDatos(datosTransformados);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const columnasAdmin = [
    { key: "producto", label: "Producto" },
    { key: "categoria", label: "Categoría" },
    { key: "unidades", label: "Unidades" },
    {
      key: "precio",
      label: "Precio",
      render: (item) => `$${item.precio.toLocaleString()}`,
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <>
          <button onClick={() => editar(item)} className="boton-icono editar">
            <img src={iconEditar} alt="Editar" className="icono-accion" />
          </button>
          <button
            onClick={() => eliminar(item.id)}
            className="boton-icono eliminar"
          >
            <img src={iconDelete} alt="Eliminar" className="icono-accion" />
          </button>
        </>
      ),
    },
  ];

  const editar = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModalAgregarProducto(true);
  };

  const eliminar = async (id) => {
    try {
      await activarDesactivarProductoPorNombre(id, false);
      setDatos(datos.filter((d) => d.id !== id));
      console.log(`Producto con id ${id} desactivado.`);
    } catch (error) {
      console.error("Error al desactivar el producto:", error);
    }
  };

  // Obtener categorías disponibles para el filtro
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([]);

  React.useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categorias = await obtenerCategorias();
        setCategoriasDisponibles(categorias.map((categoria) => categoria.nombre));
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Filtrar productos según el buscador o filtros avanzados
  React.useEffect(() => {
    const fetchProductosFiltrados = async () => {
      try {
        if (filtroNombre) { // Es el buscador
          const productos = await buscarProductosPorNombreParecido(filtroNombre);
          const datosTransformados = productos.map((producto) => ({
            id: producto.nombre,
            producto: producto.nombre,
            categoria: producto.id_categoria,
            unidades: producto.cantidad,
            precio: producto.precio_venta,
          }));
          setDatos(datosTransformados);
        } else if (
          (filtrosAvanzados.cantidad !== undefined && filtrosAvanzados.cantidad !== "") ||
          (filtrosAvanzados.categoria && filtrosAvanzados.categoria !== "") ||
          (filtrosAvanzados.precio !== undefined && filtrosAvanzados.precio !== "")
        ) {
          const productos = await filtrarProductos(
            filtrosAvanzados.cantidad || null,
            filtrosAvanzados.categoria || null,
            filtrosAvanzados.precio || null
          );
          const datosTransformados = productos.map((producto) => ({
            id: producto.nombre,
            producto: producto.nombre,
            categoria: producto.id_categoria,
            unidades: producto.cantidad,
            precio: producto.precio_venta,
          }));
          setDatos(datosTransformados);
        } else {
          const productos = await obtenerProductos();
          const datosTransformados = productos.map((producto) => ({
            id: producto.nombre,
            producto: producto.nombre,
            categoria: producto.id_categoria,
            unidades: producto.cantidad,
            precio: producto.precio_venta,
          }));
          setDatos(datosTransformados);
        }
      } catch (error) {
        console.error("Error al filtrar los productos:", error);
      }
    };

    fetchProductosFiltrados();
  }, [filtroNombre, filtrosAvanzados]);

  const revertirFiltros = () => {
    setFiltroNombre("");
    setFiltrosAvanzados({});
  };

  const agregarOActualizarProducto = async (nuevoProducto) => {
    try {
      const compraData = {
        dni: user.dni, // Obtén el DNI del usuario desde el contexto
        nombre: nuevoProducto.producto,
        categoria: nuevoProducto.categoria,
        precioVenta: nuevoProducto.precio,
        precioCompra: nuevoProducto.precioCompra,
        cantidad: nuevoProducto.cantidadAgregar,
        fechaCompra: nuevoProducto.fechaCompra,
      };
  
      // Llama a la API para registrar la compra
      await registrarCompra(compraData);
  
      // Actualiza el estado local después de registrar la compra
      const index = datos.findIndex((p) => p.producto.toLowerCase() === nuevoProducto.producto.toLowerCase());
      if (index >= 0) {
        // Actualiza
        const actualizados = [...datos];
        actualizados[index] = { ...actualizados[index], ...nuevoProducto };
        setDatos(actualizados);
      } else {
        // Agrega nuevo
        setDatos([
          ...datos,
          {
            ...nuevoProducto,
            id: datos.length + 1,
            unidades: Number(nuevoProducto.cantidadAgregar),
          },
        ]);
      }
  
      setMostrarModalAgregarProducto(false);
      setProductoSeleccionado(null);
    } catch (error) {
      console.error("Error al registrar la compra:", error);
    }
  };

  return (
    <div className="productos-admin-container">
      <div className="contenedor-centrado">
        <SearchBarProductos
          value={nombreBusquedaTemp}
          onChange={(e) => setNombreBusquedaTemp(e.target.value)}
          onSearch={() => {
            setFiltroNombre(nombreBusquedaTemp);
            setNombreBusquedaTemp("");
          }}
        />
      </div>

      <div className="contenedor-tabla">
        <div className="botones-filtro">
          <button className="btn-filtrar" onClick={() => setMostrarFiltroModal(true)}>
            Filtro <MdOutlineFilterAlt style={{ marginLeft: "8px" }} />
          </button>
          <button className="btn-revertir" onClick={revertirFiltros}>
            Revertir Filtros <FaUndo style={{ marginLeft: "4px" }} />
          </button>
        </div>
        <TablaProductos columnas={columnasAdmin} datos={datos} />
      </div>

      <div className="botones-inferiores">
        <button
          className="btn-verde"
          onClick={() => {
            setProductoSeleccionado(null);
            setMostrarModalAgregarProducto(true);
          }}
        >
          Registrar Producto <FaPlus />
        </button>
        <button className="btn-amarillo" onClick={() => setMostrarModalCategorias(true)}>
          Ver Categorías <FaPlus />
        </button>
        <button className="btn-azul">
          Registrar Venta <FaPlus />
        </button>
      </div>

      {mostrarModalCategorias && (
        <CategoriasModal onClose={() => setMostrarModalCategorias(false)} />
      )}

      {mostrarFiltroModal && (
        <FiltroModal
          categorias={categoriasDisponibles}
          onFiltrar={(valores) => {
            const sanitizados = {
              ...valores,
              cantidad: valores.cantidad !== "" && Number(valores.cantidad) < 0 ? 0 : valores.cantidad,
              precio: valores.precio !== "" && Number(valores.precio) < 0 ? 0 : valores.precio,
            };
            setFiltrosAvanzados(sanitizados);
          }}
          onClose={() => setMostrarFiltroModal(false)}
        />
      )}

      {mostrarModalAgregarProducto && (
        <ModalAgregarProducto
          categorias={categoriasDisponibles}
          productos={datos}
          onClose={() => {
            setMostrarModalAgregarProducto(false);
            setProductoSeleccionado(null);
          }}
          onSave={agregarOActualizarProducto}
          productoInicial={productoSeleccionado}
        />
      )}
    </div>
  );
};

export default ProductosAdmin;
