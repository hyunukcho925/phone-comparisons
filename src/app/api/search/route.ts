import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]);
    }

    const searchQuery = `%${query}%`;

    const { data, error } = await supabase
      .from('product')
      .select(`
        product_id,
        product_image,
        product_name_ko,
        product_name_en,
        brand:brand_id (
          brand_name_ko,
          brand_name_en
        )
      `)
      .or(
        `product_name_ko.ilike.${searchQuery},
         product_name_en.ilike.${searchQuery},
         brand(brand_name_ko.ilike.${searchQuery},brand_name_en.ilike.${searchQuery})`
      )
      .limit(20);

    if (error) {
      throw error;
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: '검색 중 오류가 발생했습니다.' }, { status: 500 });
  }
} 