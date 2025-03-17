"use client";

import React, { useState, useEffect } from "react";
import BottomNavigation from '@/components/navigation/BottomNavigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MagazineHeader from "@/components/header/MagazineHeader";
import { getMagazines } from "@/lib/getMagazines";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Magazine {
  magazine_id: number;
  magazine_title: string;
  magazine_description: string;
  magazine_url: string;
  magazine_thumbnail_url: string;
  created_at: string;
}

export default function MagazinePage() {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    fetchMagazines();

    const magazinesChannel = supabase
      .channel('magazines')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'magazine' },
        () => {
          fetchMagazines();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(magazinesChannel);
    };
  }, [supabase]);

  const fetchMagazines = async () => {
    try {
      const magazinesData = await getMagazines();
      setMagazines(magazinesData as Magazine[]);
    } catch (error) {
      console.error("매거진을 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-16 bg-gray-100 min-h-[100vh]">
      <MagazineHeader />

      <div className="p-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-600">
            매거진 목록을 불러오는 중...
          </div>
        ) : magazines.length > 0 ? (
          <div className="space-y-4">
            {magazines.map((magazine) => (
              <div 
                key={magazine.magazine_id} 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => router.push(`/magazine/${magazine.magazine_url}`)}
              >
                <div className="relative w-full h-48">
                  <Image 
                    src={magazine.magazine_thumbnail_url} 
                    alt={magazine.magazine_title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{magazine.magazine_title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {magazine.magazine_description}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(magazine.created_at).toLocaleDateString('ko-KR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-black">
            등록된 매거진이 없습니다.
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
