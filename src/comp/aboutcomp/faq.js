import React, { useEffect, useState } from "react";
import client from "../../../sanity.js";
import { useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux"; // 액션 생성자를 직접 임포트
import "./faq.css";

function Faq() {
  const [faqData, setFaqData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoadingAction()); // 로딩 시작 액션 디스패치
      try {
        const query = `*[_type == "faq"][0]`;
        const data = await client.fetch(query);
        setFaqData(data);
        dispatch(dataLoadedAction()); // 데이터 로딩 완료 액션 디스패치
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        dispatch(setLoadedAction()); // 로딩 종료 액션 디스패치
      }
    };

    fetchData();
  }, [dispatch]);

  if (!faqData) {
    return null; // 데이터가 아직 로드되지 않았다면 렌더링하지 않음
  }

  return (
    <div className='faq-section'>
      <div className='faq-warp'>
        <div className='faq-title pre1-5rem'>{faqData.name}</div>
        {faqData.shortTexts &&
          faqData.shortTexts.map((shortText, index) => (
            <div key={index} className='faq-sub'>
              <div className='faq-sub-title pre1-5rem'>{shortText}</div>
              <p className='faq-detail pre1rem'>{faqData.description[index]}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Faq;
