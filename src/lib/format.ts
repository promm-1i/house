// 만원 단위 숫자를 "1억 5,000만" 같은 한국식 표기로 변환
export function formatManwon(manwon: number): string {
  if (manwon <= 0) return "0";
  const eok = Math.floor(manwon / 10000);
  const rest = manwon % 10000;

  if (eok > 0 && rest > 0) {
    return `${eok}억 ${rest.toLocaleString("ko-KR")}만`;
  }
  if (eok > 0) {
    return `${eok}억`;
  }
  return `${rest.toLocaleString("ko-KR")}만`;
}

export function formatArea(sqm: number): string {
  const pyeong = sqm / 3.3058;
  return `${sqm.toLocaleString("ko-KR")}㎡ (${pyeong.toFixed(1)}평)`;
}
