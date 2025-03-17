"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@/components/icon/SearchIcon";

const MagazineHeader: React.FC = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 left-0 right-0 w-full bg-white border-b z-10">
      <div className="max-w-screen-md mx-auto px-4 h-14 flex justify-between items-center">
        <h1 className="text-xl font-bold">매거진</h1>
        <button onClick={() => router.push("/search")} className="p-0">
          <SearchIcon className="w-6 h-6 text-gray-900" aria-label="검색" />
        </button>
      </div>
    </header>
  );
};

export default MagazineHeader;
