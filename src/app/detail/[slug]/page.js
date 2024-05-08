"use client";
import "./details.css";
import React from "react";
import DetailGroup from "../../../comp/detailcomp/detailGroup.js";
import SideCategory from "../../../comp/sideCategory/sideCategory.js";
import RelatedPage from "../../../comp/RelatedPage/relatedPage.js";

export default function DetailPage(props) {
  return (
    <div className='detail-page'>
      <div className='detail-page-wrap'>
        <div className='left-menu'>
          <SideCategory />
        </div>
        <DetailGroup slug={props.params.slug} />
      </div>
      <RelatedPage slug={props.params.slug} />
    </div>
  );
}
