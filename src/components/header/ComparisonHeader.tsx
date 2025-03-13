"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BackIcon from "@/components/icon/BackIcon";

const ProductHeader: React.FC = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 left-0 right-0 bg-white h-14 z-10">
      <div className="max-w-screen-md mx-auto px-4 h-14 flex items-center border-b border-gray-100">
        <button
          onClick={() => router.back()}
          aria-label="뒤로 가기"
        >
          <BackIcon className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold">비교하기</h1>
      </div>
    </header>
  );
};

export default ProductHeader;
