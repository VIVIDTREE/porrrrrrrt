import React, { useEffect } from "react";
import "./loading.css"; // CSS 스타일 임포트

const Loading = ({ className }) => {
  useEffect(() => {
    // 뷰포트 높이를 계산하고 업데이트하는 함수
    const updateHeight = () => {
      const viewportHeight = window.innerHeight + "px";
      document.querySelector(".loading-warp").style.height = viewportHeight;
    };

    // 초기 로드 시 및 창 크기 변경, 탭 가시성 변경 시 높이 업데이트
    updateHeight();
    window.addEventListener("resize", updateHeight);
    document.addEventListener("visibilitychange", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight); // 이벤트 리스너 제거
      document.removeEventListener("visibilitychange", updateHeight);
    };
  }, []);

  return (
    <div className={`loading-warp ${className}`}>
      <div className='noise'></div>
      <video autoPlay loop muted playsInline className='loading-av'>
        <source src='/src/loading.mp4' type='video/mp4' />
      </video>
    </div>
  );
};

export default Loading;
