import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Brand {
  brand_id: number;
  brand_name_ko: string;
  brand_name_en: string;
}

export interface Distributor {
  distributor_id: number;
  product_id: number;
  distributor_name: string;
  link: string;
}

export interface Product {
  product_id: number;
  brand_id: number;
  product_name_en: string;
  product_name_ko: string;
  model_name: string;
  display_size: number;
  display_resolution: string;
  display_type: string;
  product_image: string;
  brand?: Brand;
  distributors?: Distributor[];
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('product')
      .select(`
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
        )
      `);

    if (error) throw error;

    return data.map(product => ({
      ...product,
      distributors: product.distributors || []
    }));
  } catch (error) {
    console.error('데이터베이스 조회 중 오류 발생:', error);
    throw new Error('제품 데이터를 불러오는데 실패했습니다.');
  }
}

export async function getProductById(productId: number): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('product')
      .select(`
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
        )
      `)
      .eq('product_id', productId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return {
      ...data,
      distributors: data.distributors || []
    };
  } catch (error) {
    console.error('데이터베이스 조회 중 오류 발생:', error);
    throw new Error('제품 데이터를 불러오는데 실패했습니다.');
  }
} 