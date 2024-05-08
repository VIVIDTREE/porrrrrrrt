import { defineField, defineType } from "sanity";

export const FAQ = defineType({
  name: "faq",
  title: "FAQ",
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
      title: "Q",
      description: "질문 내용(정렬순서대로 표기됨)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "description",
      title: "A",
      description: "답변 내용(정렬순서대로 표기됨)",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
