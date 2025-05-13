import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBarProductos.css";

const SearchBarProductos = ({ value, onChange, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={value}
        onChange={onChange}
        className="search-input"
      />
      <button className="search-button" onClick={onSearch}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBarProductos;
