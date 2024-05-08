import {defineField, defineType} from 'sanity'

export const ViewAllSlide = defineType({
  name: 'viewAllSlide',
    title: '뷰올',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      description: 'View All 영역에 표기되는 제목',
      type: 'string',
      options: { source: 'name' },
        validation: (rule) => rule
        .required()
        .error(`제목은 필수 입력 입니다.`),
    }),
    defineField({
      name: 'slug',
      description: '웹 사이트의 특정 페이지를 쉽게 읽을 수 있는 형태로 식별하는 URL',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'description',
      title: 'text',
      description: 'View All 영역에 표기되는 설명',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      description: 'View All 영역에 표기되는 이미지 슬라이드',
      type: 'array',
      of: [{ type: 'image' }], 
      options: {
        hotspot: true,
      },
    }),
  ],
})
