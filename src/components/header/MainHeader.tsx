import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/assets/Logo.jpg";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 left-0 right-0 bg-white h-14 z-10 border-b border-gray-200">
      <div className="max-w-screen-md mx-auto px-4 h-14 flex justify-between items-center">
        <Link href="/" className="flex items-center" title="로고">
          <Image src={LogoImage} alt="로고" width={70} title="로고" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
