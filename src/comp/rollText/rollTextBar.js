import React, { useEffect, useRef, useState } from "react";
import "./rollTextBar.css";
import client from "../../../sanity.js";
import { useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux"; // 액션 생성자를 직접 임포트

const fetchRollTextData = async (setRollTextsData) => {
  const query = '*[_type == "rolltext"]';
  const data = await client.fetch(query);
  setRollTextsData(data);
};

const RollTextBar = () => {
  const rollingTextRef = useRef(null);
  const [rollTextsData, setRollTextsData] = useState([]);
  const dispatch = useDispatch(); // useDispatch를 호출하여 디스패치 함수를 얻음

  useEffect(() => {
    const loadRollTextData = async () => {
      dispatch(setLoadingAction()); // 로딩 시작
      await fetchRollTextData(setRollTextsData);
      dispatch(setLoadedAction()); // 로딩 종료
      dispatch(dataLoadedAction()); // 데이터 로드 완료 액션 디스패치
    };

    loadRollTextData();
  }, [dispatch]);

  useEffect(() => {
    if (!rollingTextRef.current || rollTextsData.length === 0) {
      return;
    }

    let currentPosition = 0;
    const totalWidth =
      rollingTextRef.current.offsetWidth * rollTextsData.length;
    let animationFrameId; // 애니메이션 프레임 ID를 저장할 변수

    const adjustSpeedBasedOnScreenWidth = () => {
      const screenWidth = window.innerWidth;
      const minSpeed = 0.6;
      const maxSpeed = 0.3;
      const minWidth = 390;
      const maxWidth = 2480;
      return (
        maxSpeed +
        (minSpeed - maxSpeed) *
          ((screenWidth - minWidth) / (maxWidth - minWidth))
      );
    };

    let speed = adjustSpeedBasedOnScreenWidth();

    const animate = () => {
      if (!rollingTextRef.current) {
        return; // 컴포넌트가 언마운트되어 참조가 사라진 경우 애니메이션 중지
      }
      currentPosition -= speed;
      if (Math.abs(currentPosition) >= totalWidth / 2) {
        currentPosition = 0;
      }
      rollingTextRef.current.style.transform = `translateX(${currentPosition}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      speed = adjustSpeedBasedOnScreenWidth();
    };

    window.addEventListener("resize", handleResize);
    animate();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거 및 애니메이션 프레임 요청 취소
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [rollTextsData]);

  return (
    <section className='rolling-text'>
      <div className='roll-text-wrap pre3-5rem fontLogo'>
        <div className='continuous-text' ref={rollingTextRef}>
          {rollTextsData.map((text, index) => (
            <div key={index} className='roll-text'>
              {text.description}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RollTextBar;
