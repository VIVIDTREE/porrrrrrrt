"use client";
import "./list.css";
import React, { useState } from "react";

import SideCategory from "../../../comp/sideCategory/sideCategory.js";
import Listitem from "../../../comp/listcomp/list-item.js";
import ListTitle from "../../../comp/listcomp/list-title.js";
import ListFliter from "../../../comp/listcomp/list-filter.js";

export default function ListPage(props) {
  const [sortType, setSortType] = useState("default");
  return (
    <div className='list-page'>
      <ListTitle tag={props.params.tag} />
      <div className='list-page-wrap'>
        <div className='left-menu left-menu-listpage'>
          <SideCategory />
        </div>
        <ListFliter tag={props.params.tag} onSortChange={setSortType} />
        <Listitem tag={props.params.tag} sortType={sortType} />
      </div>
    </div>
  );
}
