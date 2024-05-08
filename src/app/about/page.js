"use client";
import "./about.css";
import React from "react";

import AboutTitle from "../../comp/aboutcomp/about-title.js";
import AboutImg from "../../comp/aboutcomp/about-img.js";
import AboutDetail from "../../comp/aboutcomp/about-detail.js";
import Faq from "../../comp/aboutcomp/faq.js";
import ContactSection from "../../comp/contactSection.js";

export default function AboutPage() {
  return (
    <div className='about-page'>
      <AboutTitle />
      <AboutImg />
      <AboutDetail />
      <ContactSection />
      <Faq />
    </div>
  );
}
