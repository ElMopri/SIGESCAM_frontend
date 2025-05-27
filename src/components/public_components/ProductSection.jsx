import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import ProductPagination from "./ProductPagination";
import { obtenerProductos, buscarProductosPorNombreParecido } from "../../api/ProductoApi";
import "./PublicProducts.css";

const PAGE_SIZE = 10;

const ProductSection = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(false);

  // Obtener productos al cargar
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const data = await obtenerProductos();
      setProductos(data);
      setTotalPaginas(Math.ceil(data.length / PAGE_SIZE));
      setPaginaActual(1);
    } catch (e) {
      setProductos([]);
      setTotalPaginas(1);
    } finally {
      setCargando(false);
    }
  };

  const handleBuscar = async () => {
    if (!busqueda.trim()) {
      cargarProductos();
      return;
    }
    setCargando(true);
    try {
      const data = await buscarProductosPorNombreParecido(busqueda.trim());
      setProductos(data);
      setTotalPaginas(Math.ceil(data.length / PAGE_SIZE));
      setPaginaActual(1);
    } catch (e) {
      setProductos([]);
      setTotalPaginas(1);
    } finally {
      setCargando(false);
    }
  };

  // Productos a mostrar en la página actual
  const productosPagina = productos.slice(
    (paginaActual - 1) * PAGE_SIZE,
    paginaActual * PAGE_SIZE
  );

  const handlePageChange = (nuevaPagina) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    setPaginaActual(nuevaPagina);
  };

  return (
    <section id="productos" className="product-section">
      <div className="product-box">
        <h2 className="product-title">Consultar Producto</h2>
        <div className="product-search-container">
          <input
            type="text"
            placeholder="Ingrese el nombre del producto"
            className="product-search"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleBuscar(); }}
            disabled={cargando}
          />
          <button className="product-search-btn" onClick={handleBuscar} disabled={cargando}>
            Buscar
          </button>
        </div>
        {cargando ? (
          <div style={{ margin: "20px 0" }}>Cargando productos...</div>
        ) : (
          <ProductTable products={productosPagina} />
        )}
        <ProductPagination
          currentPage={paginaActual}
          totalPages={totalPaginas}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default ProductSection;
