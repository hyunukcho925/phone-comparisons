export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-") // 공백을 하이픈으로 변환
    .replace(/[^\w\-]+/g, "") // 알파벳, 숫자, 하이픈이 아닌 문자 제거
    .replace(/\-\-+/g, "-") // 연속된 하이픈을 하나로 변환
    .replace(/^-+/, "") // 시작 부분의 하이픈 제거
    .replace(/-+$/, ""); // 끝 부분의 하이픈 제거
} 