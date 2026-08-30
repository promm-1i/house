import { Building2, Users, CalendarDays, Check, Compass, TrendingUp, Plus, MessageSquareText, CalendarPlus } from "lucide-react";
import { useRealEstateAdmin } from "../store";
import { StatCard, PanelHeader, StatusBadge } from "../components";

const QUICK_ACTIONS = [
  { key: "property-register", label: "매물 등록", icon: Plus },
  { key: "customer-inquiry", label: "문의 확인", icon: MessageSquareText },
  { key: "schedule", label: "일정 추가", icon: CalendarPlus },
];

export function DashboardView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { listings, inquiries, schedules, fieldVisits, dealCases, activityLog } = useRealEstateAdmin();

  const recentListings = [...listings]
    .sort((a, b) => (a.registeredAt < b.registeredAt ? 1 : -1))
    .slice(0, 5);
  const recentInquiries = inquiries.slice(0, 5);

  const stats = [
    { label: "전체 매물", value: listings.length, icon: Building2 },
    { label: "공개 매물", value: listings.filter((l) => l.status === "공개").length, icon: Building2 },
    { label: "상담중 문의", value: inquiries.filter((i) => i.status === "상담중").length, icon: Users },
    { label: "예정 일정", value: schedules.filter((s) => !s.done).length, icon: CalendarDays },
    { label: "완료 일정", value: schedules.filter((s) => s.done).length, icon: Check },
    { label: "진행중 임장", value: fieldVisits.filter((v) => v.status !== "완료").length, icon: Compass },
    { label: "이번달 거래사례", value: dealCases.length, icon: TrendingUp },
  ];

  const typeCounts = listings.reduce<Record<string, number>>((acc, l) => {
    acc[l.type] = (acc[l.type] ?? 0) + 1;
    return acc;
  }, {});

  const managerCounts = listings.reduce<Record<string, number>>((acc, l) => {
    acc[l.manager] = (acc[l.manager] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <PanelHeader
          title="대시보드"
          description="매물·문의·일정 현황을 한눈에 확인합니다. 아래 숫자는 이 데모에서 실제로 조작한 데이터를 기준으로 계산됩니다."
        />
        <div className="flex shrink-0 gap-2">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.key}
                type="button"
                onClick={() => onNavigate(action.key)}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {action.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">매물 유형별 현황</h3>
          <div className="mt-3 space-y-2">
            {Object.entries(typeCounts).map(([type, count]) => (
              <div key={type} className="flex items-center gap-3 text-xs">
                <span className="w-24 shrink-0 truncate text-muted-foreground">{type}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(count / listings.length) * 100}%` }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right font-medium text-foreground">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">직원별 담당 매물 수</h3>
          <div className="mt-3 space-y-2">
            {Object.entries(managerCounts).map(([manager, count]) => (
              <div key={manager} className="flex items-center gap-3 text-xs">
                <span className="w-24 shrink-0 truncate text-muted-foreground">{manager}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(count / listings.length) * 100}%` }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right font-medium text-foreground">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">최근 등록 매물</h3>
            <button
              type="button"
              onClick={() => onNavigate("property-list")}
              className="text-xs text-muted-foreground hover:text-primary"
            >
              전체보기
            </button>
          </div>
          <div className="mt-3 space-y-1.5">
            {recentListings.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => onNavigate("property-list")}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-left text-xs transition-colors hover:border-primary/40"
              >
                <span className="min-w-0 flex-1 truncate font-medium text-foreground">{l.title}</span>
                <span className="max-w-[140px] shrink-0 truncate text-muted-foreground" title={l.region}>{l.region}</span>
                <StatusBadge label={l.status} tone={l.status === "공개" ? "success" : "neutral"} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">최근 문의</h3>
            <button
              type="button"
              onClick={() => onNavigate("customer-inquiry")}
              className="text-xs text-muted-foreground hover:text-primary"
            >
              전체보기
            </button>
          </div>
          <div className="mt-3 space-y-1.5">
            {recentInquiries.map((i) => (
              <button
                key={i.id}
                type="button"
                onClick={() => onNavigate("customer-inquiry")}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-left text-xs transition-colors hover:border-primary/40"
              >
                <span className="shrink-0 font-medium text-foreground">{i.name}</span>
                <span className="min-w-0 flex-1 truncate text-muted-foreground">{i.content}</span>
                <StatusBadge label={i.status} tone={i.status === "완료" ? "success" : "warning"} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <h3 className="mt-8 text-sm font-semibold text-foreground">최근 작업 내역</h3>
      <div className="mt-3 space-y-2">
        {activityLog.length === 0 && (
          <p className="rounded-lg border border-dashed border-border bg-secondary/30 p-6 text-center text-xs text-muted-foreground break-keep">
            아직 작업 내역이 없습니다. 왼쪽 메뉴에서 매물을 등록하거나 상태를 변경해보면 여기에
            기록됩니다.
          </p>
        )}
        {activityLog.map((log) => (
          <div
            key={log.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs"
          >
            <span className="shrink-0 text-muted-foreground">{log.time}</span>
            <span className="shrink-0 font-medium text-foreground">{log.action}</span>
            <span className="min-w-0 flex-1 truncate text-muted-foreground">{log.target}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
