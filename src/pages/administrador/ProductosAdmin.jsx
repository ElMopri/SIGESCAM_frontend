import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CategoriasModal from "../../components/CategoriasModal";
import TablaProductos from "../../components/TablaProductos";
import SearchBarProductos from "../../components/SearchBarProductos";
import FiltroModal from "../../components/FiltroModal";
import iconEditar from "/EditYellow.png";
import iconDelete from "/Delete.png";
import { FaPlus, FaUndo } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import "./ProductosAdmin.css";
import ModalAgregarProducto from "../../components/ModalAgregarProducto";
import ModalEditarProducto from "../../components/ModalEditarProducto";

import {
  obtenerProductos,
  buscarProductosPorNombreParecido,
  editarProductoPorNombre,
  activarDesactivarProductoPorNombre,
  filtrarProductos
} from "../../api/ProductoApi";

import {
  registrarCompra
} from "../../api/CompraApi";

import {
  obtenerCategorias
} from "../../api/CategoriaApi";

const ProductosAdmin = () => {
  const { user } = useContext(AuthContext);
  const [dni, setDni] = useState(user?.dni || "No hay un perfil con sesión activa");

  const [mostrarModalCategorias, setMostrarModalCategorias] = useState(false);
  const [mostrarFiltroModal, setMostrarFiltroModal] = useState(false);
  const [mostrarModalAgregarProducto, setMostrarModalAgregarProducto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nombreBusquedaTemp, setNombreBusquedaTemp] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtrosAvanzados, setFiltrosAvanzados] = useState({});
  const [mostrarModalEditarProducto, setMostrarModalEditarProducto] = useState(false);

  const [datos, setDatos] = useState([]);
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([]);

  React.useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productos = await obtenerProductos();
        const datosTransformados = productos.map((producto) => ({
          id: producto.nombre,
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

  React.useEffect(() => {
    const fetchProductosFiltrados = async () => {
      try {
        if (filtroNombre) {
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
          <button onClick={() => eliminar(item.id)} className="boton-icono eliminar">
            <img src={iconDelete} alt="Eliminar" className="icono-accion" />
          </button>
        </>
      ),
    },
  ];

  const editar = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModalEditarProducto(true);
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

  const revertirFiltros = () => {
    setFiltroNombre("");
    setFiltrosAvanzados({});
  };

  const agregarProducto = async (nuevoProducto) => {
    try {
      const compraData = {
        dni_usuario: dni,
        nombre_producto: nuevoProducto.producto,
        precio_compra: nuevoProducto.precioCompra,
        id_categoria: nuevoProducto.categoria,
        precio_venta: nuevoProducto.precio,
        cantidad_agregar: nuevoProducto.cantidadAgregar,
        fecha_compra: nuevoProducto.fechaCompra,
      };

      console.log("Datos enviados a registrarCompra:", compraData);

      await registrarCompra(compraData);

      const productos = await obtenerProductos();
      const datosTransformados = productos.map((producto) => ({
        id: producto.nombre,
        producto: producto.nombre,
        categoria: producto.id_categoria,
        unidades: producto.cantidad,
        precio: producto.precio_venta,
      }));
      setDatos(datosTransformados);

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
          onSave={agregarProducto}
          productoInicial={productoSeleccionado}
        />
      )}

      {mostrarModalEditarProducto && productoSeleccionado && (
        <ModalEditarProducto
          producto={productoSeleccionado}
          categorias={categoriasDisponibles}
          onClose={() => setMostrarModalEditarProducto(false)}
          onGuardar={(productoActualizado) => {
            setDatos((prev) =>
              prev.map((p) =>
                p.id === productoActualizado.id ? productoActualizado : p
              )
            );
            setMostrarModalEditarProducto(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductosAdmin;
