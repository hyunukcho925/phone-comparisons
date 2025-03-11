import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Brand {
  brand_id: number;
  brand_name_ko: string;
  brand_name_en: string;
}

export async function getBrands(): Promise<Brand[]> {
  try {
    const { data, error } = await supabase
      .from("brand")
      .select("*")
      .order("brand_name_en");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("브랜드 데이터 조회 중 오류 발생:", error);
    throw new Error("브랜드 데이터를 불러오는데 실패했습니다.");
  }
}
