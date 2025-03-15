import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toSlug } from '@/utils/stringUtils';

interface ProductComponentProps {
  product: {
    product_id: number;
    product_image: string;
    product_name_ko: string;
    product_name_en: string;
    brand?: {
      brand_name_ko: string;
      brand_name_en: string;
    };
  };
}

export default function ProductComponent({ product }: ProductComponentProps) {
  return (
    <Link
      href={`/${toSlug(product.brand?.brand_name_en || "")}/${toSlug(
        product.product_name_en
      )}`}
      className="block"
      title={product.product_name_ko}
    >
      <div className="flex items-center h-32 space-x-4 border rounded-xl p-4 hover:shadow-lg transition-shadow bg-white">
        <div className="relative w-24 h-32">
          <Image
            src={product.product_image}
            alt={product.product_name_ko}
            title={product.product_name_ko}
            fill
            className="object-contain rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-gray-600 text-base mb-1">
            {product.brand?.brand_name_ko} ({product.brand?.brand_name_en})
          </p>
          <h3 className="text-lg font-bold">{product.product_name_ko}</h3>
        </div>
      </div>
    </Link>
  );
} 