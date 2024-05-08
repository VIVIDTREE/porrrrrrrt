import React, { useState, useEffect } from "react";
import client from "../../../sanity.js";
import Image from "next/image";
import Link from "next/link";
import "./list-item.css";
import { useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux";

function Listitem({ tag, sortType }) {
  // 'sortType' prop 추가, 리스트를 정렬하는데 사용됨
  const [contents, setContents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoadingAction()); // 로딩 시작

    const query =
      tag === "All"
        ? `*[_type == "portfolio"]{ name, date, "slug": slug.current, image{ asset->{ url } }, tags[]->{ name } }`
        : `*[_type == "portfolio" && $tag in tags[]->name]{ name, date, "slug": slug.current, image{ asset->{ url } }, tags[]->{ name } }`;

    client
      .fetch(query, { tag })
      .then((data) => {
        if (sortType === "az") {
          data.sort((a, b) => a.name.localeCompare(b.name)); // 정렬 로직 추가, 이름 기준 알파벳순
        } else if (sortType === "new") {
          data.sort((a, b) => new Date(b.date) - new Date(a.date)); // 정렬 로직 추가, 날짜 기준 최신순
        }
        setContents(data);
        dispatch(setLoadedAction());
        dispatch(dataLoadedAction());
      })
      .catch((error) => {
        console.error("Error fetching contents:", error);
        dispatch(setLoadedAction());
      });
  }, [tag, sortType, dispatch]); // 'sortType'를 의존성 배열에 추가

  return (
    <div className='list-page-stack'>
      {sortType !== "list" && ( // 'sortType'가 "list"가 아닐 때만 기존 리스트 뷰를 렌더링
        <div className='list-stack'>
          {contents.map((content) => (
            <Link
              key={content.slug} // 고유 key 설정으로 최적화
              href='/detail/[slug]'
              as={`/detail/${content.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className='list-item'>
                <div className='list-card'>
                  <div className='item-img-warp'>
                    <div className='item-img-box'>
                      <div className='item-img'>
                        <Image
                          src={`${content.image.asset.url}?fm=webp&auto=format`}
                          alt={content.name}
                          width={460}
                          height={551}
                          loading='lazy'
                          unoptimized={content.image.asset.url.endsWith(
                            ".webp"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='item-text pre1rem'>
                    <div className='item-title'>{content.name}</div>
                    <div className='item-date'>
                      {new Date(content.date).getFullYear()}.
                      {(new Date(content.date).getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}
                    </div>
                  </div>
                  <div className='item-tag-list pre0-8rem'>
                    {content.tags.map((tag) => (
                      <div key={tag.name} className='item-tag'>
                        {tag.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {sortType === "list" && (
        <div className='list-stack-line'>
          <table>
            <thead className='pre0-8rem'>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content) => (
                <tr key={content.slug}>
                  <td className='list-name-box pre1-5remSlim'>
                    <Link
                      href='/detail/[slug]'
                      as={`/detail/${content.slug}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className='list-name'>{content.name}</div>
                    </Link>
                  </td>
                  <td className='list-date-box pre1-5remSlim'>
                    <Link
                      href='/detail/[slug]'
                      as={`/detail/${content.slug}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className='list-date'>
                        {new Date(content.date).getFullYear()}.
                        {(new Date(content.date).getMonth() + 1)
                          .toString()
                          .padStart(2, "0")}
                      </div>
                    </Link>
                  </td>
                  <td className='list-tag-box pre0-8rem'>
                    {content.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href='/detail/[slug]'
                        as={`/detail/${content.slug}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div className='list-tag'>{tag.name}</div>
                      </Link>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Listitem;
