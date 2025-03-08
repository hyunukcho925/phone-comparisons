import { MetadataRoute } from "next";
import { getStaticPages } from "./staticPages";
import { getProductPages } from "./productPages";
import { getCategoryPages } from "./categoryPages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = getStaticPages();
  const productPages = await getProductPages();
  const categoryPages = await getCategoryPages();

  return [...staticPages, ...productPages, ...categoryPages];
}
