"use client";
import React from "react";
import CategoryAndSwiper from "../comp/bigcategory/CategorySwiper.js";
import MainGroup from "../comp/main/mainGroup.js";
import ViewAllSection from "../comp/ViewAll/viewAllSection.js";
import RollTextBar from "../comp/rollText/rollTextBar.js";
import ContactSection from "../comp/contactSection.js";
import Footer from "../comp/footer.js";
import "./index.css";

const IndexPage = () => {
  return (
    <main className='main-pc'>
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
