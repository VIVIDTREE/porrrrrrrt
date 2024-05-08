import { defineField, defineType } from 'sanity';

export const RollText = defineType({
  name: 'rolltext',
  title: '롤링텍스트',
  type: 'document',
    fields: [
    defineField({
      name: 'name',
      description: '페이지에는 비표시됨, 관리용',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'text',
      description: '롤링 텍스트 내용',
      type: 'text',
    }),
    // 필요한 경우 추가 필드 정의
  ],
});