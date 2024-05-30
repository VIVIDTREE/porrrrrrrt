// components/Header.js
import React from "react";

import Header from "./Header";
import "./Header.css";

const HeaderContent = ({ isScrolled }) => {
  const logoOpacity = isScrolled ? 1 : 0;

  return (
    <header
      className={`header-warp fixed ${
        isScrolled ? "header-bottom bg-color" : ""
      }`}
      style={{ color: "#fff" }}
    >
      <div>
        <Header logoOpacity={logoOpacity} />
      </div>
    </header>
  );
};

export default HeaderContent;
