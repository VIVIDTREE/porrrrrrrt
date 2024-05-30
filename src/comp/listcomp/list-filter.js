import React, { useState, useEffect, useRef } from "react";
import "./list-filter.css";

function ListFilter({ onSortChange }) {
  const [isActive, setIsActive] = useState(false);
  const [currentSortType, setCurrentSortType] = useState("default");
  const activeRef = useRef(null); // btn-active를 위한 ref

  const handleToggle = () => {
    setIsActive(true);
  };

  const handleSort = (sortType) => {
    onSortChange(sortType); // 정렬 방식 변경을 부모 컴포넌트로 전달
    setCurrentSortType(sortType); // 현재 선택된 정렬 유형 업데이트
    setIsActive(false); // 메뉴 숨기기
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeRef.current && !activeRef.current.contains(event.target)) {
        setIsActive(false); // 클릭된 요소가 btn-active 외부라면 isActive를 false로 설정
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeRef]);

  return (
    <div className='list-page-view font'>
      {!isActive && (
        <button
          className='list-btn pre1-5remSlim font btn-def'
          onClick={handleToggle}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className='btn-text'>View</div>
          <div className='btn-plus'>+</div>
        </button>
      )}

      {isActive && (
        <div className='btn-active' ref={activeRef}>
          <button
            className={`list-btn pre1-5remSlim font ${
              currentSortType === "default" ? "active" : ""
            }`}
            onClick={() => handleSort("default")}
          >
            <div className='btn-text'>Default</div>
          </button>
          <button
            className={`list-btn pre1-5remSlim font ${
              currentSortType === "az" ? "active" : ""
            }`}
            onClick={() => handleSort("az")}
          >
            <div className='btn-text'>A - Z</div>
          </button>
          <button
            className={`list-btn pre1-5remSlim font ${
              currentSortType === "new" ? "active" : ""
            }`}
            onClick={() => handleSort("new")}
          >
            <div className='btn-text'>New</div>
          </button>
          <button
            className={`list-btn pre1-5remSlim font ${
              currentSortType === "list" ? "active" : ""
            }`}
            onClick={() => handleSort("list")}
          >
            <div className='btn-text'>List</div>
          </button>
        </div>
      )}
    </div>
  );
}

export default ListFilter;
