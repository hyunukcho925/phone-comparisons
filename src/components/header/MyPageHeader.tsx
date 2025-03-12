import React from "react";

const MyPageHeader: React.FC = () => {
  return (
    <header className="sticky top-0 left-0 right-0 bg-white h-14 z-10">
      <div className="max-w-screen-md mx-auto px-4 h-14 flex justify-between items-center">
        <h1 className="text-xl font-bold">마이</h1>
      </div>
    </header>
  );
};

export default MyPageHeader;
