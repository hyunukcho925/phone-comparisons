import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from 'next/script';
import FontLoader from "./fontloader";

export const metadata: Metadata = {
  title: "스마트폰 스펙 비교 | 폰스펙",
  description:
    "폰스펙은 최신 스마트폰부터 중고폰까지 다양한 휴대폰의 스펙을 한눈에 비교할 수 있는 플랫폼입니다. 프리미엄 플래그십부터 실속형 중저가폰까지, 상세한 스펙 정보와 실사용 리뷰를 제공하여 현명한 구매 결정을 도와드립니다. 카메라, 배터리, 성능 등 다양한 기준으로 스마트폰을 비교하고 최적의 선택을 하세요.",
  openGraph: {
    title: "스마트폰 스펙 비교 | 폰스펙",
    description:
      "폰스펙은 최신 스마트폰부터 중고폰까지 다양한 휴대폰의 스펙을 한눈에 비교할 수 있는 플랫폼입니다. 프리미엄 플래그십부터 실속형 중저가폰까지, 상세한 스펙 정보와 실사용 리뷰를 제공하여 현명한 구매 결정을 도와드립니다. 카메라, 배터리, 성능 등 다양한 기준으로 스마트폰을 비교하고 최적의 선택을 하세요.",
    url: "https://phonespec.com/",
    siteName: "스마트폰 스펙 비교 | 폰스펙",
    images: [
      {
        url: "https://your-storage-url/meta/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "스마트폰 스펙 비교 | 폰스펙",
    description:
      "폰스펙은 최신 스마트폰부터 중고폰까지 다양한 휴대폰의 스펙을 한눈에 비교할 수 있는 플랫폼입니다. 프리미엄 플래그십부터 실속형 중저가폰까지, 상세한 스펙 정보와 실사용 리뷰를 제공하여 현명한 구매 결정을 도와드립니다.",
    images: ["https://your-storage-url/meta/og-image.png"],
  },
  keywords: [
    "스마트폰 비교",
    "휴대폰 스펙",
    "폰스펙",
    "스마트폰 스펙",
    "휴대폰 비교",
    "스마트폰 구매",
    "폰 스펙 비교",
    "스마트폰 성능",
    "휴대폰 카메라",
    "배터리 성능",
    "중고폰 비교",
    "스마트폰 리뷰",
    "휴대폰 추천",
    "스마트폰 가격비교",
    "핸드폰 구매가이드",
  ],
  authors: [{ name: "PHONESPEC" }],
  creator: "PHONESPEC",
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://phonespec.com/",
  },
  publisher: "PHONESPEC",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HCN86CD6JL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HCN86CD6JL');
          `}
        </Script>
        <meta
          name="naver-site-verification"
          content="6033dd849f8801ffcdc2f72dc3206e0fb1c16627"
        />
      </head>
      <body>
        <FontLoader />
        <div className="container">{children}</div>
        <SpeedInsights />
      </body>
    </html>
  );
}