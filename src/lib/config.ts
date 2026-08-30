// 나중에 실제 키/링크를 .env(.local)에만 넣으면 아래 값들이 자동으로 채워지고,
// 관련 기능(지도, 상담문의 알림, 건축물대장 조회)이 코드 수정 없이 바로 연동된다.

export const KAKAO_MAP_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY ?? "";
export const hasKakaoMapKey = KAKAO_MAP_APP_KEY.length > 0;

export const DATA_GO_KR_BUILDING_REGISTRY_KEY =
  process.env.DATA_GO_KR_BUILDING_REGISTRY_KEY ?? "";
export const hasBuildingRegistryKey =
  DATA_GO_KR_BUILDING_REGISTRY_KEY.length > 0;

// 상담문의/매물의뢰 폼 제출 시 알림을 보낼 웹훅 URL (예: 슬랙/디스코드 Incoming Webhook).
export const CONTACT_WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL ?? "";
export const hasContactWebhook = CONTACT_WEBHOOK_URL.length > 0;

// 실제 회사가 아닌 샘플임을 분명히 하기 위한 가상의 상호/정보.
export const SITE_NAME = "EstateSample";
export const SITE_TITLE_SUFFIX = "EstateSample (SAMPLE DEMO)";

export const COMPANY_OFFICE = {
  name: "EstateSample 부동산중개법인",
  representative: "김도윤",
  address: "서울특별시 송파구 문정로 100, 5층 (샘플빌딩)",
  phone: "02-1234-5678",
  fax: "02-1234-5679",
  email: "sample@example.com",
  bizRegNo: "000-00-00000",
  realEstateRegNo: "00000-2024-00000",
  lat: 37.4855,
  lng: 127.1215,
};
