import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',  // 모든 HTTPS 도메인 허용
        pathname: '/**',
      }
    ],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 's.pstatic.net',
  //       pathname: '/static/**',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: '*.pstatic.net',
  //       pathname: '/**',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 't1.daumcdn.net',  // 다음 도메인 추가
  //       pathname: '/**',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: '*.daumcdn.net',    // 다음 서브도메인 모두 허용
  //       pathname: '/**',
  //     }
  //   ],
  // },
};

export default nextConfig;
