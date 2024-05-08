import React from "react";
import "./Loading.css"; // CSS 스타일 임포트

const Loading = ({ className }) => {
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
