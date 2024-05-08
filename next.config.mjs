/** @type {import('next').NextConfig} */
// ES 모듈 문법을 사용하여 Next.js 설정을 정의합니다.
const nextConfig = {
  output: "export", // Next.js의 새 정적 출력 옵션
  images: {
    domains: ["cdn.sanity.io"],
  },
  reactStrictMode: true, // React의 엄격 모드 활성화 (선택적)
};

export default nextConfig;
