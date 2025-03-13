interface Magazine {
  magazine_id: number;
  title: string;
  content: string;
  thumbnail_image: string;
  created_at: string;
}

export async function getMagazines(): Promise<Magazine[]> {
  // 예시 데이터
  const sampleMagazines: Magazine[] = [
    {
      magazine_id: 1,
      title: "2024 봄 트렌드 컬러",
      content: "따스한 봄날을 맞이하여 2024년 트렌드 컬러를 소개합니다. 피치 퍼프, 라벤더 미스트 등 부드럽고 로맨틱한 색상이 올해의 주요 트렌드로 떠오르고 있습니다.",
      thumbnail_image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800",
      created_at: "2024-03-15T09:00:00Z"
    },
    {
      magazine_id: 2,
      title: "미니멀리즘의 재해석",
      content: "현대적인 미니멀리즘은 단순함을 넘어 개성을 표현하는 새로운 방식으로 진화하고 있습니다. 깔끔한 라인과 독특한 디테일의 조화를 통해 미니멀하면서도 특별한 스타일을 완성해보세요.",
      thumbnail_image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800",
      created_at: "2024-03-10T15:30:00Z"
    },
    {
      magazine_id: 3,
      title: "지속 가능한 패션의 미래",
      content: "환경을 생각하는 패션의 시대가 왔습니다. 재활용 소재를 활용한 디자인부터 친환경 생산 방식까지, 지속 가능한 패션의 현재와 미래를 살펴봅니다.",
      thumbnail_image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
      created_at: "2024-03-05T11:20:00Z"
    },
    {
      magazine_id: 4,
      title: "스니커즈 컬렉션 가이드",
      content: "데일리룩부터 포멀룩까지, 다양한 스타일링이 가능한 스니커즈 컬렉션을 소개합니다. 클래식한 디자인부터 최신 트렌드까지 당신의 스타일을 완성할 스니커즈를 찾아보세요.",
      thumbnail_image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
      created_at: "2024-03-01T13:45:00Z"
    }
  ];

  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise(resolve => setTimeout(resolve, 1000));

  return sampleMagazines;
} 