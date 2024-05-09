import React, { useState, useEffect } from "react";
import client from "../../../sanity.js";
import Image from "next/image";
import "./relatedPage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import Link from "next/link";

import { useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux"; // 액션 생성자를 import합니다.

function RelatedPage({ slug }) {
  const [relatedContents, setRelatedContents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!slug) return;

    dispatch(setLoadingAction()); // 로딩 시작

    const tagQuery = `*[_type == "portfolio" && slug.current == $slug][0]{
      "tagRefs": tags[]->_ref
    }`;

    client
      .fetch(tagQuery, { slug })
      .then((data) => {
        if (data?.tagRefs?.length > 0) {
          const relatedContentQuery = `*[_type == "portfolio" && tags[]._ref in $tagRefs && slug.current != $slug]{
            "slug": slug.current, 
            name,
            tags[]->{
              name
            },
            image{
              asset->{
                url
              }
            }
          }[0...8]`;

          client
            .fetch(relatedContentQuery, { tagRefs: data.tagRefs, slug: slug })
            .then((relatedData) => {
              setRelatedContents(relatedData);
              dispatch(setLoadedAction()); // 로딩 종료
              dispatch(dataLoadedAction()); // 데이터 로드 완료
            })
            .catch((error) => {
              console.error("Fetching related contents error:", error);
              dispatch(setLoadedAction()); // 로딩 종료
            });
        } else {
          console.error("No tags found for the given slug:", slug);
          dispatch(setLoadedAction()); // 로딩 종료
        }
      })
      .catch((error) => {
        console.error("Fetching tags error:", error);
        dispatch(setLoadedAction()); // 로딩 종료
      });
  }, [dispatch, slug]);

  return (
    <div className='Related-page-wrap'>
      <div className='Related-page-title cate-big-font'>Related Contents</div>

      <Swiper
        className='Related-page'
        observer={true}
        observeParents={true}
        modules={[FreeMode, Navigation]}
        freeMode={true}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next-rel",
          prevEl: ".custom-prev-rel",
        }}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 8 },
          480: { slidesPerView: 3, spaceBetween: 8 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1080: { slidesPerView: 4, spaceBetween: 16 },
          1440: { slidesPerView: 4, spaceBetween: 16 },
          2180: { slidesPerView: 5, spaceBetween: 16 },
        }}
      >
        {relatedContents.length > 0 ? (
          relatedContents.map((content, index) => (
            <SwiperSlide className='Related-slider' key={index}>
              <Link
                href='/detail/[slug]'
                as={`/detail/${content.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className='Related-item'>
                  <div className='Related-img'>
                    <Image
                      src={`${content.image.asset.url}?fm=webp&auto=format`}
                      alt={content.name}
                      width={460}
                      height={551}
                    />
                  </div>
                  <div className='Related-text'>
                    <div className='Related-title pre1rem'>{content.name}</div>
                    <div className='Related-tag pre0-8rem'>
                      {content.tags.map((tag, tagIndex) => (
                        <div className='tag-item' key={tagIndex}>
                          {tag.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <div className='Related-page-no'>관련 컨텐츠가 없습니다.</div>
        )}
      </Swiper>
      <div className='custom-next-rel'>
        <Image
          src='/src/icon/right_arr_10px.png'
          width={512}
          height={512}
          alt='arr-right'
        />
      </div>
      <div className='custom-prev-rel'>
        <Image
          src='/src/icon/left_arr2_10px.png'
          width={512}
          height={512}
          alt='arr-left'
        />
      </div>
    </div>
  );
}

export default RelatedPage;
