import { defineField, defineType } from 'sanity';

export const Tag = defineType({
  name: 'tag',
  title: '태그',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '태그',
      type: 'string',
      description: '태그 값 지정',
    }),
  ],
});
