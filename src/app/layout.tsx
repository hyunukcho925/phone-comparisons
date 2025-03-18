import type { Metadata } from "next";
import "./globals.css";
import FontLoader from "./fontloader";

export const metadata: Metadata = {
  title: "핸드폰 비교 사이트 | 폰비교",
  description:
    "폰비교는 아이폰부터 갤럭시까지 다양한 휴대폰의 스펙을 한눈에 비교할 수 있는 플랫폼입니다. 디스플레이 크기, 카메라 화소, 배터리 용량, 프로세서 성능 등 상세 정보를 제공하며, 최신폰부터 가성비 스마트폰까지 합리적인 구매 결정을 돕습니다.",
  openGraph: {
    title: "핸드폰 비교 사이트 | 폰비교",
    description:
      "폰비교는 아이폰부터 갤럭시까지 다양한 휴대폰의 스펙을 한눈에 비교할 수 있는 플랫폼입니다. 디스플레이 크기, 카메라 화소, 배터리 용량, 프로세서 성능 등 상세 정보를 제공하며, 최신폰부터 가성비 스마트폰까지 합리적인 구매 결정을 돕습니다.",
    url: "https://www.phonecomparisons.com/",
    siteName: "핸드폰 비교 사이트 | 폰비교",
    images: [
      {
        url: "https://rovdcewcphlrygwiozip.supabase.co/storage/v1/object/public/image/meta/ogimage.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "핸드폰 비교 사이트 | 폰비교",
    description:
      "폰비교는 아이폰부터 갤럭시까지 다양한 휴대폰의 스펙을 한눈에 비교할 수 있는 플랫폼입니다. 디스플레이 크기, 카메라 화소, 배터리 용량, 프로세서 성능 등 상세 정보를 제공하며, 최신폰부터 가성비 스마트폰까지 합리적인 구매 결정을 돕습니다.",
    images: [
      "https://rovdcewcphlrygwiozip.supabase.co/storage/v1/object/public/image/meta/ogimage.webp",
    ],
  },
  keywords: [
    "스마트폰 비교",
    "휴대폰 스펙",
    "스마트폰 성능 비교",
    "휴대폰 가격비교",
    "스마트폰 카메라 성능",
    "배터리 용량 비교",
    "아이폰 vs 갤럭시",
    "갤럭시 스펙",
    "아이폰 스펙",
    "샤오미 스마트폰",
    "픽셀폰 성능",
    "스마트폰 추천",
    "최신 스마트폰",
    "가성비 스마트폰",
    "핸드폰 스펙 분석",
    "핸드폰 성능 테스트",
  ],
  authors: [{ name: "PHONECOMPARISONS" }],
  creator: "PHONECOMPARISONS",
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.phonecomparisons.com/",
  },
  publisher: "PHONECOMPARISONS",
  other: {
    'naver-site-verification': '8a2d7afdbbf2745e0a67e7a6a88eaace4f45ac1b',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* 중요한 CSS를 인라인으로 포함 */
          body {
            font-family: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
            -webkit-font-smoothing: antialiased;
            background-color: #e5e7eb;
            min-height: 100vh;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            background-color: white;
            min-height: 100vh;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            position: relative;
            padding-bottom: 4rem;
          }
        `,
          }}
        />
        <meta name="naver-site-verification" content="8a2d7afdbbf2745e0a67e7a6a88eaace4f45ac1b" />
      </head>
      <body>
        <FontLoader />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}