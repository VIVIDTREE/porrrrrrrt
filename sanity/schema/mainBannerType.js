import {defineField, defineType} from 'sanity'

export const MainBannerType = defineType({
  name: 'mainBanner',
  title: '메인배너',
  type: 'document',
  groups: [
  {name: 'name', title: 'Details'},
  {name: 'slug', title: 'Editorial'},
],
  fields: [
    defineField({
      name: 'name',
      description: '메인 이미지 alt 값',
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
      name: 'image',
      description: '메인 배너 이미지 첨부',
      type: 'image',

    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      description: 'YouTube 또는 Vimeo 비디오 URL을 추가하세요.',
      type: 'url',
    }),
  ],
})
