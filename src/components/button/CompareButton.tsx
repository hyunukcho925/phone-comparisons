'use client';

import { Product } from "@/lib/getProducts";
import { useRouter } from 'next/navigation';

interface CompareButtonProps {
  product: Product;
}

const STORAGE_KEY = 'CompareProducts';

export default function CompareButton({ product }: CompareButtonProps) {
  const router = useRouter();

  const handleCompare = () => {
    const compareProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Product[];
    const updatedProducts = [
      ...compareProducts.filter((p: Product) => p.product_id !== product.product_id),
      product
    ].slice(-2); // 최대 2개까지만 저장

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    
    router.push(`/comparison?productIds=${updatedProducts.map(p => p.product_id).join(',')}`);
  };

  return (
    <button
      onClick={handleCompare}
      className="w-full border border-primary text-primary font-bold py-3 px-2 rounded-lg hover:bg-[#f8f8ff]"
    >
      비교하기
    </button>
  );
} 