import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./loading.css";

const LoadManager = ({ children }) => {
  const isLoading = useSelector((state) => state.isLoading);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // 로딩 중 스크롤 복원 비활성화
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (isLoading) {
      window.scrollTo(0, 0); // 로딩 상태가 활성화될 때 스크롤 위치를 최상단으로 이동
      document.body.style.overflow = "hidden"; // 스크롤 비활성화
      setHide(false); // 로딩 컴포넌트를 보여주고 다른 컨텐츠를 숨김
    } else {
      setHide(true);
    }

    return () => {
      // 컴포넌트 언마운트 시 스크롤 복원 기능 복구
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, [isLoading]);

  useEffect(() => {
    document.body.style.overflow = hide ? "auto" : "hidden"; // hide 상태에 따라 스크롤을 제어
  }, [hide]);

  return (
    <>
      <Loading className={hide ? "hide" : ""} />
      {children}
    </>
  );
};

export default LoadManager;
