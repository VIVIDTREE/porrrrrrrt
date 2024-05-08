import { defineField, defineType } from "sanity";

export const About = defineType({
  name: "about",
  title: "어바웃",
  type: "document",
  fields: [
    defineField({
      name: "name",
      description: "타이틀 영역에 표기되는 제목",
      type: "string",
      options: { source: "name" },
      validation: (rule) => rule.required().error(`제목은 필수 입력 입니다.`),
    }),
    defineField({
      name: "shortTexts",
      title: "사이드 메뉴",
      description: "사이드 텍스트 항목(정렬순서대로 표기됨)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "description",
      title: "대표 설명",
      description: "어바웃 페이지 대표 설명",
      type: "text",
    }),
    defineField({
      name: "descriptions",
      title: "상세 설명",
      description: "어바웃 페이지 상세 설명",
      type: "text",
    }),
    defineField({
      name: "image",
      description: "어바웃 페이지 대표 이미지",
      type: "image",
    }),
  ],
});
