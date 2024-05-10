import React, { useState, useEffect } from "react";
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
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      // Delay handling the resize event until the browser has updated the viewport height
      setTimeout(() => {
        setWindowHeight(window.innerHeight);
      }, 300);
    };
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (image && !isImageLoaded) {
      dispatch({ type: "SET_LOADING" });
    }
  }, [image, isImageLoaded, dispatch]);

  const handleLoad = () => {
    setIsImageLoaded(true);
    dispatch({ type: "SET_LOADED" });
    dispatch({ type: "DATA_LOADED" });
  };

  if (!mainBannerData) {
    return null;
  }

  return (
    <div className='main-banner' style={{ height: `${windowHeight}px` }}>
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
      <div className='main-warp'>
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
