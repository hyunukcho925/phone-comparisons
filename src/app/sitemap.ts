import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/getProducts'
import { getMagazines } from '@/lib/getMagazines'
import { toSlug } from '@/utils/stringUtils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://phonecomparisons.com'
  
  // 기본 페이지
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brand`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/magazine`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // 제품 상세 페이지
  const products = await getProducts()
  const productPages = products.map((product) => ({
    url: `${baseUrl}/${toSlug(product.brand?.brand_name_en || "")}/${toSlug(product.product_name_en)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 매거진 페이지
  const magazines = await getMagazines()
  const magazinePages = magazines.map((magazine) => ({
    url: `${baseUrl}/magazine/${magazine.magazine_url}`,
    lastModified: new Date(magazine.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...productPages, ...magazinePages]
} 