import React, { useState, useEffect, useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux";

import "./detail-img.css";

function DetailImg({ image, images, files }) {
  const dispatch = useDispatch();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const swiperRef = useRef(null);

  const allMedia = [
    ...files.map((file) => ({
      ...file,
      mimeType: file.asset.mimeType,
      url: file.asset.url,
      alt: file.alt || "Video Preview",
      isVideo: file.asset.mimeType.startsWith("video/"),
    })),
    {
      url: image.asset.url,
      alt: image.alt,
      mimeType: image.asset.mimeType || "image/jpeg",
      isVideo: (image.asset.mimeType || "image/jpeg").startsWith("video/"),
    },
    ...images.map((img) => ({
      url: img.asset.url,
      alt: img.alt,
      mimeType: img.asset.mimeType || "image/jpeg",
      isVideo: (img.asset.mimeType || "image/jpeg").startsWith("video/"),
    })),
  ];

  useEffect(() => {
    if (loadedImagesCount === allMedia.length) {
      dispatch(setLoadedAction());
    }
  }, [loadedImagesCount, allMedia.length, dispatch]);

  useEffect(() => {
    setLoadedImagesCount(0);
  }, [allMedia]);

  useEffect(() => {
    const updateContainerHeight = () => {
      const bigImageHeight =
        (document.querySelector(".img-big-con")?.offsetWidth || 0) *
        (551 / 460);
      const gridImageHeight =
        (document.querySelector(".img-mini")?.offsetWidth || 0) * (551 / 460);
      setContainerHeight(bigImageHeight + gridImageHeight);
    };

    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);
    return () => window.removeEventListener("resize", updateContainerHeight);
  }, []);

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
    updateBlurEffects(swiperRef.current);
  };

  const updateBlurEffects = (swiper) => {
    if (!swiper) return;

    // 현재 네비게이션 버튼의 활성화 상태 확인
    const isPrevActive = swiper.params.navigation && !swiper.isBeginning;
    const isNextActive = swiper.params.navigation && !swiper.isEnd;

    swiper.slides.forEach((slide) => {
      slide.querySelector(".img-mini").classList.remove("blur-effect");
    });

    // 각 조건에 맞게 블러 효과 적용
    if (isPrevActive) {
      swiper.slides[swiper.activeIndex]
        .querySelector(".img-mini")
        .classList.add("blur-effect");
    }
    if (
      isNextActive &&
      swiper.activeIndex + swiper.params.slidesPerView - 1 <
        swiper.slides.length
    ) {
      swiper.slides[swiper.activeIndex + swiper.params.slidesPerView - 1]
        .querySelector(".img-mini")
        .classList.add("blur-effect");
    }
  };

  const renderMedia = (media, isThumbnail = false) => {
    if (media.isVideo) {
      return (
        <video
          width={isThumbnail ? 460 : 920}
          height={isThumbnail ? 551 : 1102}
          controls={!isThumbnail}
          preload='metadata'
          onLoadedMetadata={
            isThumbnail
              ? (e) => {
                  e.target.currentTime = 0;
                }
              : null
          }
          src={media.url}
          type={media.mimeType}
          style={{ objectFit: "cover" }}
        >
          <source src={media.url} type={media.mimeType} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <Image
          src={media.url}
          alt={media.alt}
          width={isThumbnail ? 460 : 920}
          height={isThumbnail ? 551 : 1102}
          onLoadingComplete={() => setLoadedImagesCount((count) => count + 1)}
          onError={() => setLoadedImagesCount((count) => count + 1)}
        />
      );
    }
  };

  return (
    <div className='img-grid-warp' style={{ height: `${containerHeight}px` }}>
      <div className='img-big-warp'>
        <div className='img-big-con'>
          {allMedia[selectedImageIndex] &&
            renderMedia(allMedia[selectedImageIndex], false)}
        </div>
      </div>
      <div className='img-grid-list'>
        <Swiper
          ref={swiperRef}
          className='img-slider-warp'
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={8}
          breakpoints={{
            768: {
              slidesPerView: 5,
              spaceBetween: 8,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 8,
            },
            1920: {
              slidesPerView: 8,
              spaceBetween: 16,
            },
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateBlurEffects(swiper);
          }}
          onSlideChange={() => {
            updateBlurEffects(swiperRef.current);
          }}
        >
          {allMedia.map((media, index) => (
            <SwiperSlide key={index} className='img-slide'>
              <div
                className={`img-mini ${
                  selectedImageIndex === index ? "selected" : ""
                }`}
                onClick={() => handleImageSelect(index)}
              >
                {renderMedia(media, true)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='custom-next'>
          <Image
            src='/src/icon/right_arr_10px.png'
            width={512}
            height={512}
            alt='arr-right'
          />
        </div>
        <div className='custom-prev'>
          <Image
            src='/src/icon/left_arr2_10px.png'
            width={512}
            height={512}
            alt='arr-left'
          />
        </div>
      </div>
    </div>
  );
}

export default DetailImg;
