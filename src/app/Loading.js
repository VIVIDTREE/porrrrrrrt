import React, { useEffect } from "react";
import "./loading.css"; // CSS 스타일 임포트

const Loading = ({ className }) => {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 뷰포트 높이를 계산하여 적용
    const updateHeight = () => {
      const viewportHeight = window.innerHeight + "px";
      document.querySelector(".loading-warp").style.height = viewportHeight;
    };

    updateHeight(); // 초기 높이 설정
    window.addEventListener("resize", updateHeight); // 창 크기가 변경될 때마다 높이 업데이트

    return () => {
      window.removeEventListener("resize", updateHeight); // 컴포넌트 언마운트 시 이벤트 리스너 제거
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
