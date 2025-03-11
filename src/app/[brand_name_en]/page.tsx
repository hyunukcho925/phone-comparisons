import BrandHeader from '@/components/header/BrandHeader';
import { getBrands } from '@/lib/getBrands';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    brand_name_en: string;
  };
}

export default async function BrandDetailPage({ params: { brand_name_en } }: Props) {
  const brands = await getBrands();
  const brand = brands.find(
    (b) => b.brand_name_en.toLowerCase() === brand_name_en
  );

  if (!brand) {
    notFound();
  }

  return (
    <div className="pb-16">
      <BrandHeader />
      
      <div className="px-4 py-6">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-900">{brand.brand_name_ko}</h1>
          <p className="text-lg text-gray-600 mt-2">{brand.brand_name_en}</p>
        </div>
      </div>

    </div>
  );
} 