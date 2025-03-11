import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/lib/getProducts';
import { toSlug } from '@/utils/stringUtils';

export default async function ProductList() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link
          href={`/${toSlug(product.brand?.brand_name_en || '')}/${toSlug(product.product_name_en)}`}
          key={product.product_id}
          className="block"
        >
          <div className="border rounded-lg hover:shadow-lg transition-shadow">
            <div className="relative w-full aspect-square mb-2 px-4">
              <div className="relative w-full h-full">
                <Image
                  src={product.product_image}
                  alt={product.product_name_ko}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            </div>
            <div className="bg-gray-100 p-2">
              <p className="text-gray-600 text-xs">
                {product.brand?.brand_name_ko}
              </p>
              <h3 className="font-medium text-sm mb-1">
                {product.product_name_ko}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 