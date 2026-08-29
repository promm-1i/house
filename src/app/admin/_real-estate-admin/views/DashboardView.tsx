import { Building2, Users, CalendarDays, Check, Compass, TrendingUp } from "lucide-react";
import { useRealEstateAdmin } from "../store";
import { StatCard, PanelHeader } from "../components";

export function DashboardView() {
  const { listings, inquiries, schedules, fieldVisits, dealCases, activityLog } = useRealEstateAdmin();

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
      <PanelHeader
        title="대시보드"
        description="매물·문의·일정 현황을 한눈에 확인합니다. 아래 숫자는 이 데모에서 실제로 조작한 데이터를 기준으로 계산됩니다."
      />

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
                <span className="w-16 shrink-0 text-muted-foreground">{type}</span>
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
                <span className="w-16 shrink-0 text-muted-foreground">{manager}</span>
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
