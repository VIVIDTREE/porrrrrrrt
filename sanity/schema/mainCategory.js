import { defineField, defineType } from "sanity";

export const MainCategory = defineType({
  name: "mainCategory",
  title: "메인카테고리",
  type: "document",
  fields: [
    defineField({
      name: "name",
      description: "페이지에는 비표시됨, 관리용",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description:
        "메인 카테고리로 노출시킬 태그(태그 페이지의 태그 값과 및 카테고리를 정의함.)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
    defineField({
      name: "description",
      title: "카테고리 설명",
      type: "text",
    }),
    defineField({
      name: "portfolios",
      title: "Portfolios",
      description: "이 카테고리에 노출할 포트폴리오 항목들",
      type: "array",
      of: [{ type: "reference", to: [{ type: "portfolio" }] }],
    }),
    // 필요한 경우 추가 필드 정의
  ],
});
