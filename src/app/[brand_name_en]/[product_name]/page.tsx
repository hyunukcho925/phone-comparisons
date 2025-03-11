import { getProducts } from '@/lib/getProducts';
import { notFound } from 'next/navigation';
import ProductHeader from '@/components/header/ProductHeader';
import Image from 'next/image';
import RightIcon from '@/components/icon/RightIcon';

interface PageProps {
  params: {
    brand_name_en: string;
    product_name: string;
  };
}

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')     // 공백을 하이픈으로 변환
    .replace(/[^\w\-]+/g, '') // 알파벳, 숫자, 하이픈이 아닌 문자 제거
    .replace(/\-\-+/g, '-')   // 연속된 하이픈을 하나로 변환
    .replace(/^-+/, '')       // 시작 부분의 하이픈 제거
    .replace(/-+$/, '');      // 끝 부분의 하이픈 제거
}

export async function generateStaticParams() {
  const products = await getProducts();
  
  return products.map((product) => ({
    brand_name_en: toSlug(product.brand?.brand_name_en || ''),
    product_name: toSlug(product.product_name_en),
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const products = await getProducts();
  
  const product = products.find(
    (p) => 
      toSlug(p.brand?.brand_name_en || '') === params.brand_name_en &&
      toSlug(p.product_name_en) === params.product_name
  );

  if (!product) {
    console.log('Available products:', products.map(p => ({
      brand: toSlug(p.brand?.brand_name_en || ''),
      product: toSlug(p.product_name_en)
    })));
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
              alt={`${product.brand?.brand_name_ko} ${product.product_name_ko}`}
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
          <p className="text-lg font-bold text-gray-800 mb-2">
            {product.brand?.brand_name_en}
          </p>
          <h1 className="text-2xl font-medium mb-4 text-gray-800">
            {product.brand?.brand_name_ko} {product.product_name_ko}
          </h1>
        </div>

        <div className="w-full h-[8px] bg-gray-100" />

        {/* 제품 상세 정보 */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">상품 정보</h2>
          <div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">브랜드</h3>
              <p className="text-gray-800 font-semibold">
                {product.brand?.brand_name_ko} ({product.brand?.brand_name_en})
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">모델명</h3>
              <p className="text-gray-800 font-semibold">
                {product.model_name}
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">디스플레이 크기</h3>
              <p className="text-gray-800 font-semibold">
                {product.display_size}
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">해상도</h3>
              <p className="text-gray-800 font-semibold">
                {product.display_resolution}
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4">
              <h3 className="text-gray-800">디스플레이 타입</h3>
              <p className="text-gray-800 font-semibold">
                {product.display_type}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-[8px] bg-gray-100" />

        {/* 구매처 섹션 */}
        {product.distributors && product.distributors.length > 0 && (
          <div className="px-4 py-6">
            <h2 className="text-xl font-bold mb-4">구매처</h2>
            <div>
              {product.distributors.map((distributor) => (
                <a
                  key={distributor.distributor_id}
                  href={distributor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center border-b border-gray-100 py-5"
                >
                  <span className="text-gray-800 font-bold">
                    {distributor.distributor_name}
                  </span>
                  <RightIcon className="w-5 h-5 text-gray-400 ml-2" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 하단 고정 구매 버튼 */}
      {product.distributors && product.distributors.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-white max-w-[500px] mx-auto">
          <a
            href={product.distributors[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-primary text-white font-bold py-3 px-2 rounded-lg block text-center"
          >
            구매하러 가기
          </a>
        </div>
      )}
    </div>
  );
} 