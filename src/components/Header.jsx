import React from "react";
import "./Header.css";

const Header = ({ toggleMenu }) => {
  return (
    <header className="header">
      <button className="hamburger-btn" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;
