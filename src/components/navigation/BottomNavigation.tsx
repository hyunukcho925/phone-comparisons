"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@/components/icon/HomeIcon";
import CategoryIcon from "@/components/icon/CategoryIcon";
import SearchIcon from "@/components/icon/SearchIcon";
import MagazineIcon from "@/components/icon/MagazineIcon";

const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "홈", path: "/", icon: HomeIcon },
    { name: "검색", path: "/search", icon: SearchIcon },
    { name: "브랜드", path: "/brand", icon: CategoryIcon },
    { name: "매거진", path: "/magazine", icon: MagazineIcon},
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white max-w-[500px] mx-auto flex justify-between items-center h-16 border-t border-gray-100">
      <div className="flex justify-between items-center w-full">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex flex-col items-center justify-center w-full h-full ${
              pathname === item.path
                ? "text-primary font-bold"
                : "text-gray-400 font-normal"
            }`}
            title={item.name}
          >
            <item.icon className="size-6 mb-1" />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
