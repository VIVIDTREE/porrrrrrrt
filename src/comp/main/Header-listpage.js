"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MenuContent from "./menu";
import Link from "next/link";

import "./Header.css";
const HeaderListPage = () => {
  const [menu, setMenu] = useState(false);
  // 로고 스타일의 초기 상태에서 translateY 값을 -100px로 설정
  const [logoStyle, setLogoStyle] = useState({
    transform: "translateY(-100px)",
    transition: "transform 0.2s ease-out",
  });

  const toggleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "unset";
  }, [menu]);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤에 따라 조정될 translateY 값. 스크롤 위치에 따라 -100px에서 최대 0px까지 증가
      const translateY = Math.min(window.scrollY * 0.8 - 100, 0);

      setLogoStyle({
        transform: `translateY(${translateY}px)`,
        transition: "transform 0.2s ease-out",
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <div className='logo-img' style={logoStyle}>
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
          <div className='contact'>Contact</div>
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

export default HeaderListPage;
