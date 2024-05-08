import React from "react";

import HeaderListPage from "../../comp/main/Header-listpage.js";
import Footer from "../../comp/footer.js";
import "./layout.css";

export default function Layout(props) {
  return (
    <div className='stack'>
      <div className='layout-header header-warp'>
        <HeaderListPage />
      </div>
      <div className='layout-content'>{props.children}</div>
      <Footer />
    </div>
  );
}
