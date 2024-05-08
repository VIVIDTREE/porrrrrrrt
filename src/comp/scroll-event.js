

import React, { useEffect, useState } from 'react';

const getMinScale = (viewportWidth) => {
  if (viewportWidth <= 380) {
    return 0.38;
  } else if (viewportWidth <= 600) {
    return 0.35;
  } else if (viewportWidth <= 768) {
    return 0.25; 
  } else if (viewportWidth <= 1200) {
    return 0.20;
  } else if (viewportWidth <= 1600) {
    return 0.15;
  } else if (viewportWidth <= 1900) {
    return 0.12;
  } else if (viewportWidth <= 2300) {
    return 0.09; 
  } else if (viewportWidth <= 2700) {
    return 0.07; 
  } else if (viewportWidth <= 3100) {
    return 0.06; // 화면 너비의 12% (3100픽셀 이하)
  } else {
    return 0.05;
  }
};

const HeaderAndLogoControl = () => {
  const [state, setState] = useState({
    scale: 1,
    headerOpacity: 1,
    headerBottomOpacity: 0,
    logoOpacity: 1,
  });

  useEffect(() => {
    const adjustHeaderAndLogoVisibility = () => {
      const viewportWidth = window.innerWidth;
      const mainView = document.querySelector('.main-view');
      const mainViewRect = mainView.getBoundingClientRect();
      const startFadeOffset = 60; // 시작점을 60px로 조정

      const minScale = getMinScale(viewportWidth);

      let dynamicScale = ((mainViewRect.bottom - startFadeOffset) / (window.innerHeight - startFadeOffset)) * (1 - minScale) + minScale;
      dynamicScale = Math.max(dynamicScale, minScale);

      if (mainViewRect.bottom <= startFadeOffset) {
        setState({
          scale: dynamicScale,
          headerOpacity: 0,
          headerBottomOpacity: 1,
          logoOpacity: 0,
        });
      } else {
        setState({
          scale: dynamicScale,
          headerOpacity: 1,
          headerBottomOpacity: 0,
          logoOpacity: 1,
        });
      }
    };

    window.addEventListener('scroll', adjustHeaderAndLogoVisibility);
    adjustHeaderAndLogoVisibility();

    return () => window.removeEventListener('scroll', adjustHeaderAndLogoVisibility);
  }, []);

  return (
    <div>
      <div className="header-warp" style={{ opacity: headerOpacity, transition: 'opacity 0.6s linear' }}>Header</div>
      <div className="header-bottom" style={{ opacity: headerBottomOpacity, transition: 'opacity 0.2s linear, visibility 0s linear 0.2s' }}>Header Bottom</div>
      <div className="main-view">Main View</div>
      <div className="logo-img2" style={{ opacity: logoOpacity, transform: `scale(${scale})`, transition: 'opacity 0.5s' }}>Logo</div>
    </div>
  );
};

export default HeaderAndLogoControl;


