import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ placeholder = "Buscar...", onChange, value }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="search-input"
      />
      <button className="search-button">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
