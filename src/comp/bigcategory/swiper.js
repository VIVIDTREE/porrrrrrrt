import "./swiper.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import Image from "next/image";
import client from "../../../sanity.js";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { useDispatch } from "react-redux";
import {
  setLoadingAction,
  setLoadedAction,
  dataLoadedAction,
} from "../../app/LoadManagerWithRedux.js"; // 액션 생성자의 실제 경로를 확인해주세요.

export default function MySwiperComponent({ activeCategory }) {
  const [categories, setCategories] = useState([]);
  const [slides, setSlides] = useState([]);
  const dispatch = useDispatch();

  // 초기 데이터 로딩: 모든 MainCategory 정보를 한 번에 가져옴
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoadingAction());
      try {
        const query = `*[_type == "mainCategory"]{
          name,
          tags[]->{
            _id,
            name
          },
          description,
          portfolios[]->{
            name,
            date,
            Type,
            image{
              asset->{
                _id,
                url
              },
              alt
            },
            slug,
            videoUrl,
            "tags": tags[]->name
          }
        }`;
        const data = await client.fetch(query);
        setCategories(data); // 모든 카테고리 데이터 저장
        dispatch(dataLoadedAction());
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoadedAction());
      }
    };
    fetchData();
  }, [dispatch]);

  // 카테고리 변경에 따른 포트폴리오 데이터 필터링
  useEffect(() => {
    const categoryData = categories.find((cat) => cat.name === activeCategory);
    if (categoryData && categoryData.portfolios) {
      const filteredPortfolios = categoryData.portfolios.slice(0, 6);
      filteredPortfolios.push({
        name: "View All",
        slug: { current: `/list/${activeCategory}` },
      });
      setSlides(filteredPortfolios); // 필터링된 포트폴리오를 슬라이드에 설정
    }
  }, [activeCategory, categories]);

  return (
    <>
      <Swiper
        modules={[Autoplay, FreeMode, Navigation]}
        slidesPerGroup={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        slidesPerView={"auto"}
        freeMode={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 8 },
          480: { slidesPerView: 2, spaceBetween: 8 },
          768: { slidesPerView: 2, spaceBetween: 16 },
          1080: { slidesPerView: 3, spaceBetween: 16 },
          1440: { slidesPerView: 4, spaceBetween: 16 },
          2180: { slidesPerView: 5, spaceBetween: 16 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide.name === "View All" ? ( // "View All" 슬라이드 체크
              <Link
                href='/list/[tags]'
                as={`/list/${activeCategory}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className='swiper-view-wrap pre1rem'>
                  <div className='swiper-view-all'>
                    <div className='swiper-view-text'>{slide.name}</div>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                href='/detail/[slug]'
                as={`/detail/${slide.slug.current}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className='cate-img-warp'>
                  <div className='img-warp'>
                    <Image
                      className='cate-img'
                      src={`${slide.image.asset.url}?fm=webp&auto=format`}
                      alt={slide.image.alt || "slide image"}
                      width={460}
                      height={551}
                      loading='lazy'
                      unoptimized={slide.image.asset.url.endsWith(".webp")}
                    />
                  </div>
                  <div className='description'>
                    <div className='description-text pre1rem'>
                      <div className='title-warp'>
                        <div className='title'>{slide.name}</div>
                      </div>
                      <div className='date'>
                        {new Date(slide.date).getFullYear()} .{" "}
                        {(new Date(slide.date).getMonth() + 1)
                          .toString()
                          .padStart(2, "0")}
                      </div>
                      <div className='tag pre0-8rem'>
                        {slide.tags.map((tagName, tagIndex) => (
                          <div key={tagIndex} className='tag-child'>
                            <div className='tag-text'>{tagName}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='custom-next'>
        <Image
          src='/src/icon/right_arr.png'
          width={512}
          height={512}
          alt='arr-right'
        />
      </div>
      <div className='custom-prev'>
        <Image
          src='/src/icon/left_arr2.png'
          width={512}
          height={512}
          alt='arr-left'
        />
      </div>
    </>
  );
}
