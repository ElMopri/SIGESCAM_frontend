
import ProductTable from "./ProductTable";
import ProductPagination from "./ProductPagination";
import "./PublicProducts.css";

const ProductSection = () => {
  return (
    <section id="productos" className="product-section">
      <div className="product-box">
        <h2 className="product-title">Consultar Producto</h2>
        <div className="product-search-container">
          <input
            type="text"
            placeholder="Ingrese el nombre del producto"
            className="product-search"
          />
          <button className="product-search-btn">Buscar</button>
        </div>

        <ProductTable />
        <ProductPagination />
      </div>
    </section>
  );
};

export default ProductSection;
