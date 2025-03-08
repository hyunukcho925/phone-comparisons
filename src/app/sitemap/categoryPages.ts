import { MetadataRoute } from "next";
import { getMainCategories, getSubCategories } from "@/lib/categories";

const baseUrl = "https://luxurydispot.com";

export async function getCategoryPages(): Promise<MetadataRoute.Sitemap> {
  const mainCategories = await getMainCategories();

  const mainCategoryPages = mainCategories.map((category) => ({
    url: `${baseUrl}/category/${category.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const subCategoryPages = await Promise.all(
    mainCategories.map(async (mainCategory) => {
      const subCategories = await getSubCategories(mainCategory.id);
      return subCategories.map((subCategory) => ({
        url: `${baseUrl}/category/${mainCategory.id}/${subCategory.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.5,
      }));
    })
  ).then((nestedArrays) => nestedArrays.flat());

  return [...mainCategoryPages, ...subCategoryPages];
}
