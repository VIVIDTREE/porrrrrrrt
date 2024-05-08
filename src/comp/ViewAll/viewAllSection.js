"use client";

import React from 'react';
import CirIMG from './cirIMG.js';
import ViewAllText from './viewAllText.js';

import "./viewAllSection.css";

function ViewAllSection() {
    
    return (
    <section className="view-warp">
      <div className="view-all-warp">
        <div className="cate-img-cir"></div>
        <CirIMG />
        <ViewAllText />
        <div className="cate-img-cir"></div>
        <div className="cate-img-cir"></div>
      </div>
    </section>

  );
}

export default ViewAllSection;
