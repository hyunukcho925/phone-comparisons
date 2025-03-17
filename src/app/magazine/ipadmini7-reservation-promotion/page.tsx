import type { Metadata } from 'next';
import SubHeader from '@/components/header/SubHeader';
import RightIcon from "@/components/icon/RightIcon";
import Image from 'next/image';

export const metadata: Metadata = {
  title: '아이패드 미니 7세대 사전예약 총정리! 2024 출시일정/혜택/구매방법 완벽가이드',
  description: '아이패드 미니 7세대 사전예약 시작! 통신사별 프로모션부터 자급제 구매까지 한번에 정리. 최대 사전예약 혜택과 스펙, 예상 출시일, 모델별 가격비교까지 2024년 아이패드 미니 7세대 시리즈 구매 필수 정보를 확인하세요.',
  openGraph: {
    title: '아이패드 미니 7세대 사전예약 총정리',
    description: '아이패드 미니 7세대 사전예약 시작! 통신사별 프로모션부터 자급제 구매까지 한번에 정리.',
    images: ['/images/ipadmini7-hero.jpg'],
    type: 'article',
    publishedTime: '2024-11-14T00:00:00.000Z',
    modifiedTime: '2024-11-14T00:00:00.000Z',
    section: '테크',
    authors: ['테크트리'],
    tags: ['아이패드', '아이패드 미니', '사전예약', '애플']
  },
};

