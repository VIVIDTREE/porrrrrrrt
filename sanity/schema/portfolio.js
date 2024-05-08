import { defineField, defineType } from "sanity";

export const Portfolio = defineType({
  name: "portfolio",
  title: "포트폴리오",
  type: "document",
  groups: [
    { name: "name", title: "Details" },
    { name: "slug", title: "Editorial" },
  ],
  fields: [
    defineField({
      name: "name",
      description: "타이틀 영역에 표기되는 제목",
      type: "string",
      options: { source: "name" },
      validation: (rule) => rule.required().error(`제목은 필수 입력 입니다.`),
    }),
    defineField({
      name: "slug",
      description: "생성시 자동으로 제목 값 입력, 해당 값은 URL 경로로 사용됨.",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      description: "대략 적인 제작 날짜(년,월 만 표기됨)",
      type: "datetime",
    }),
    defineField({
      name: "details",
      description: "해당 작품 상세 페이지 내부의 표기되는 상세설명",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "hyperlink",
      title: "링크",
      description: "링크가 필요한 경우 기입",
      type: "text",
    }),
    defineField({
      name: "usedtools",
      title: "사용 툴",
      description: "작품에 사용된 툴",
      type: "text",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description:
        "작품과 관련된 태그들(태그 페이지의 태그 값과 및 카테고리를 정의함.)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
    defineField({
      name: "image",
      description: "작품 대표 이미지 첨부",
      type: "image",
    }),
    defineField({
      name: "images",
      title: "Images",
      description: "상세 페이지에 표기되는 이미지 슬라이드",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "detailimages",
      title: "detail Images",
      description: "하단 상세 이미지 영역 표기",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "files",
      title: "영상 파일",
      description: "영상 파일 첨부",
      type: "array",
      of: [{ type: "file" }],
    }),
  ],
});
