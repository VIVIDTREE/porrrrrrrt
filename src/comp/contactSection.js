import React, { useEffect, useState } from "react";
import client from "../../sanity.js";
import "./contactSection.css";

// Redux 관련 임포트
import { useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../app/LoadManagerWithRedux"; // 액션 생성자를 직접 임포트

function ContactSection() {
  const [contactData, setContactData] = useState({
    name: "",
    descriptions: "",
    shortTexts: "",
  });
  const dispatch = useDispatch(); // Redux store의 dispatch 함수 사용

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoadingAction()); // 로딩 시작 액션 디스패치
      try {
        const query = '*[_type == "contact"][0]';
        const data = await client.fetch(query);
        setContactData({
          name: data.name,
          descriptions: data.descriptions,
          shortTexts: data.shortTexts,
        });
        dispatch(dataLoadedAction()); // 데이터 로딩 완료 액션 디스패치
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        dispatch(setLoadedAction()); // 로딩 종료 액션 디스패치
      }
    };

    fetchData();
  }, [dispatch]); // dispatch를 useEffect의 의존성 배열에 추가

  // descriptions를 줄바꿈 문자로 분리하여 각 줄을 div로 래핑
  const contactLines = contactData.descriptions
    .split("\n")
    .map((line, index) => (
      <div key={index} className='email'>
        {line}
      </div>
    ));

  return (
    <section className='contact-warp'>
      <div className='contact-box'>
        <div className='cir-title pre1-5remB'>
          <div className='contact2'>{contactData.name}</div>
          <div className='ellipse-1'></div>
        </div>
        <div className='contact-text pre1rem'>{contactLines}</div>
        <a target='_blank' href='mailto:koomi109@naver.com'>
          <div className='s-btn-blk pre1rem'>
            <div className='email-me'>{contactData.shortTexts}</div>
          </div>
        </a>
      </div>
    </section>
  );
}

export default ContactSection;
