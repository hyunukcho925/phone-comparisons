import { getProducts } from "@/lib/getProducts";
import { notFound } from "next/navigation";
import ProductHeader from "@/components/header/ProductHeader";
import Image from "next/image";
import RightIcon from "@/components/icon/RightIcon";
import { toSlug } from "@/utils/stringUtils";
import CompareButton from "@/components/button/CompareButton";

interface PageProps {
  params: Promise<{
    brand_name_en: string;
    product_name_en: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    brand_name_en: toSlug(product.brand?.brand_name_en || ""),
    product_name_en: toSlug(product.product_name_en),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const products = await getProducts();
  const resolvedParams = await params;
  const { brand_name_en, product_name_en } = resolvedParams;
  
  const product = products.find(
    (p) =>
      toSlug(p.brand?.brand_name_en || "") === brand_name_en &&
      toSlug(p.product_name_en) === product_name_en
  );

  if (!product) {
    return {
      title: '제품을 찾을 수 없습니다',
      description: '요청하신 제품을 찾을 수 없습니다.'
    };
  }

  const title = `${product.product_name_ko} 자급제 스펙 비교 | ${product.brand?.brand_name_ko} 스마트폰 성능, 카메라, 배터리, 가격 총정리!`;
  const description = `${product.product_name_ko} 자급제 스마트폰 스펙 비교! ${product.product_name_ko}의 디스플레이, 카메라, 배터리, 프로세서 등 모든 스펙을 한눈에 확인하세요. ${product.display_size_inch}인치 고해상도 디스플레이, ${product.camera_wide}MP 카메라, ${product.battery_capacity}mAh 배터리 성능까지! ${product.brand?.brand_name_ko}의 인기 스마트폰 ${product.product_name_ko}을 최저가로 구매할 수 있는 곳도 함께 안내해 드립니다. ${product.product_name_ko} 스펙, 가격, 구매 링크까지 한 번에 확인하세요!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{
        url: product.product_image,
        width: 800,
        height: 800,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{
        url: product.product_image,
        width: 800,
        height: 800,
      }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const products = await getProducts();
  const resolvedParams = await params;
  const { brand_name_en, product_name_en } = resolvedParams;
  
  const product = products.find(
    (p) =>
      toSlug(p.brand?.brand_name_en || "") === brand_name_en &&
      toSlug(p.product_name_en) === product_name_en
  );

  if (!product) {
    console.log(
      "Available products:",
      products.map((p) => ({
        brand: toSlug(p.brand?.brand_name_en || ""),
        product: toSlug(p.product_name_en),
      }))
    );
    notFound();
  }

  return (
    <div className="pb-4">
      <ProductHeader />
      <div>
        {/* 제품 이미지 섹션 */}
        <div className="bg-gray-100 py-6 px-24">
          <div className="flex justify-center items-center">
            <Image
              src={product.product_image}
              title={`${product.product_name_ko} 자급제`}
              alt={`${product.product_name_ko} 자급제`}
              width={240}
              height={240}
              style={{ width: "100%", height: "auto" }}
              placeholder="empty"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              quality={85}
            />
          </div>
        </div>

        {/* 제품 기본 정보 */}
        <div className="px-4 py-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">
              {product.brand?.brand_name_en}
            </p>
            <h1 className="text-2xl font-bold text-gray-900">
              {product.product_name_ko} 자급제
            </h1>
          </div>

          <CompareButton product={product} />
          <p className="text-gray-800 text-center mt-4 text-sm">
            {product.product_name_ko} 자급제 스펙을 비교해 보세요☝🏻
          </p>
        </div>

        <div className="w-full h-[8px] bg-gray-100" />

        {/* 구매처 섹션 */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">
            {product.product_name_ko} <br />
            <span className="mt-2 inline-block">자급제</span>
          </h2>

          {product.distributors && product.distributors.length > 0 && (
            <div className="space-y-2">
              {product.distributors.map((distributor) => (
                <a
                  key={distributor.distributor_id}
                  href={distributor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  title={`${product.product_name_ko} 자급제`}
                >
                  <span className="text-gray-900 font-medium">
                    {distributor.distributor_name}
                  </span>
                  <RightIcon className="w-5 h-5 text-gray-400" />
                </a>
              ))}
            </div>
          )}
          <div className="mt-4">
            <p className="text-gray-500 font-light text-center text-sm">
              {product.product_name_ko} 자급제를 구매할 수 있는 링크는 다음과
              같습니다.
            </p>
          </div>
        </div>

        <div className="w-full h-[8px] bg-gray-100" />

        {/* 제품 상세 정보 */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">
            {product.product_name_ko} <br />
            <span className="mt-2 inline-block">스펙 요약</span>
          </h2>
          <div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">브랜드</h3>
              <p className="text-gray-800 font-semibold">
                {product.brand?.brand_name_ko} ({product.brand?.brand_name_en})
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">크기</h3>
              <p className="text-gray-800 font-semibold">
                {product.display_size_inch}인치
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">무게</h3>
              <p className="text-gray-800 font-semibold">
                {product.product_weight}g
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">해상도</h3>
              <p className="text-gray-800 font-semibold">
                {product.display_resolution}
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">주사율</h3>
              <p className="text-gray-800 font-semibold">
                {product.refresh_rate}Hz
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 font-light text-sm">
              {product.product_name_ko} 자급제의 브랜드, 크기, 무게 등의 스펙
              요약은 다음과 같습니다.
            </p>
          </div>
        </div>

        <div className="w-full h-[8px] bg-gray-100" />

        {/* 카메라 스펙 섹션 */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">
            {product.product_name_ko} <br />
            <span className="mt-2 inline-block">카메라 스펙</span>
          </h2>
          <div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">초광각 카메라</h3>
              <p className="text-gray-800 font-semibold">
                {product.camera_ultrawide}MP
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">광각 카메라</h3>
              <p className="text-gray-800 font-semibold">
                {product.camera_wide}MP
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">망원 카메라</h3>
              <p className="text-gray-800 font-semibold">
                {product.camera_telephoto}MP
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">전면 카메라</h3>
              <p className="text-gray-800 font-semibold">
                {product.camera_front}MP
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 font-light text-sm">
              {product.product_name_ko} 자급제의 카메라 스펙은 다음과 같습니다.
            </p>
          </div>
        </div>

        <div className="w-full h-[8px] bg-gray-100" />

        {/* 배터리 스펙 섹션 */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">
            {product.product_name_ko} <br />
            <span className="mt-2 inline-block">배터리 스펙</span>
          </h2>
          <div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">배터리 용량</h3>
              <p className="text-gray-800 font-semibold">
                {product.battery_capacity}mAh
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">비디오 재생 시간</h3>
              <p className="text-gray-800 font-semibold">
                최대 {product.battery_video_playback}시간
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 font-light text-sm">
              {product.product_name_ko} 자급제의 배터리 스펙은 다음과 같습니다.
            </p>
          </div>
        </div>

        <div className="w-full h-[8px] bg-gray-100" />

        {/* AP 섹션 */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">
            {product.product_name_ko} <br />
            <span className="mt-2 inline-block">프로세서</span>
          </h2>
          <div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">프로세서</h3>
              <p className="text-gray-800 font-semibold">
                {product.product_processor}
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">코어 개수</h3>
              <p className="text-gray-800 font-semibold">
                {product.core_count}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 font-light text-sm">
              {product.product_name_ko} 자급제의 프로세서 스펙은 다음과
              같습니다.
            </p>
          </div>
        </div>

        <div className="w-full h-[8px] bg-gray-100" />

        {/* 제품 상세 정보 */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">
            {product.product_name_ko} <br />
            <span className="mt-2 inline-block">무게 & 크기</span>
          </h2>
          <div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">무게</h3>
              <p className="text-gray-800 font-semibold">
                {product.product_weight}g
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">크기 (세로x가로x두께)</h3>
              <p className="text-gray-800 font-semibold">
                {product.product_size}mm
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 font-light text-sm">
              {product.product_name_ko} 자급제의 무게&크기 스펙은 다음과
              같습니다.
            </p>
          </div>
        </div>

        <div className="w-full h-[8px] bg-gray-100" />

        {/* 디스플레이 섹션 */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">
            {product.product_name_ko} <br />
            <span className="mt-2 inline-block">디스플레이</span>
          </h2>
          <div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">메인 디스플레이 크기</h3>
              <p className="text-gray-800 font-semibold">
                {product.display_size}cm
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">디스플레이 해상도</h3>
              <p className="text-gray-800 font-semibold">
                {product.display_resolution}
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">최대 밝기</h3>
              <p className="text-gray-800 font-semibold">
                {product.display_max_brightness}nits
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">가변주사율</h3>
              <p className="text-gray-800 font-semibold">
                {product.refresh_rate}Hz
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 font-light text-sm">
              {product.product_name_ko} 자급제의 디스플레이 스펙은 다음과
              같습니다.
            </p>
          </div>
        </div>

        {/* 하단 고정 구매 버튼 */}
        {product.distributors && product.distributors.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-white max-w-[500px] mx-auto">
            <a
              href={product.distributors[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary text-white font-bold py-3 px-2 rounded-lg block text-center"
              title={`${product.product_name_ko} 자급제`}
            >
              구매하러 가기
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
