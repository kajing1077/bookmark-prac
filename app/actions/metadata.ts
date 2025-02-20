'use server'

import * as cheerio from 'cheerio';

interface Metadata {
  url: string;
  title: string;
  ogTitle: string;
  image: string;
}

export async function getMetadata(url: string): Promise<Metadata> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const baseUrl = new URL(url);

    // 이미지 찾기 (순서대로)
    let image =
      // 1. favicon 먼저 찾기
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') ||
      // 2. apple-touch-icon도 체크
      $('link[rel="apple-touch-icon"]').attr('href') ||
      // 3. 그 다음 OG 이미지
      $('meta[property="og:image"]').attr('content') ||
      // 4. Twitter 이미지
      $('meta[name="twitter:image"]').attr('content') ||
      // 5. 기본 favicon 경로
      '/favicon.ico';

    // 상대 경로를 절대 경로로 변환
    if (image && !image.startsWith('http')) {
      image = image.startsWith('/')
        ? `${baseUrl.origin}${image}`
        : `${baseUrl.origin}/${image}`;
    }

    // 이미지를 찾지 못한 경우 Google favicon 서비스 사용
    if (!image || image === `${baseUrl.origin}/favicon.ico`) {
      image = `https://www.google.com/s2/favicons?domain=${baseUrl.hostname}&sz=64`;
    }

    return {
      url: url,
      title: $('title').text() || '',
      ogTitle: $('meta[property="og:title"]').attr('content') || '',
      image: image
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      url: url,
      title: '',
      ogTitle: '',
      image: ''
    };
  }
}
//
// export async function getMetadata(url: string): Promise<Metadata> {
//   try {
//     const response = await fetch(url);
//     const html = await response.text();
//     const $ = cheerio.load(html);
//
//     const baseUrl = new URL(url);
//
//     const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${baseUrl.hostname}&sz=128`;
//
//     const image = $('meta[property="og:image"]').attr('content') ||
//       $('meta[name="twitter:image"]').attr('content') ||
//       googleFaviconUrl;
//
//
//     return {
//       url: url,
//       title: $('title').text() || '',
//       ogTitle: $('meta[property="og:title"]').attr('content') || '',
//       image: image
//     };
//   } catch (error) {
//     console.error('Error fetching metadata:', error);
//     return {
//       url: url,
//       title: '',
//       ogTitle: '',
//       image: ''
//     };
//   }
// }