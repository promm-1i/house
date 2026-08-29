import KakaoMap from "@/components/KakaoMap";
import { COMPANY_OFFICE, SITE_TITLE_SUFFIX } from "@/lib/config";

export const metadata = { title: `회사소개 | ${SITE_TITLE_SUFFIX}` };

export default function IntroPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">회사소개</h1>

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
