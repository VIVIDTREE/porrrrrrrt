import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import client from "../../../sanity.js";
import imageUrlBuilder from "@sanity/image-url";
import "./MainBanner.css";

import { useDispatch } from "react-redux";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source).url();
}

const MainBanner = ({ scale, opacity, mainBannerData }) => {
  const { name, image } = mainBannerData || {};
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const bannerRef = useRef(null);

  useEffect(() => {
    if (image && !isImageLoaded) {
      dispatch({ type: "SET_LOADING" });
    }
  }, [image, isImageLoaded, dispatch]);

  const handleLoad = () => {
    setIsImageLoaded(true); // 이미지 로드 상태 업데이트
    dispatch({ type: "SET_LOADED" }); // 로딩 완료 액션 디스패치
    dispatch({ type: "DATA_LOADED" }); // 데이터 로드 완료 액션 디스패치
  };

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

  if (!mainBannerData) {
    return null;
  }

  return (
    <div ref={bannerRef} className='main-banner'>
      <div className='logo2'>
        <div
          className='logo-img2'
          style={{ transform: `scale(${scale})`, opacity }}
        >
          <Image
            src='/src/logo.png'
            alt={name}
            width={2560}
            height={900}
            layout='responsive'
            priority
            onLoad={handleLoad}
          />
        </div>
      </div>
      <div ref={bannerRef} className='main-warp'>
        <Image
          className='main-img-warp'
          src={`${urlFor(image)}?fm=webp&auto=format`}
          alt={name}
          layout='fill'
          priority
          onLoad={handleLoad}
          style={{ opacity: isImageLoaded ? 1 : 0, transition: "opacity 0.3s" }}
        />
      </div>
    </div>
  );
};

export default MainBanner;
