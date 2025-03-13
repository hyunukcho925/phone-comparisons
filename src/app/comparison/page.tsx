'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/getProducts';
import Image from 'next/image';
import Link from 'next/link';
import { toSlug } from '@/utils/stringUtils';
import SearchModal from '@/components/modal/SearchModal';
import PlusCircleIcon from '@/components/icon/PlusCircleIcon';
import ComparisonHeader from '@/components/header/ComparisonHeader';

export default function ComparePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // 기존 비교 제품 로드
    const storedProducts = localStorage.getItem('CompareProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const removeProduct = (productId: number) => {
    const updatedProducts = products.filter(p => p.product_id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('CompareProducts', JSON.stringify(updatedProducts));
  };

  const addProduct = (product: Product) => {
    if (products.length >= 2) {
      alert('최대 2개의 제품만 비교할 수 있습니다.');
      return;
    }
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('CompareProducts', JSON.stringify(updatedProducts));
  };

  return (
    <>
      <ComparisonHeader />
      <div className="max-w-[500px] mx-auto pb-4">
        {/* 제품 이미지 및 이름 */}
        <div className="flex w-full border-b">
          <div className="w-1/5 min-h-[200px]" />
          {products.map((product) => (
            <div key={product.product_id} className="w-2/5 p-4 text-center">
              <button
                onClick={() => removeProduct(product.product_id)}
                className="float-right text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              <Link
                href={`/${toSlug(product.brand?.brand_name_en || "")}/${toSlug(
                  product.product_name_en
                )}`}
              >
                <Image
                  src={product.product_image}
                  alt={product.product_name_ko}
                  width={120}
                  height={120}
                  className="mx-auto mb-2"
                />
                <h2 className="font-bold text-sm">{product.product_name_ko}</h2>
              </Link>
            </div>
          ))}
          {products.length < 2 && (
            <div className="w-2/5 p-4 flex items-center justify-center">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex flex-col items-center text-black"
              >
                <PlusCircleIcon className="w-6 h-6 mb-2 text-gray-400" />
                <span className="text-sm text-gray-400">제품 추가</span>
              </button>
            </div>
          )}
        </div>

        {/* 스펙 비교 테이블 */}
        <div className="divide-y">
          {/* 기본 정보 */}
          <SpecSection title="기본 정보">
            <CompareRow
              label="브랜드"
              values={products.map(
                (p) => `${p.brand?.brand_name_ko} (${p.brand?.brand_name_en})`
              )}
            />
            <CompareRow
              label="크기"
              values={products.map((p) => `${p.display_size_inch}인치`)}
            />
            <CompareRow
              label="무게"
              values={products.map((p) => `${p.product_weight}g`)}
            />
          </SpecSection>

          {/* 카메라 */}
          <SpecSection title="카메라">
            <CompareRow
              label="초광각"
              values={products.map((p) => `${p.camera_ultrawide}MP`)}
            />
            <CompareRow
              label="광각"
              values={products.map((p) => `${p.camera_wide}MP`)}
            />
            <CompareRow
              label="망원"
              values={products.map((p) => `${p.camera_telephoto}MP`)}
            />
            <CompareRow
              label="전면"
              values={products.map((p) => `${p.camera_front}MP`)}
            />
          </SpecSection>

          {/* 배터리 */}
          <SpecSection title="배터리">
            <CompareRow
              label="용량"
              values={products.map((p) => `${p.battery_capacity}mAh`)}
            />
            <CompareRow
              label="비디오 재생"
              values={products.map(
                (p) => `최대 ${p.battery_video_playback}시간`
              )}
            />
          </SpecSection>

          {/* AP */}
          <SpecSection title="AP">
            <CompareRow
              label="프로세서"
              values={products.map((p) => p.product_processor)}
            />
            <CompareRow
              label="코어 개수"
              values={products.map((p) => `${p.core_count}`)}
            />
          </SpecSection>

          {/* 크기 */}
          <SpecSection title="크기">
            <CompareRow
              label="무게"
              values={products.map((p) => `${p.product_weight}g`)}
            />
            <CompareRow
              label="크기"
              values={products.map((p) => p.product_size)}
            />
          </SpecSection>

          {/* 디스플레이 */}
          <SpecSection title="디스플레이">
            <CompareRow
              label="크기"
              values={products.map((p) => `${p.display_size}cm`)}
            />
            <CompareRow
              label="해상도"
              values={products.map((p) => p.display_resolution)}
            />
            <CompareRow
              label="최대 밝기"
              values={products.map((p) => `${p.display_max_brightness}nits`)}
            />
            <CompareRow
              label="주사율"
              values={products.map((p) => `${p.refresh_rate}Hz`)}
            />
          </SpecSection>
        </div>

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelect={addProduct}
          existingProductIds={products.map((p) => p.product_id)}
        />
      </div>
    </>
  );
}

function SpecSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-4">
      <h3 className="font-bold px-4 mb-2">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

function CompareRow({ label, values }: { label: string; values: (string | undefined)[] }) {
  return (
    <div className="flex px-4 py-2 hover:bg-gray-50">
      <div className="w-1/5 text-gray-600">{label}</div>
      {values.map((value, index) => (
        <div key={index} className="w-2/5 font-medium text-center">
          {value || '-'}
        </div>
      ))}
      {/* 제품이 없는 경우 빈 칸 표시 */}
      {Array.from({ length: 2 - values.length }).map((_, index) => (
        <div key={`empty-${index}`} className="w-2/5 font-medium text-center">
          -
        </div>
      ))}
    </div>
  );
} 