export type DealType = "월세" | "매매" | "전세";
export type PropertyType = "사무실" | "상가" | "오피스텔";
export type ListingLabel =
  | "추천"
  | "전속"
  | "강력추천"
  | "급매물"
  | "대형평수";

export interface Listing {
  id: number;
  title: string;
  address: string;
  district: string; // 예: 서울 송파구 문정동
  dealType: DealType;
  propertyType: PropertyType;
  labels: ListingLabel[];
  themes: string[];
  deposit: number; // 만원 단위
  rent?: number; // 월세, 만원 단위 (매매는 없음)
  salePrice?: number; // 매매가, 만원 단위
  maintenanceFee: number | null; // 원 단위, null이면 "관리비 없음/포함"
  areaExclusive: number; // 전용면적, ㎡
  areaSupply: number; // 공급면적, ㎡
  floorCurrent: number;
  floorTotal: number;
  direction: string;
  mainUse: string;
  parkingCount: number;
  elevatorCount: number;
  moveInDate: string;
  description: string;
  thumbnail: string;
  images: string[];
  lat: number;
  lng: number;
  /**
   * 공공데이터포털 "건축물대장정보 서비스" 조회에 필요한 법정동 코드 체계.
   * 실제 매물 데이터에 이 값이 채워지면 building-registry.ts가 목업 대신
   * 실제 API를 호출한다. 지금 목업 데이터에는 없음(=항상 목업 응답).
   */
  buildingCode?: {
    sigunguCd: string;
    bjdongCd: string;
    platGbCd: "0" | "1";
    bun: string;
    ji: string;
  };
}

export interface BuildingRegistryInfo {
  violationStatus: "해당없음" | "위반건축물";
  unregisteredStatus: "해당없음" | "미등기";
  useApprovalDate: string;
  source: "mock" | "data.go.kr";
}
