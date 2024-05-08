import React, { useState, useEffect } from "react";
import Image from "next/image";
import client from "../../../sanity.js"; // Sanity 클라이언트를 import합니다.
import imageUrlBuilder from "@sanity/image-url"; // 이미지 URL을 생성하기 위한 헬퍼 함수를 import합니다.

import { useDispatch } from "react-redux"; // useDispatch 훅을 import합니다.
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux"; // 액션 생성자를 import합니다.

// 이미지 URL 빌더 인스턴스를 생성합니다.
const builder = imageUrlBuilder(client);

// Sanity 이미지 객체를 받아 이미지 URL을 반환하는 함수입니다.
function urlFor(source) {
  return builder.image(source);
}

function CirIMG() {
  const [images, setImages] = useState([]); // 이미지 데이터를 저장할 상태
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 활성화된 슬라이드의 인덱스
  const dispatch = useDispatch(); // useDispatch를 호출하여 디스패치 함수를 얻음

  useEffect(() => {
    const fetchImages = async () => {
      dispatch(setLoadingAction()); // 로딩 시작
      const query = '*[_type == "viewAllSlide"][0]';
      const data = await client.fetch(query);
      if (data && data.images) {
        setImages(data.images);
        dispatch(setLoadedAction()); // 로딩 종료
        dispatch(dataLoadedAction()); // 데이터 로드 완료 액션 디스패치
      } else {
        // 데이터를 가져오지 못한 경우에도 로딩 종료 처리
        dispatch(setLoadedAction()); // 로딩 종료
      }
    };

    fetchImages();
  }, [dispatch]);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [images.length]); // images.length만 의존성 배열에 포함

  return (
    <div className='cate-img-cir2'>
      {images.map((image, index) => (
        <div
          key={index}
          className={`cir-slide ${currentIndex === index ? "active" : ""}`}
        >
          <Image
            src={`${urlFor(image).url()}?fm=webp&auto=format`}
            alt={image._key}
            width={460}
            height={551}
            priority
            unoptimized={urlFor(image).url().endsWith(".webp")}
          />
        </div>
      ))}
    </div>
  );
}

export default CirIMG;
