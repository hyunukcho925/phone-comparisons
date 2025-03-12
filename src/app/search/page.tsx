'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import SearchHeader from "@/components/header/SearchHeader";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import ProductComponent from "@/components/product/ProductComponent";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Product } from '@/lib/getProducts';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  const handleSearch = (searchTerm: string) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const productSelect = `
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

  useEffect(() => {
    let isMounted = true;

    async function searchByProductName(searchQuery: string) {
      const { data, error } = await supabase
        .from('product')
        .select(productSelect)
        .or(`product_name_ko.ilike.${searchQuery},product_name_en.ilike.${searchQuery}`);
      
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
        .select(productSelect)
        .in('brand_id', brandIds?.map(b => b.brand_id) || []);
      
      if (error) throw error;
      return data || [];
    }

    async function fetchSearchResults() {
      if (!isMounted) return;
      setIsLoading(true);
      setError(null);

      try {
        if (!query) {
          setSearchResults([]);
          return;
        }

        const searchQuery = `%${query}%`;
        const [productResults, brandResults] = await Promise.all([
          searchByProductName(searchQuery),
          searchByBrandName(searchQuery)
        ]);

        const uniqueResults = Array.from(new Map(
          [...productResults, ...brandResults].map(item => [item.product_id, item])
        ).values());

        const formattedData: Product[] = uniqueResults.map(product => ({
          ...product,
          distributors: product.distributors || [],
          colors: product.colors || []
        }));

        if (isMounted) {
          setSearchResults(formattedData);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : '검색 중 오류가 발생했습니다.';
          console.error('검색 오류:', errorMessage);
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchSearchResults();

    const channel = supabase
      .channel('products_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'product' },
        () => {
          if (isMounted) {
            fetchSearchResults();
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [query, supabase]);

  return (
    <div className="min-h-screen flex flex-col">
      <SearchHeader onSearch={handleSearch} />
      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <p className="text-center">검색 중...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="space-y-4">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <ProductComponent key={product.product_id} product={product} />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  {query ? '검색 결과가 없습니다.' : '검색어를 입력해주세요.'}
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
