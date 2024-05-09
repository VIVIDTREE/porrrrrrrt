import React, { useEffect, useState } from "react";
import Image from "next/image";
import client from "../../../sanity.js"; // Sanity 클라이언트 설정 파일 경로
import imageUrlBuilder from "@sanity/image-url";
import { useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux"; // 액션 생성자를 직접 임포트
import "./about-img.css";

function AboutImg() {
  const [aboutData, setAboutData] = useState(null);
  const dispatch = useDispatch();
  const builder = imageUrlBuilder(client);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoadingAction()); // 로딩 시작 액션 디스패치
      try {
        const query = `*[_type == "about"][0]`;
        const data = await client.fetch(query);
        setAboutData(data);
        dispatch(dataLoadedAction()); // 데이터 로딩 완료 액션 디스패치
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        dispatch(setLoadedAction()); // 로딩 종료 액션 디스패치
      }
    };

    fetchData();
  }, [dispatch]);

  if (!aboutData) return null; // 데이터가 없으면 아무것도 렌더링하지 않음

  const imageSrc = aboutData?.image
    ? builder.image(aboutData.image).width(1024).height(1024).url()
    : null;

  return (
    <div className='about-img-warp'>
      <div className='about-side-text pre1-5rem'>
        {aboutData.shortTexts &&
          aboutData.shortTexts.map((text, index) => (
            <div key={index} className='side-text'>
              {text}
            </div>
          ))}
      </div>
      {imageSrc && (
        <div className='about-img'>
          <Image
            src={imageSrc}
            alt={aboutData.name}
            width={1024}
            height={1024}
          />
        </div>
      )}
    </div>
  );
}

export default AboutImg;
