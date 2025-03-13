"use client";

import React, { useState, useEffect } from "react";
import BottomNavigation from '@/components/navigation/BottomNavigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MagazineHeader from "@/components/header/MagazineHedaer";
import { getMagazines } from "@/lib/getMagazines";

interface Magazine {
  magazine_id: number;
  title: string;
  content: string;
  thumbnail_image: string;
  created_at: string;
}

export default function MagazinePage() {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

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
      setMagazines(magazinesData);
    } catch (error) {
      console.error("매거진을 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-16 bg-white min-h-[100vh]">
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
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img 
                  src={magazine.thumbnail_image} 
                  alt={magazine.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{magazine.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {magazine.content}
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
