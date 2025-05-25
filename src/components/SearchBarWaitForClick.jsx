import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBarWaitForClick.css";

const SearchBarWaitForClick = ({ placeholder="Buscar...", value, onChange, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
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

export default SearchBarWaitForClick;
