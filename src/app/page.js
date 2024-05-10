"use client";
import React, { useEffect } from "react";
import CategoryAndSwiper from "../comp/bigcategory/CategorySwiper.js";
import MainGroup from "../comp/main/mainGroup.js";
import ViewAllSection from "../comp/ViewAll/viewAllSection.js";
import RollTextBar from "../comp/rollText/rollTextBar.js";
import ContactSection from "../comp/contactSection.js";
import Footer from "../comp/footer.js";
import "./index.css";

const IndexPage = () => {
  useEffect(() => {
    // 뷰포트 높이를 계산하여 main-pc 클래스에 적용
    const updateHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateHeight(); // 초기 로드와 창 크기 변경 시 높이 업데이트
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight); // 이벤트 리스너 제거
    };
  }, []);

  return (
    <main className='main-pc' style={{ height: "calc(var(--vh, 1vh) * 100)" }}>
      <MainGroup />
      <CategoryAndSwiper />
      <RollTextBar />
      <ViewAllSection />
      <ContactSection />
      <div className='main-footer'>
        <Footer />
      </div>
    </main>
  );
};

export default IndexPage;
