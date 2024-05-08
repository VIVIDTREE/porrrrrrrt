import React, { useEffect, useState } from "react";
import client from "../../../sanity.js";
import "./sideCategory.css";
import Link from "next/link";

function SideCategory() {
  const [menuItems, setMenuItems] = useState([]);
  const [menuLists, setMenuLists] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // 태그별 카운트 조회
        const tagQuery = `*[_type == "tag"]{ name, "count": count(*[_type == "portfolio" && references(^._id)]) }`;
        const tags = await client.fetch(tagQuery);
        const sortedTags = tags.sort((a, b) => b.count - a.count);

        // 전체 컨텐츠 갯수 조회
        const totalQuery = 'count(*[_type == "portfolio"])';
        const totalCount = await client.fetch(totalQuery);

        setMenuItems(sortedTags);
        setTotalCount(totalCount);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    // "All" 메뉴 추가
    const allMenu = { name: "All", count: totalCount };
    const updatedMenuItems = [allMenu, ...menuItems];

    // 첫 번째와 마지막 단락에 분배할 메뉴 아이템의 갯수 (All 포함)
    const firstAndLastLimit = 3;
    // 첫 번째 단락에 분배 (All 포함)
    const firstSection = updatedMenuItems.slice(0, firstAndLastLimit);

    // 마지막 단락에 분배할 시작 인덱스 계산
    const lastSectionStartIndex = Math.max(
      updatedMenuItems.length - firstAndLastLimit,
      firstAndLastLimit
    );
    // 마지막 단락에 분배
    const lastSection = updatedMenuItems.slice(lastSectionStartIndex);

    // 중간 단락에 분배
    const middleSection = updatedMenuItems.slice(
      firstAndLastLimit,
      lastSectionStartIndex
    );

    // 최종 메뉴 리스트 구성
    const newMenuLists = [firstSection, middleSection, lastSection];

    setMenuLists(newMenuLists);
  }, [menuItems, totalCount]);

  const formatCount = (count) => count.toString().padStart(2, "0");

  return (
    <div className='sideCategory-warp pre1-5rem'>
      {menuLists.map((list, listIndex) => (
        <div key={listIndex} className='sideCategory'>
          <div className='sideCategory-list'>
            {list.map((item, itemIndex) => (
              <div key={itemIndex} className='sideCategory-item'>
                <Link
                  href={`/list/${encodeURIComponent(item.name)}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className='sideCategory-tag'>{item.name}</div>
                </Link>
                <div className='sideCategory-num pre0-8rem fontNum'>
                  {formatCount(item.count)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SideCategory;