export default function MagazinePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'Product'],
    headline: '아이패드 미니 7세대 사전예약 총정리',
    image: 'https://rovdcewcphlrygwiozip.supabase.co/storage/v1/object/public/image/magazine/ipadmini7-reservation-promotion.webp',
    datePublished: '2024-11-14T00:00:00.000Z',
    dateModified: '2024-11-14T00:00:00.000Z',
    author: {
      '@type': 'Organization',
      name: '테크트리'
    },
    description: '아이패드 미니 7세대 사전예약 시작! 통신사별 프로모션부터 자급제 구매까지 한번에 정리.',
    brand: {
      '@type': 'Brand',
      name: 'Apple'
    },
    name: '아이패드 미니 7세대',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'KRW',
      lowPrice: '749000',
      highPrice: '1429000',
      availability: 'https://schema.org/PreOrder'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              아이패드 미니 7세대 사전예약
            </h1>
            <p className="text-gray-600">더 작아진 크기, 더 커진 가능성</p>
          </header>

          <figure className="mb-8">
            <Image
              src="https://rovdcewcphlrygwiozip.supabase.co/storage/v1/object/public/image/magazine/ipadmini7-reservation-promotion.webp"
              alt="아이패드 미니 7세대 사전예약"
              title="아이패드 미니 7세대 사전예약"
              width={1200}
              height={630}
              className="w-full rounded-lg"
              priority
            />
          </figure>

          {/* 예약 옵션 섹션 */}
          <section className="my-8" aria-labelledby="reservation-options">
            <h2 id="reservation-options" className="text-2xl font-bold mb-4">
              아이패드 미니 7세대 <br />
              사전예약 안내
            </h2>
            <div className="space-y-2">
              <div className="border rounded-lg">
                <a
                  href="https://rstyle.me/+cIMWrB8DUzqDl5Axi_wgAw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <span className="text-gray-900 font-bold block mb-1">
                      애플 공식 사전예약
                    </span>
                    <span className="text-gray-600 text-sm block">
                      혜택: 보상 판매 시 최대 67만원 할인
                    </span>
                    <span className="text-gray-600 text-sm block">
                      기간: 11월 14일 오전 9시 ~
                    </span>
                  </div>
                  <RightIcon className="w-5 h-5 text-gray-400" />
                </a>
              </div>
              <div className="border rounded-lg">
                <a
                  href="https://rstyle.me/+cIMWrB8DUzqDl5Axi_wgAw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <span className="text-gray-900 font-bold block mb-1">
                      애플 공식 사전예약
                    </span>
                    <span className="text-gray-600 text-sm block">
                      혜택: 보상 판매 시 최대 67만원 할인
                    </span>
                    <span className="text-gray-600 text-sm block">
                      기간: 11월 14일 오전 9시 ~
                    </span>
                  </div>
                  <RightIcon className="w-5 h-5 text-gray-400" />
                </a>
              </div>
              <div className="border rounded-lg">
                <a
                  href="https://rstyle.me/+cIMWrB8DUzqDl5Axi_wgAw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <span className="text-gray-900 font-bold block mb-1">
                      애플 공식 사전예약
                    </span>
                    <span className="text-gray-600 text-sm block">
                      혜택: 보상 판매 시 최대 67만원 할인
                    </span>
                    <span className="text-gray-600 text-sm block">
                      기간: 11월 14일 오전 9시 ~
                    </span>
                  </div>
                  <RightIcon className="w-5 h-5 text-gray-400" />
                </a>
              </div>
              <div className="my-4">
                <p>
                  새로운 사전예약 사이트가 나오면 바로 추가됩니다!
                  <br />
                  🔎 아이패드 미니 7세대 사전예약 이벤트 탐색 중
                </p>
              </div>
            </div>
          </section>

          <hr className="bg-gray-100 h-[2px]" />

          {/* 일정 섹션 */}
          <section className="my-8" aria-labelledby="schedule">
            <h2 id="schedule" className="text-2xl font-bold mb-4">
              아이패드 미니 7세대 <br />
              사전예약 및 출시일 일정
            </h2>
            <div className="py-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                ① 아이패드 미니 7세대 사전 예약 일정
              </h3>
              <p className="text-gray-800">
                아이패드 미니 7세대는 2024년 11월 14일 오전 9시부터 사전예약이
                진행될 예정입니다.
              </p>
            </div>
            <div className="py-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                ② 아이패드 미니 7세대 출시일 일정
              </h3>
              <p className="text-gray-800">
                아이패드 미니 7세대는 2024년 11월 21일 출시될 예정입니다.
              </p>
            </div>
          </section>

          <hr className="bg-gray-100 h-[2px]" />

          {/* 스펙 섹션 */}
          <section className="my-8" aria-labelledby="specifications">
            <h2 id="specifications" className="text-2xl font-bold mb-4">
              아이패드 미니 7세대 <br />
              주요 스펙
            </h2>
            <div className="py-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                ① 아이패드 미니 7세대 종류 및 가격
              </h3>
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4 text-left first:rounded-tl-lg">
                        용량
                      </th>
                      <th className="p-4 text-left">WiFi</th>
                      <th className="p-4 text-left last:rounded-tr-lg">
                        WiFi + 셀룰러
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 first:rounded-bl-lg">128GB</td>
                      <td className="p-4">749,000원</td>
                      <td className="p-4 last:rounded-br-lg">979,000원</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 first:rounded-bl-lg">256GB</td>
                      <td className="p-4">899,000원</td>
                      <td className="p-4 last:rounded-br-lg">1,129,000원</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 first:rounded-bl-lg">512GB</td>
                      <td className="p-4">1,199,000원</td>
                      <td className="p-4 last:rounded-br-lg">1,429,000원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="my-4">
                <p>
                  이번 11월 출시되는 아이패드 미니 7세대의 종류 및 가격은 다음과
                  같습니다. 가격은 모든 사전예약 페이지에서 동일하니 참고하시기
                  바랍니다.
                </p>
              </div>
            </div>
            <div className="py-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                ② 아이패드 미니 7세대 색상
              </h3>
              <p className="text-gray-800 mb-4">
                이번 11월 출시되는 아이패드 미니 7세대의 색상은 다음과 같습니다.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-gray-800">실버</li>
                <li className="text-gray-800">스페이스 그레이</li>
                <li className="text-gray-800">핑크</li>
                <li className="text-gray-800">스타라이트</li>
              </ul>
            </div>
            <div className="py-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                ③ 아이패드 미니 7세대 스펙 비교
              </h3>
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4 text-left first:rounded-tl-lg">
                        구분
                      </th>
                      <th className="p-4 text-left">아이패드 미니 7세대</th>
                      <th className="p-4 text-left last:rounded-tr-lg">
                        아이패드 미니 6세대
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4">프로세서</td>
                      <td className="p-4">A17 Pro</td>
                      <td className="p-4">A15</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4">메모리</td>
                      <td className="p-4">8GB</td>
                      <td className="p-4">4GB</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4">애플 인텔리전스</td>
                      <td className="p-4">O</td>
                      <td className="p-4">X</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4">애플 펜슬</td>
                      <td className="p-4">애플 펜슬 프로</td>
                      <td className="p-4">애플 펜슬 2세대</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4">애플 펜슬 호버</td>
                      <td className="p-4">O</td>
                      <td className="p-4">X</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4">사진 HDR</td>
                      <td className="p-4">스마트 HDR 4</td>
                      <td className="p-4">스마트 HDR 3</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4">WiFi</td>
                      <td className="p-4">WiFi 6E</td>
                      <td className="p-4">WiFi 6</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4">블루투스</td>
                      <td className="p-4">블루투스 5.3</td>
                      <td className="p-4">블루투스 5.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
