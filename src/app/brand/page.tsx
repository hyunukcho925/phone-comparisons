"use client";

import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import BrandHeader from '@/components/header/BrandHeader';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import ProductComponent from '@/components/product/ProductComponent';
import { getBrands } from '@/lib/getBrands';
import { getProducts, Product } from '@/lib/getProducts';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Brand {
  brand_id: number;
  brand_name_ko: string;
  brand_name_en: string;
}

export default function BrandPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchBrands();

    const brandsChannel = supabase
      .channel('brands')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'brand' },
        () => {
          fetchBrands();
        }
      )
      .subscribe();

    const productsChannel = supabase
      .channel('products')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'product' },
        () => {
          if (selectedBrand) {
            fetchProducts(selectedBrand.brand_id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(brandsChannel);
      supabase.removeChannel(productsChannel);
    };
  }, [supabase, selectedBrand]);

  const fetchBrands = async () => {
    try {
      const brandsData = await getBrands();
      setBrands(brandsData);
      if (brandsData.length > 0 && !selectedBrand) {
        setSelectedBrand(brandsData[0]);
        await fetchProducts(brandsData[0].brand_id);
      }
    } catch (error) {
      console.error("브랜드를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async (brandId: number) => {
    try {
      const allProducts = await getProducts();
      const filteredProducts = allProducts.filter(product => product.brand_id === brandId);
      setProducts(filteredProducts);
    } catch (error) {
      console.error("제품을 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleTabChange = (index: number) => {
    const newSelectedBrand = brands[index];
    setSelectedBrand(newSelectedBrand);
    fetchProducts(newSelectedBrand.brand_id);
  };

  return (
    <div className="pb-16 bg-gray-100 min-h-[100vh]">
      <BrandHeader />

      <Tab.Group onChange={handleTabChange}>
        <Tab.List className="flex overflow-x-auto whitespace-nowrap border-b bg-white">
          {brands.map((brand) => (
            <Tab
              key={brand.brand_id}
              className={({ selected }) =>
                `px-4 py-2 focus:outline-none transition-colors ${
                  selected
                    ? "text-primary font-bold border-b-2 border-primary"
                    : "text-gray-500"
                }`
              }
            >
              {brand.brand_name_ko}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-4">
          {isLoading ? (
            <div className="text-center py-8 text-gray-600">
              제품 목록을 불러오는 중...
            </div>
          ) : (
            brands.map((brand) => (
              <Tab.Panel key={brand.brand_id} className="px-4">
                {products.length > 0 ? (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <ProductComponent
                        key={product.product_id}
                        product={{
                          product_id: product.product_id,
                          product_image: product.product_image,
                          product_name_ko: product.product_name_ko,
                          product_name_en: product.product_name_en,
                          brand: {
                            brand_name_ko: brand.brand_name_ko,
                            brand_name_en: brand.brand_name_en,
                          },
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-black">
                    이 브랜드의 제품이 없습니다.
                  </div>
                )}
              </Tab.Panel>
            ))
          )}
        </Tab.Panels>
      </Tab.Group>

      <BottomNavigation />
    </div>
  );
}
