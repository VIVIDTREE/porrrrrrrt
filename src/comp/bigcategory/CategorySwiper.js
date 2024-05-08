"use client";

import React, { useState } from 'react';
import BigCategory from './BigCategory.js';
import MySwiperComponent from './swiper.js';
import "./CategorySwiper.css";

function CategoryAndSwiper() {
  const [activeCategory, setActiveCategory] = useState('Resume');

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      <section className="cate-main">
        <BigCategory activeCategory={activeCategory} setActiveCategory={handleCategoryChange} />
      </section>

      <section className="main-slide">
        <div className={`swiper-1 big-cate-1 ${activeCategory ? 'active-slide' : ''}`}>
          <MySwiperComponent activeCategory={activeCategory} />
        </div>
      </section>
    </>
  );
}

export default CategoryAndSwiper;


