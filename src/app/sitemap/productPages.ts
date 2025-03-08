import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabaseClient";

const baseUrl = "https://luxurydispot.com";

export async function getProductPages(): Promise<MetadataRoute.Sitemap> {
  const { data: products } = await supabase
    .from("products")
    .select("name_en, updated_at");

  return (
    products?.map((product) => ({
      url: `${baseUrl}/products/${encodeURIComponent(product.name_en)}`,
      lastModified: new Date(product.updated_at),
      changeFrequency: "daily",
      priority: 0.7,
    })) || []
  );
}
