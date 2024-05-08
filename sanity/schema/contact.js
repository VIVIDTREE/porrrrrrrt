import { defineField, defineType } from "sanity";

export const Contact = defineType({
  name: "contact",
  title: "컨택트",
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
      name: "descriptions",
      title: "컨택트 정보",
      description: "컨택트 영역 정보 항목(정렬순서대로 표기됨)",
      type: "text",
    }),
    defineField({
      name: "shortTexts",
      title: "버튼 텍스트",
      description: "컨텍트 영역 버튼 텍스트",
      type: "text",
    }),
  ],
});
