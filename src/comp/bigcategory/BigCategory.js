import React, { useEffect, useState, useRef } from "react";
import client from "../../../sanity.js";
import "./BigCategory.css";

const BigCategory = ({ activeCategory, setActiveCategory }) => {
  const [categories, setCategories] = useState([]);
  const scrollContainer = useRef(null);
  const isDragging = useRef(false);
  const startPosition = useRef(0);
  const scrollPosition = useRef(0);

  useEffect(() => {
    const fetchCategoriesAndCounts = async () => {
      const query = `
      *[_type == "mainCategory"]{
        name,
        description,
        "tags": tags[]->{
          _id,
          name,
          "count": count(*[_type == "portfolio" && references(^._id)])
        }
      }`;
      try {
        const result = await client.fetch(query);
        const transformed = result.map((cat) => ({
          title: cat.name,
          detail: cat.description,
          num: cat.tags
            .reduce((acc, tag) => acc + tag.count, 0)
            .toString()
            .padStart(2, "0"),
        }));
        setCategories(transformed);
        if (transformed.length > 0) {
          setActiveCategory(transformed[0].title);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategoriesAndCounts();
  }, []);

  const handleMouseEvents = (event) => {
    const slider = scrollContainer.current;
    switch (event.type) {
      case "mousedown":
        isDragging.current = true;
        startPosition.current = event.pageX - slider.offsetLeft;
        scrollPosition.current = slider.scrollLeft;
        break;
      case "mousemove":
        if (isDragging.current) {
          const x = event.pageX - slider.offsetLeft;
          const walk = x - startPosition.current;
          slider.scrollLeft = scrollPosition.current - walk;
        }
        break;
      case "mouseup":
      case "mouseleave":
        isDragging.current = false;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const slider = scrollContainer.current;
    slider.addEventListener("mousedown", handleMouseEvents);
    slider.addEventListener("mousemove", handleMouseEvents);
    slider.addEventListener("mouseup", handleMouseEvents);
    slider.addEventListener("mouseleave", handleMouseEvents);

    return () => {
      slider.removeEventListener("mousedown", handleMouseEvents);
      slider.removeEventListener("mousemove", handleMouseEvents);
      slider.removeEventListener("mouseup", handleMouseEvents);
      slider.removeEventListener("mouseleave", handleMouseEvents);
    };
  }, []);

  return (
    <div className='cate-big-warp'>
      <div className='cate-big cate-big-font' ref={scrollContainer}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`cate-big2 ${
              activeCategory === category.title
                ? "active"
                : "unactive font-sub-color"
            }`}
            onClick={() => setActiveCategory(category.title)}
          >
            <div className='cate-big-title'>{category.title}</div>
            <div className='cate-big-num pre1rem'>{category.num}</div>
          </div>
        ))}
      </div>
      <div className='cate-big-detail pre1rem'>
        <div className='cate-big-detail-text'>
          {
            categories.find((category) => category.title === activeCategory)
              ?.detail
          }
        </div>
      </div>
    </div>
  );
};

export default BigCategory;
