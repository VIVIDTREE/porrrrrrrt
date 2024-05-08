import React, { useEffect, useState } from "react";
import client from "../../../sanity.js";
import { useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux"; // 액션 생성자를 직접 임포트
import "./about-detail.css";

function AboutDetail() {
  const [aboutData, setAboutData] = useState(null);
  const dispatch = useDispatch();

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

  if (!aboutData) {
    return null; // 데이터가 아직 로드되지 않았다면 렌더링하지 않음
  }

  return (
    <div className='about-detail-wrap '>
      <div className='about-main-text pre1-5rem'>
        {aboutData.description} {/* 대표 설명 렌더링 */}
      </div>
      <div className='about-detail-text pre1rem'>
        {/* 상세 설명 문자열을 개행 문자로 분할하여 각 문단을 <p> 태그로 래핑 */}
        {aboutData.descriptions.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default AboutDetail;
