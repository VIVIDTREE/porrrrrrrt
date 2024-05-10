"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "./HeaderContent";
import MainBanner from "./MainBanner";
import "./mainGroup.css";
import client from "../../../sanity.js";

const MainGroup = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoScale, setLogoScale] = useState(1);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [mainBannerData, setMainBannerData] = useState(null); // 상태 이름은 그대로 유지
  const bannerRef = useRef(null);
  useEffect(() => {
    const adjustHeaderAndLogoVisibility = () => {
      const viewportWidth = window.innerWidth;
      const mainView = document.querySelector(".main-view");
      if (mainView) {
        const mainViewRect = mainView.getBoundingClientRect();
        const startFadeOffset = 60;

        const minScale = getMinScale(viewportWidth);
        let dynamicScale =
          ((mainViewRect.bottom - startFadeOffset) /
            (window.innerHeight - startFadeOffset)) *
            (1 - minScale) +
          minScale;
        dynamicScale = Math.max(dynamicScale, minScale);

        setLogoScale(dynamicScale);

        if (mainViewRect.bottom <= startFadeOffset) {
          setIsScrolled(true);
          setHeaderOpacity(0);
          setLogoOpacity(0);
        } else {
          setIsScrolled(false);
          setHeaderOpacity(1);
          setLogoOpacity(1);
        }
      }
    };

    window.addEventListener("scroll", adjustHeaderAndLogoVisibility);
    adjustHeaderAndLogoVisibility();

    return () =>
      window.removeEventListener("scroll", adjustHeaderAndLogoVisibility);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      const viewportHeight = window.innerHeight + "px";
      if (bannerRef.current) {
        bannerRef.current.style.height = viewportHeight;
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    document.addEventListener("visibilitychange", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      document.removeEventListener("visibilitychange", updateHeight);
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const fetchedMainBannerData = await client.fetch(
        `*[_type == "mainBanner"][0]`
      );
      setMainBannerData(fetchedMainBannerData);
    };

    loadData();
  }, []);

  const scaleValues = [
    { max: 380, scale: 0.38 },
    { max: 600, scale: 0.35 },
    { max: 768, scale: 0.25 },
    { max: 1200, scale: 0.2 },
    { max: 1600, scale: 0.15 },
    { max: 1900, scale: 0.12 },
    { max: 2300, scale: 0.09 },
    { max: 2700, scale: 0.07 },
    { max: 3100, scale: 0.06 },
    { max: Infinity, scale: 0.05 },
  ];

  const getMinScale = (viewportWidth) => {
    return scaleValues.find(({ max }) => viewportWidth <= max).scale;
  };

  return (
    <section className='main-view pre1-5rem' ref={bannerRef}>
      <Header isScrolled={isScrolled} scale={logoScale} opacity={logoOpacity} />
      <MainBanner
        scale={logoScale}
        opacity={headerOpacity}
        mainBannerData={mainBannerData}
      />
    </section>
  );
};

export default MainGroup;
