"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MenuContent from "./menu";
import Link from "next/link";

import "./Header.css";

const Header = ({ logoOpacity = 1 }) => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "unset";
  }, [menu]);

  return (
    <>
      <div className='header pre1-5rem'>
        <div className='menu' onClick={toggleMenu}>
          Menu
        </div>
        <div className='logo'>
          <Link
            href='/'
            as={`/`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className='logo-img' style={{ opacity: logoOpacity }}>
              <Image
                src='/src/logo.png'
                alt='logo'
                width={2560}
                height={900}
                layout='responsive'
              />
            </div>
          </Link>
        </div>
        <div className='contact-btn'>
          <Link
            href='/about/'
            as={`/about/`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className='contact'>Contact</div>
          </Link>
        </div>
      </div>

      <div
        className={`menu-warp ${menu ? "show bg-color layout" : ""}`}
        style={{ opacity: menu ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <MenuContent toggleMenu={toggleMenu} />
      </div>
    </>
  );
};

export default Header;
