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
  const totalImages = [...files, image, ...images].length;

  // 이미지와 파일을 합친 전체 이미지 배열 생성
  const allImages = [...files, image, ...images].map((img) => ({
    url: img.asset.url, // url을 직접 매핑
    alt: img.alt || "Detail image", // alt 텍스트가 없는 경우 기본값 사용
  }));

  useEffect(() => {
    // 모든 이미지가 로드되었는지 확인
    if (loadedImagesCount === totalImages) {
      dispatch(setLoadedAction());
    }
  }, [loadedImagesCount, totalImages, dispatch]);

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
  };

  return (
    <div className='img-grid-warp' style={{ height: `${containerHeight}px` }}>
      <div className='img-big-warp'>
        <div className='img-big-con'>
          {allImages[selectedImageIndex] && (
            <Image
              src={`${allImages[selectedImageIndex].url}?fm=webp&auto=format`}
              alt={allImages[selectedImageIndex].alt}
              width={920}
              height={1102}
              priority
              onLoadingComplete={() =>
                setLoadedImagesCount((count) => count + 1)
              }
              unoptimized={allImages[selectedImageIndex].url.endsWith(".webp")}
            />
          )}
        </div>
      </div>
      <div className='img-grid-list'>
        <Swiper
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
          onSlideChange={({ activeIndex }) => handleImageSelect(activeIndex)}
        >
          {allImages.map((img, index) => (
            <SwiperSlide className='img-slide' key={index}>
              <div
                className={`img-mini ${
                  selectedImageIndex === index ? "selected" : ""
                }`}
                onClick={() => handleImageSelect(index)}
              >
                <Image
                  src={`${img.url}?fm=webp&auto=format`}
                  alt={img.alt}
                  width={460}
                  height={551}
                  onLoadingComplete={() =>
                    setLoadedImagesCount((count) => count + 1)
                  }
                  unoptimized={img.url.endsWith(".webp")}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='custom-next'>
          <Image
            src='/src/icon/right_arr.png'
            width={512}
            height={512}
            alt='arr-right'
          />
        </div>
        <div className='custom-prev'>
          <Image
            src='/src/icon/left_arr2.png'
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
