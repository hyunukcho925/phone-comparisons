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

export interface ProductColor {
  product_color_id: number;
  product_id: number;
  color_name_ko: string;
  color_name_en: string;
  color_code: string;
  product_image: string;
  color_order: number;
}

export interface Product {
  product_id: number;
  brand_id: number;
  product_name_en: string;
  product_name_ko: string;
  model_name: string;
  display_size: number;
  product_weight: string;
  product_image: string;
  camera_ultrawide: string;
  camera_wide: string;
  camera_telephoto: string;
  camera_front: string;
  battery_capacity: string;
  battery_video_playback: string;
  product_processor: string;
  product_size: string;
  display_max_brightness: string;
  core_count: string;
  display_resolution: string;
  refresh_rate: string;
  display_size_inch: number;
  brand?: Brand;
  distributors?: Distributor[];
  colors?: ProductColor[];
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
          product_id,
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
      `);

    if (error) throw error;

    return data.map(product => ({
      ...product,
      distributors: Array.isArray(product.distributors) 
        ? product.distributors 
        : product.distributors ? [product.distributors] : [],
      colors: product.colors || []
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
        ),
        colors:product_color (
          product_color_id,
          color_name_ko,
          color_name_en,
          color_code,
          product_image,
          color_order
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
      distributors: data.distributors || [],
      colors: data.colors || []
    };
  } catch (error) {
    console.error('데이터베이스 조회 중 오류 발생:', error);
    throw new Error('제품 데이터를 불러오는데 실패했습니다.');
  }
} 