import React from "react";
import Link from "next/link";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import MainHeader from "@/components/header/MainHeader";
import SearchIcon from "@/components/icon/SearchIcon";
import ProductList from "@/components/product/ProductList";


export default async function Page() {

  return (
    <div className="flex flex-col min-h-screen-56">
      <MainHeader />
      <main className="flex-grow px-4 py-6 bg-gray-100">
        <h1 className="text-2xl font-extrabold mb-6 text-center leading-normal">
          <span className="text-black-500">원하는 핸드폰, </span>
          <br />
          <span className="text-primary">스펙이 어떻게 될까요?</span>
        </h1>

        <div className="relative mb-12">
          <Link href="/search" className="block" title="검색">
            <input
              type="text"
              placeholder="핸드폰을 검색해 보세요"
              className="w-full py-3 px-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              readOnly
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary rounded-full p-2">
              <SearchIcon className="h-5 w-5 text-white" />
            </div>
          </Link>
        </div>

        <div className="mb-12">
          <Link href="/comparison" className="block w-full" title="비교하기">
            <div className="w-full bg-white rounded-xl p-6 flex flex-col items-center border hover:shadow-lg transition-shadow">
              <h2 className="font-bold text-xl mb-4">
                비교하고 싶은 핸드폰이 있나요?
              </h2>
              <div className="flex items-center justify-center w-full gap-4">
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-xl text-gray-400">+</span>
                </div>
                <div className="text-lg font-bold text-primary">VS</div>
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-xl text-gray-400">+</span>
                </div>
              </div>
              <p className="text-gray-600 text-base mt-4">
                두 제품의 스펙을 한눈에 비교해 보세요
              </p>
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-1">⚡</span> 지금 가장 HOT한 핸드폰
          </h2>
          <ProductList />
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
