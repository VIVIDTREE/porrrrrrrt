import React, { useEffect, useState } from "react";
import client from "../../../sanity.js";
import "./sideCategory.css";
import Link from "next/link";

function SideCategory({ selectedTag }) {
  // selectedTag를 props로 받음
  const [menuItems, setMenuItems] = useState([]);
  const [menuLists, setMenuLists] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const tagQuery = `*[_type == "tag"]{ name, "count": count(*[_type == "portfolio" && references(^._id)]) }`;
        const tags = await client.fetch(tagQuery);
        const sortedTags = tags.sort((a, b) => b.count - a.count);
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
    const allMenu = { name: "All", count: totalCount };
    const updatedMenuItems = [allMenu, ...menuItems];
    const firstAndLastLimit = 3;
    const firstSection = updatedMenuItems.slice(0, firstAndLastLimit);
    const lastSectionStartIndex = Math.max(
      updatedMenuItems.length - firstAndLastLimit,
      firstAndLastLimit
    );
    const lastSection = updatedMenuItems.slice(lastSectionStartIndex);
    const middleSection = updatedMenuItems.slice(
      firstAndLastLimit,
      lastSectionStartIndex
    );
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
                <div className='selected-img'>
                  {selectedTag === item.name && (
                    <img src='/src/icon/arr_sele14px.png' alt='Selected' />
                  )}
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
