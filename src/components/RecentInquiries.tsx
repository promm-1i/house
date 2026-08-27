const SAMPLE_INQUIRIES = [
  {
    name: "이○○",
    phone: "010-****-****",
    content:
      "안녕하세요 임대좀 내놓고 싶습니다. 전용면적 13평, 즉시입주 가능합니다.",
  },
  {
    name: "김○○",
    phone: "010-****-****",
    content: "전기공사업체가 입주 할수 있는 30평내외의 사무실을 찾고 있습니다",
  },
  {
    name: "장○○",
    phone: "010-****-****",
    content: "실면적 50평정도 임대사무실 다음달안으로 입주해야합니다",
  },
];

export default function RecentInquiries() {
  return (
    <ul className="flex flex-col divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white">
      {SAMPLE_INQUIRIES.map((item, i) => (
        <li key={i} className="flex items-start gap-3 p-3 text-sm">
          <span className="mt-0.5 shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 text-[11px] text-zinc-500">
            상담완료
          </span>
          <div className="min-w-0">
            <p className="line-clamp-2 text-zinc-700">{item.content}</p>
            <p className="mt-1 text-xs text-zinc-400">
              {item.name} {item.phone}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
