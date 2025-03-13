'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/getProducts';
import Image from 'next/image';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const PRODUCT_SELECT = `
  *,
  brand:brand_id (
    brand_id,
    brand_name_ko,
    brand_name_en
  ),
  distributors:distributor (
    distributor_id,
    distributor_name,
    link
  ),
  colors:product_color (
    product_color_id,
    color_name_ko,
    color_name_en,
    color_code,
    product_image,
    color_order
  )
`;

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
  existingProductIds: number[];
}

export default function SearchModal({ isOpen, onClose, onSelect, existingProductIds }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    let isMounted = true;

    async function searchByProductName(searchQuery: string) {
      const { data, error } = await supabase
        .from('product')
        .select(PRODUCT_SELECT)
        .or(`product_name_ko.ilike.${searchQuery},product_name_en.ilike.${searchQuery}`)
        .not('product_id', 'in', `(${existingProductIds.join(',')})`);
      
      if (error) throw error;
      return data || [];
    }

    async function searchByBrandName(searchQuery: string) {
      const { data: brandIds, error: brandIdError } = await supabase
        .from('brand')
        .select('brand_id')
        .or(`brand_name_ko.ilike.${searchQuery},brand_name_en.ilike.${searchQuery}`);
      
      if (brandIdError) throw brandIdError;
      
      const { data, error } = await supabase
        .from('product')
        .select(PRODUCT_SELECT)
        .in('brand_id', brandIds?.map(b => b.brand_id) || [])
        .not('product_id', 'in', `(${existingProductIds.join(',')})`);
      
      if (error) throw error;
      return data || [];
    }

    async function fetchSearchResults() {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchQuery = `%${searchTerm}%`;
        const [productResults, brandResults] = await Promise.all([
          searchByProductName(searchQuery),
          searchByBrandName(searchQuery)
        ]);

        const uniqueResults = Array.from(new Map(
          [...productResults, ...brandResults].map(item => [item.product_id, item])
        ).values());

        if (isMounted) {
          setSearchResults(uniqueResults.map(product => ({
            ...product,
            distributors: product.distributors || [],
            colors: product.colors || []
          })));
        }
      } catch (error) {
        console.error('검색 오류:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    const debounceTimeout = setTimeout(fetchSearchResults, 300);

    return () => {
      isMounted = false;
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm, supabase, existingProductIds]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-[440px] min-h-[40vh] max-h-[80vh] rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">제품 검색</h2>
            <button onClick={onClose} className="text-gray-500">✕</button>
          </div>
          <input
            type="text"
            placeholder="제품명 또는 브랜드명 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">검색 중...</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((product) => (
              <button
                key={product.product_id}
                onClick={() => {
                  onSelect(product);
                  onClose();
                }}
                className="flex items-center p-4 w-full hover:bg-gray-50 border-b"
              >
                <Image
                  src={product.product_image}
                  alt={product.product_name_ko}
                  width={50}
                  height={50}
                  className="mr-4"
                />
                <div className="text-left">
                  <div className="font-medium">{product.product_name_ko}</div>
                  <div className="text-sm text-gray-500">{product.brand?.brand_name_ko}</div>
                </div>
              </button>
            ))
          ) : searchTerm ? (
            <div className="p-4 text-center text-gray-500">검색 결과가 없습니다.</div>
          ) : null}
        </div>
      </div>
    </div>
  );
} 