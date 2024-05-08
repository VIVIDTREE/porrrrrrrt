import React, { useEffect, useState } from "react";
import client from "../../../sanity.js";
import Link from "next/link";

import { useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux"; // 액션 생성자를 직접 임포트

function ViewAllText() {
  const [viewAllData, setViewAllData] = useState(null);
  const dispatch = useDispatch();

  const fetchData = async () => {
    dispatch(setLoadingAction()); // 로딩 시작 액션 디스패치
    try {
      const query = `*[_type == "viewAllSlide"][0]`;
      const data = await client.fetch(query);
      setViewAllData(data);
      dispatch(dataLoadedAction()); // 데이터 로딩 완료 액션 디스패치
    } catch (error) {
      console.error("Error fetching view all slide data:", error);
    } finally {
      dispatch(setLoadedAction()); // 로딩 종료 액션 디스패치
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]); // dispatch를 useEffect의 의존성 배열에 추가

  if (!viewAllData) return null;

  return (
    <div className='view-all-text'>
      <div className='all-works cate-big-font'>{viewAllData.name}</div>
      <div className='cate-big-detail2 pre1rem'>
        <div className='cate-big-detail-text2'>{viewAllData.description}</div>
      </div>
      <Link
        href='/list/All'
        as={`/list/All`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className='btn-cir-big-wtn pre1-5rem'>
          <div className='view-all'>View All</div>
        </div>
      </Link>
    </div>
  );
}

export default ViewAllText;
