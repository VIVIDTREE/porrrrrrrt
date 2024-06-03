"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import client from "../../../sanity.js";
import "./menu.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux.js";

const MenuContent = ({ toggleMenu }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuLists, setMenuLists] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();
  const isDataLoaded = useSelector((state) => state.isDataLoaded);

  useEffect(() => {
    const fetchMenuItemsAndCount = async () => {
      dispatch(setLoadingAction());
      try {
        const queryTags = `*[_type == "tag"]{ name, "count": count(*[_type == "portfolio" && references(^._id)]) }`;
        const tags = await client.fetch(queryTags);
        const sortedTags = tags.sort((a, b) => b.count - a.count);
        const queryTotalCount = 'count(*[_type == "portfolio"])';
        const totalCount = await client.fetch(queryTotalCount);
        setMenuItems(sortedTags);
        setTotalCount(totalCount);
      } catch (error) {
        console.error("Error fetching menu items and total count:", error);
      } finally {
        dispatch(setLoadedAction());
        dispatch(dataLoadedAction());
      }
    };

    fetchMenuItemsAndCount();
  }, [dispatch]);

  useEffect(() => {
    const updatedMenuItems = [{ name: "All", count: totalCount }, ...menuItems];
    let remainingItems = updatedMenuItems.slice(); // 나머지 아이템들을 복사

    // 첫 번째 줄은 항상 3개의 아이템
    const firstRow = remainingItems.splice(0, 3);

    // 마지막 줄은 항상 4개의 아이템
    const lastRow = remainingItems.splice(-4);

    // 남은 아이템들을 두 줄에 균등하게 분배
    const middleCount = Math.ceil(remainingItems.length / 2); // 남은 줄 수로 나누기
    const secondRow = remainingItems.splice(0, middleCount);
    const thirdRow = remainingItems;

    // 모든 줄을 최종 목록에 포함시킴
    const newMenuLists = [firstRow, secondRow, thirdRow, lastRow];
    setMenuLists(newMenuLists);
  }, [menuItems, totalCount]);

  useEffect(() => {
    function handleResize() {
      const navBarHeight = 50; // 네비게이터바의 높이
      const windowHeight = window.innerHeight;
      const newHeight = windowHeight - navBarHeight;
      document.querySelector(".menu-warp").style.height = `${newHeight}px`;
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // 컴포넌트 마운트 시 초기 크기 설정

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const formatCount = (count) => count.toString().padStart(2, "0");
  return (
    <>
      <div className='header-warp back'>
        <div className='header pre1-5rem'>
          <div className='menu' onClick={toggleMenu}>
            Menu
          </div>
          <Link
            href='/'
            as={`/`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className='logo'>
              <div className='logo-img'>
                <Image
                  src='/src/logo.png'
                  alt='로고'
                  width={2560}
                  height={900}
                  layout='responsive'
                />
              </div>
            </div>
          </Link>
          <div className='contact-btn'>
            <div className='contact' onClick={toggleMenu}>
              Close
            </div>
          </div>
        </div>
      </div>

      <div className='menu-list-warp pre1-5remNoMo'>
        {menuLists.map((list, listIndex) => (
          <div key={listIndex} className='menu-list'>
            {list.map((item, itemIndex) => (
              <div key={itemIndex} className='menu-item'>
                <Link
                  href={`/list/${encodeURIComponent(item.name)}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className='menu-tag'>{item.name}</div>
                </Link>
                <div className='menu-num pre0-8rem fontNum'>
                  {formatCount(item.count)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuContent;
