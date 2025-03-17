import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Magazine {
  magazine_id: number;
  magazine_title: string;
  magazine_description: string;
  magazine_url: string;
  magazine_thumbnail_url: string;
  created_at: string;
}

export async function getMagazines(): Promise<Magazine[]> {
  try {
    const { data, error } = await supabase
      .from("magazine")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("매거진 데이터 조회 중 오류 발생:", error);
    throw new Error("매거진 데이터를 불러오는데 실패했습니다.");
  }
}
