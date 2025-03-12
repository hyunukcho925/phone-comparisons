import SearchHeader from "@/components/header/SearchHeader";
import BottomNavigation from "@/components/navigation/BottomNavigation";

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SearchHeader />
      <main className="flex-grow p-6">
        {/* 검색 결과가 표시될 영역 */}
        <div className="max-w-6xl mx-auto">
          {/* 여기에 검색 결과 컴포넌트들이 들어갈 예정입니다 */}
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
