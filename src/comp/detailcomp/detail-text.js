import React from "react";
import "./detail-text.css";

function DetailText({ contentDetail }) {
  // Portable Text 블록에서 텍스트 내용만 추출하는 함수
  const extractText = (blocks) => {
    // blocks가 null이거나 undefined면 빈 문자열을 반환
    if (!blocks) return "";
    return blocks
      .filter((block) => block._type === "block")
      .map((block) => block.children.map((child) => child.text).join(""))
      .join("\n\n");
  };

  return (
    <div className='detail-text-wrap'>
      <div className='detail-text-con'>
        <div className='detail-name cate-big-font'>{contentDetail?.name}</div>
        <div className='detail-date pre0-8rem'>
          {contentDetail?.date && new Date(contentDetail.date).getFullYear()} .{" "}
          {(new Date(contentDetail.date).getMonth() + 1)
            .toString()
            .padStart(2, "0")}
        </div>
        <div className='detail-tag-con pre0-8rem'>
          {contentDetail?.tags?.map((tag, index) => (
            <div key={index} className='tag-d'>
              {tag.name}
            </div>
          ))}
        </div>
        {contentDetail?.details && (
          <div className='detail-des pre1-5rem'>
            {extractText(contentDetail.details)}
          </div>
        )}
        {contentDetail?.hyperlink && contentDetail.hyperlink.length > 0 && (
          <div className='detail-link pre0-8rem'>
            <a
              href={contentDetail.hyperlink}
              target='_blank' // 새 탭에서 링크를 열도록 설정
              rel='noopener noreferrer' // 보안과 성능을 위한 설정
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className='link'>원본 링크 : {contentDetail.hyperlink}</div>
            </a>
          </div>
        )}
        <div className='detail-notice-warp pre0-8rem font-sub-color'>
          <div className='detail-notice'>
            1. 대부분의 제작 콘텐츠들은 본 웹사이트 표준 기준인 4:5 비율이 아닌
            다른 비율로 제작되었습니다. 때문에 대부분의 콘텐츠가 비율 수정을
            거치는 과정에서 초기 작업 의도와는 조금 다른 레이아웃이나 구성 일 수
            있습니다.
          </div>
          <div className='detail-notice'>
            2. 모든 작업물은 기획부터 제작까지 모두 제가 담당하였습니다.
          </div>
        </div>
        <div className='detail-tool'>
          <div className='tool-title pre1rem'>Tools used</div>
          <div className='tool-name pre0-8rem'>Name</div>
          {contentDetail?.usedtools.split("\n").map((paragraph, index) => (
            <p className='tool pre0-8rem' key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailText;
