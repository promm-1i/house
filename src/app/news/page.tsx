import { SITE_TITLE_SUFFIX } from "@/lib/config";

export const metadata = { title: `부동산 소식 | ${SITE_TITLE_SUFFIX}` };

const NEWS: { id: number; title: string; createdAt: string }[] = [
  {
    id: 1,
    title: "문정동 일대 상업용 부동산 거래량 증가세",
    createdAt: "2026-08-25",
  },
  {
    id: 2,
    title: "송파구 사무실 임대료 동향 리포트",
    createdAt: "2026-08-20",
  },
];

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-xl font-bold">부동산 소식</h1>

      <ul className="divide-y divide-zinc-200 border-t border-zinc-300 text-sm">
        {NEWS.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-3">
            <span>{item.title}</span>
            <span className="text-zinc-400">{item.createdAt}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-xs text-zinc-400">
        * 데모 데이터입니다. 실연동 시 네이버 뉴스 검색 API 등으로 교체 가능합니다.
      </p>
    </div>
  );
}
