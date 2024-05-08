import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import client from "../../../sanity.js";
import { useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux"; // 액션 생성자를 직접 임포트
import "./about-title.css";

function AboutTitle() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTitle = async () => {
      dispatch(setLoadingAction()); // 로딩 시작 액션 디스패치
      try {
        const query = `*[_type == "about"][0].name`; // 제목만 가져옵니다.
        const result = await client.fetch(query);
        setTitle(result);
        dispatch(dataLoadedAction()); // 데이터 로딩 완료 액션 디스패치
      } catch (error) {
        console.error("Error fetching about title:", error);
      } finally {
        dispatch(setLoadedAction()); // 로딩 종료 액션 디스패치
      }
    };

    fetchTitle();
  }, [dispatch]);

  return (
    <div className='title-nav-wrap cate-big-font'>
      <div className='title-logo'>
        <Link
          href='/'
          as={`/`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className='logo-item'>
            <Image src='/src/logo.png' alt='logo' width={2560} height={900} />
          </div>
        </Link>
      </div>
      <div className='title-cate-name'>/ {title}</div>
    </div>
  );
}
export default AboutTitle;
