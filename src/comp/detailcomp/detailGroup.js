import React, { useState, useEffect } from "react";
import DetailImg from "./detail-img";
import DetailText from "./detail-text";
import DetailMore from "./detail-more";
import client from "../../../sanity.js";

import { useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux";

function DetailGroup({ slug }) {
  const [contentDetail, setContentDetail] = useState(null);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!slug) return;

    dispatch(setLoadingAction()); // 데이터 로딩 시작 액션 디스패치

    const query = `*[_type == "portfolio" && slug.current == $slug][0]{
      name,
      date,
      details,
      tags[]->{
        name
      },
      image{
        asset->{
          url
        }
      },
      images[]{
        asset->{
          url
        },
        alt
      },
      detailimages[]{
        asset->{
          url
        },
        alt
      },
      files[]{asset->{url, mimeType}},
      usedtools,
      hyperlink
    }`;

    client
      .fetch(query, { slug })
      .then((data) => {
        setContentDetail(data);
        setAllDataLoaded(true); // 데이터 로드 완료 상태 업데이트
        dispatch(setLoadedAction()); // 데이터 로딩 완료 액션 디스패치
      })
      .catch((error) => {
        console.error("Error fetching content detail:", error);
        dispatch(setLoadedAction()); // 데이터 로딩 실패 시에도 로딩 완료 액션 디스패치
      });
  }, [dispatch, slug]);

  useEffect(() => {
    if (allDataLoaded && allImagesLoaded) {
      dispatch(dataLoadedAction()); // 모든 데이터 및 이미지 로드 완료시
    }
  }, [allDataLoaded, allImagesLoaded, dispatch]);

  return (
    <div className='detail-list-warp'>
      {contentDetail && (
        <>
          <div className='detail-list'>
            <DetailImg
              image={contentDetail.image}
              images={contentDetail.images || []}
              files={contentDetail.files || []}
              setAllImagesLoaded={setAllImagesLoaded}
            />
            <DetailText contentDetail={contentDetail} />
          </div>
          <DetailMore detailimages={contentDetail.detailimages} />
        </>
      )}
    </div>
  );
}

export default DetailGroup;
