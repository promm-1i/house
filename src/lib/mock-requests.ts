export interface PropertyRequest {
  id: number;
  type: "sell" | "buy";
  dealType: string;
  title: string;
  author: string;
  createdAt: string;
}

export const propertyRequests: PropertyRequest[] = [
  {
    id: 3,
    type: "sell",
    dealType: "임대",
    title: "테라타워A동 1층 임대차 의뢰하려고 합니다.",
    author: "동○○",
    createdAt: "2026-08-20",
  },
  {
    id: 2,
    type: "sell",
    dealType: "임대",
    title: "건물주입니다 문정역 도보 10분내 거리 2층 /75평 전체 임대 놓고자 합니다",
    author: "배○○",
    createdAt: "2026-08-15",
  },
  {
    id: 1,
    type: "buy",
    dealType: "월세",
    title: "송파구 사무실 보증금2천 월세 400 언더 룸1개 이상 찾습니다",
    author: "익명",
    createdAt: "2026-08-10",
  },
];
