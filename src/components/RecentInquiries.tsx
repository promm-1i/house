const STATUS_STYLE: Record<string, string> = {
  상담접수: "bg-amber-50 text-amber-700",
  상담중: "bg-blue-50 text-blue-700",
  상담완료: "bg-zinc-100 text-zinc-500",
};

const SAMPLE_INQUIRIES = [
  {
    name: "이○○",
    phone: "010-****-****",
    content: "문정동 사무실 임대 의뢰드립니다. 전용면적 13평, 즉시입주 가능합니다.",
    status: "상담완료",
  },
  {
    name: "김○○",
    phone: "010-****-****",
    content: "전기공사업체가 입주할 수 있는 30평 내외 사무실을 찾고 있습니다.",
    status: "상담중",
  },
  {
    name: "장○○",
    phone: "010-****-****",
    content: "실면적 50평 정도 임대 사무실, 다음달 안으로 입주해야 합니다.",
    status: "상담접수",
  },
];

export default function RecentInquiries() {
  return (
    <ul className="flex flex-col divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white">
      {SAMPLE_INQUIRIES.map((item, i) => (
        <li key={i} className="flex items-start gap-3 p-3 text-sm">
          <span
            className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[11px] font-medium ${STATUS_STYLE[item.status]}`}
          >
            {item.status}
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
