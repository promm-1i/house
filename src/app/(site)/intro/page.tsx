import KakaoMap from "@/components/KakaoMap";
import { COMPANY_OFFICE, SITE_TITLE_SUFFIX } from "@/lib/config";

export const metadata = { title: `회사소개 | ${SITE_TITLE_SUFFIX}` };

const APPROACH = [
  {
    title: "무엇을 해결하나",
    description:
      "상업용 부동산은 매물 정보가 흩어져 있고 상담 이력 관리가 어렵습니다. 검색부터 상담, 매물 관리까지 하나의 화면에서 이어지도록 구성했습니다.",
  },
  {
    title: "어떻게 검색·관리하나",
    description:
      "고객은 지도와 조건 검색으로 원하는 매물을 빠르게 찾고, 담당자는 관리자 화면에서 매물 등록·수정·상태 변경을 한 번에 처리합니다.",
  },
  {
    title: "고객과 담당자를 어떻게 연결하나",
    description:
      "홈페이지로 들어온 문의와 매물 요청이 관리자 화면의 상담 현황과 그대로 연결되어, 응대 누락 없이 이어갈 수 있습니다.",
  },
];

export default function IntroPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold">회사소개</h1>
      <p className="mb-8 max-w-2xl break-keep text-sm text-zinc-500">
        OfficeLink는 문정동을 중심으로 사무실·상가 등 상업용 부동산 매물을
        지도 기반으로 검색하고, 상담부터 매물 관리까지 하나의 플랫폼에서
        이어가는 서비스입니다.
      </p>

      <section className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {APPROACH.map((item) => (
          <div key={item.title}>
            <h2 className="mb-1.5 text-sm font-bold text-zinc-900">{item.title}</h2>
            <p className="break-keep text-sm text-zinc-500">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">오시는길</h2>
        <KakaoMap
          markers={[
            {
              id: "office",
              lat: COMPANY_OFFICE.lat,
              lng: COMPANY_OFFICE.lng,
              title: COMPANY_OFFICE.name,
            },
          ]}
          heightClassName="h-72"
        />
      </section>

      <dl className="grid grid-cols-1 gap-x-8 gap-y-2 rounded-lg border border-zinc-200 p-6 text-sm sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-zinc-400">회사명</dt>
          <dd className="font-medium text-zinc-800">{COMPANY_OFFICE.name}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-zinc-400">주소</dt>
          <dd className="font-medium text-zinc-800">{COMPANY_OFFICE.address}</dd>
        </div>
        <div>
          <dt className="text-zinc-400">TEL</dt>
          <dd className="font-medium text-zinc-800">{COMPANY_OFFICE.phone}</dd>
        </div>
        <div>
          <dt className="text-zinc-400">FAX</dt>
          <dd className="font-medium text-zinc-800">{COMPANY_OFFICE.fax}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-zinc-400">이메일</dt>
          <dd className="font-medium text-zinc-800">{COMPANY_OFFICE.email}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-zinc-400">인근 지하철</dt>
          <dd className="font-medium text-zinc-800">8호선 문정역 220m</dd>
        </div>
      </dl>
    </div>
  );
}
