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
  const [swiper, setSwiper] = useState(null);
  const [isBlurEffect, setIsBlurEffect] = useState({
    first: false,
    last: false,
  });
  const swiperRef = useRef(null);

  const allImages = [...files, image, ...images].map((img) => ({
    url: img.asset.url,
    alt: img.alt || "Detail image",
  }));

  useEffect(() => {
    if (loadedImagesCount === allImages.length) {
      dispatch(setLoadedAction());
    }
  }, [loadedImagesCount, allImages.length, dispatch]);

  useEffect(() => {
    setLoadedImagesCount(0);
  }, [allImages]);

  useEffect(() => {
    if (swiper) {
      setIsBlurEffect({
        first: swiper.activeIndex > 0,
        last:
          swiper.activeIndex + swiper.params.slidesPerView <
          swiper.slides.length,
      });
    }
  }, [swiper]);

  const handleImageLoad = () => {
    setLoadedImagesCount((count) => count + 1);
  };

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
    updateBlurEffects(swiperRef.current.swiper);
  };

  const updateBlurEffects = () => {
    const swiper = swiperRef.current;
    if (!swiper) return; // swiper 인스턴스 확인

    // 현재 활성화된 슬라이드와 뷰포트 내 마지막 슬라이드 계산
    const firstVisibleSlide = swiper.slides[swiper.activeIndex];
    const lastVisibleSlide =
      swiper.slides[
        Math.min(
          swiper.activeIndex + swiper.params.slidesPerView - 1,
          swiper.slides.length - 1
        )
      ];

    // 모든 슬라이드에서 블러 효과 제거
    swiper.slides.forEach((slide) => {
      const miniImg = slide.querySelector(".img-mini");
      if (miniImg) {
        miniImg.classList.remove("blur-effect");
      }
    });

    // 조건에 따라 첫 번째와 마지막 보이는 슬라이드에 블러 효과 추가
    if (swiper.activeIndex > 0 && firstVisibleSlide) {
      // 첫 번째 슬라이드가 완전히 보이지 않을 때
      firstVisibleSlide.querySelector(".img-mini").classList.add("blur-effect");
    }
    if (
      swiper.activeIndex + swiper.params.slidesPerView < swiper.slides.length &&
      lastVisibleSlide
    ) {
      // 마지막 슬라이드가 완전히 보이지 않을 때
      lastVisibleSlide.querySelector(".img-mini").classList.add("blur-effect");
    }
  };

  // Swiper 설정에 onSwiper와 onSlideChange 콜백에서 이 함수를 호출합니다.

  return (
    <div className='img-grid-warp' style={{ height: `${containerHeight}px` }}>
      <div
        className={`img-big-warp ${isBlurEffect.first ? "blur-effect" : ""}`}
      >
        <div className='img-big-con'>
          {allImages[selectedImageIndex] && (
            <Image
              src={allImages[selectedImageIndex].url}
              alt={allImages[selectedImageIndex].alt}
              width={920}
              height={1102}
              onLoadingComplete={handleImageLoad}
              onError={handleImageLoad}
            />
          )}
        </div>
      </div>
      <div
        className={`img-grid-list ${isBlurEffect.last ? "blur-effect" : ""}`}
      >
        <Swiper
          onSwiper={setSwiper}
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
            updateBlurEffects();
          }}
          onSlideChange={() => updateBlurEffects()}
        >
          {allImages.map((img, index) => (
            <SwiperSlide key={index} className='img-slide'>
              <div
                className={`img-mini ${
                  selectedImageIndex === index ? "selected" : ""
                }`}
                onClick={() => handleImageSelect(index)}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={460}
                  height={551}
                  onLoadingComplete={() =>
                    setLoadedImagesCount((count) => count + 1)
                  }
                  onError={() => setLoadedImagesCount((count) => count + 1)}
                />
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
