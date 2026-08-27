import { BuildingRegistryInfo, Listing } from "@/types/listing";
import { DATA_GO_KR_BUILDING_REGISTRY_KEY, hasBuildingRegistryKey } from "@/lib/config";

const MOCK_RESULT: BuildingRegistryInfo = {
  violationStatus: "해당없음",
  unregisteredStatus: "해당없음",
  useApprovalDate: "2017-09-29",
  source: "mock",
};

const API_BASE =
  "https://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo";

/**
 * 건축물대장 정보 조회.
 *
 * - `DATA_GO_KR_BUILDING_REGISTRY_KEY`가 없거나, 매물에 `buildingCode`
 *   (법정동 코드 체계)가 없으면 목업 값을 반환한다.
 * - 둘 다 있으면 공공데이터포털 "건축물대장정보 서비스"(BldRgstService_v2,
 *   getBrTitleInfo)를 실제로 호출한다.
 *
 * 주의: 아래 필드 매핑(violationStatus/useApprovalDate)은 공공데이터포털
 * 오픈API 문서 기준 통상적인 응답 스키마를 반영한 것이며, 실제 인증키로
 * 첫 호출 테스트를 해본 뒤 data.go.kr의 최신 응답 명세와 대조해서
 * 필드명을 확정해야 한다. 세움터 계정 로그인 방식은 쓰지 않는다 —
 * 계정 정보를 서버가 다뤄야 하고 UI 변경에 취약하기 때문이다.
 */
export async function getBuildingRegistryInfo(
  listing: Pick<Listing, "address" | "buildingCode">
): Promise<BuildingRegistryInfo> {
  if (!hasBuildingRegistryKey || !listing.buildingCode) {
    return MOCK_RESULT;
  }

  const { sigunguCd, bjdongCd, platGbCd, bun, ji } = listing.buildingCode;
  const params = new URLSearchParams({
    serviceKey: DATA_GO_KR_BUILDING_REGISTRY_KEY,
    sigunguCd,
    bjdongCd,
    platGbCd,
    bun,
    ji,
    numOfRows: "1",
    pageNo: "1",
    _type: "json",
  });

  try {
    const res = await fetch(`${API_BASE}?${params.toString()}`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) throw new Error(`건축물대장 API 응답 오류: ${res.status}`);

    const data = await res.json();
    const item = data?.response?.body?.items?.item;
    const record = Array.isArray(item) ? item[0] : item;
    if (!record) return MOCK_RESULT;

    return {
      violationStatus: record.violationBotSn === "1" ? "위반건축물" : "해당없음",
      unregisteredStatus: "해당없음",
      useApprovalDate: record.useAprDay ?? "정보없음",
      source: "data.go.kr",
    };
  } catch (err) {
    console.error("건축물대장 API 호출 실패, 목업으로 대체:", err);
    return MOCK_RESULT;
  }
}
