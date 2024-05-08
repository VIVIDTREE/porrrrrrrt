import React from "react";
import Image from "next/image";
import "./detail-more.css";

function DetailMore({ detailimages }) {
  return (
    <div className='detail-more-warp'>
      {detailimages && detailimages.length > 0 ? (
        <div className='more-img-warp'>
          {detailimages.map((img, index) => (
            <div key={index} className='more-img'>
              <Image
                src={img.asset.url}
                alt={img.alt || "Detail Image"} // alt 값이 없을 경우 기본 문자열 사용
                width={1200}
                height={2000}
                loading='lazy'
              />
            </div>
          ))}
          <div className='more-img-null'></div>
        </div>
      ) : null}
    </div>
  );
}

export default DetailMore;
