import React from "react";

import Header from "../../../comp/main/Header.js";
import Footer from "../../../comp/footer.js";
import "./layout.css";

export default function Layout(props) {
  return (
    <div className='stack'>
      <div className='layout-header header-warp'>
        <Header />
      </div>
      <div className='layout-content'>{props.children}</div>
      <Footer />
    </div>
  );
}
