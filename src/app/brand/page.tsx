import BrandHeader from '@/components/header/BrandHeader';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import { getBrands } from '@/lib/getBrands';
import Link from 'next/link';

export default async function BrandPage() {
  const brands = await getBrands();

  return (
    <div className="pb-16">
      <BrandHeader />
      
      <div className="px-4 py-6">        
        <div className="grid grid-cols-2 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.brand_id}
              href={`/${brand.brand_name_en.toLowerCase()}`}
              className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <p className="text-lg font-semibold text-gray-800">{brand.brand_name_ko}</p>
              <p className="text-sm text-gray-600 mt-1">{brand.brand_name_en}</p>
            </Link>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
