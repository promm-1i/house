import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Search,
  Plus,
  Star,
  MessageSquareText,
  HardDrive,
  FileSpreadsheet,
  Info,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRealEstateAdmin } from "../store";
import { PanelHeader, StatusBadge, Modal, Row, EmptyResult, DemoNote } from "../components";
import type { Staff } from "../types";

export function StaffRoleView() {
  const { staff, setStaff, logActivity } = useRealEstateAdmin();
  const [selected, setSelected] = useState<Staff | null>(null);

  return (
    <div>
      <PanelHeader title="관리자 / 직원 관리" description="직원 계정과 권한을 관리합니다." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {staff.map((s) => (
          <div
            key={s.id}
            className="cursor-pointer rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
            onClick={() => setSelected(s)}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {s.name.slice(0, 1)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.position}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Select
                value={s.role}
                onValueChange={(v) => {
                  setStaff((prev) => prev.map((p) => (p.id === s.id ? { ...p, role: v as Staff["role"] } : p)));
                  logActivity("직원 권한 변경", `${s.name} → ${v}`);
                  toast.success("권한이 변경되었습니다.");
                }}
              >
                <SelectTrigger className="h-7 w-24 text-xs" onClick={(e) => e.stopPropagation()}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="관리자">관리자</SelectItem>
                  <SelectItem value="직원">직원</SelectItem>
                </SelectContent>
              </Select>
              <StatusBadge label={s.status} tone={s.status === "재직" ? "success" : "neutral"} />
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? ""}>
        {selected && (
          <dl className="grid grid-cols-2 gap-3 text-xs">
            {[
              ["직급", selected.position],
              ["이메일", selected.email],
              ["전화번호", selected.phone],
              ["등록 매물수", `${selected.propertyCount}건`],
              ["최근 로그인", selected.lastLoginAt],
              ["상태", selected.status],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="mt-0.5 font-medium text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </Modal>
    </div>
  );
}

const PERMISSIONS = [
  "매물 조회",
  "매물 등록",
  "매물 수정",
  "매물 삭제",
  "고객 관리",
  "직원 관리",
  "계약 관리",
  "정산 관리",
  "환경 설정",
];
const ROLES = ["직원", "팀장", "이사", "관리자"];
const DEFAULT_MATRIX: Record<string, Record<string, boolean>> = {
  "매물 조회": { 직원: true, 팀장: true, 이사: true, 관리자: true },
  "매물 등록": { 직원: true, 팀장: true, 이사: true, 관리자: true },
  "매물 수정": { 직원: true, 팀장: true, 이사: true, 관리자: true },
  "매물 삭제": { 직원: false, 팀장: true, 이사: true, 관리자: true },
  "고객 관리": { 직원: true, 팀장: true, 이사: true, 관리자: true },
  "직원 관리": { 직원: false, 팀장: false, 이사: true, 관리자: true },
  "계약 관리": { 직원: false, 팀장: true, 이사: true, 관리자: true },
  "정산 관리": { 직원: false, 팀장: false, 이사: true, 관리자: true },
  "환경 설정": { 직원: false, 팀장: false, 이사: false, 관리자: true },
};

export function GroupPermissionView() {
  const { logActivity } = useRealEstateAdmin();
  const [matrix, setMatrix] = useState(DEFAULT_MATRIX);

  const toggle = (perm: string, role: string) => {
    setMatrix((prev) => ({ ...prev, [perm]: { ...prev[perm], [role]: !prev[perm][role] } }));
    logActivity("권한 매트릭스 변경", `${perm} · ${role}`);
  };

  return (
    <div>
      <PanelHeader title="그룹별 권한 설정" description="역할별 기능 접근 권한을 관리합니다. (RBAC — 이 데모에서는 State로만 반영됩니다)" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-2 pr-3 font-medium">기능</th>
              {ROLES.map((r) => (
                <th key={r} className="py-2 pr-3 text-center font-medium">
                  {r}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS.map((perm) => (
              <tr key={perm} className="border-b border-border/60">
                <td className="py-2.5 pr-3 font-medium text-foreground">{perm}</td>
                {ROLES.map((r) => (
                  <td key={r} className="py-2.5 pr-3 text-center">
                    <input
                      type="checkbox"
                      checked={matrix[perm][r]}
                      onChange={() => toggle(perm, r)}
                      className="h-4 w-4"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DealCaseView() {
  const { dealCases } = useRealEstateAdmin();
  const [query, setQuery] = useState("");
  const filtered = dealCases.filter((d) => query.trim() === "" || d.address.includes(query) || d.complex.includes(query));

  return (
    <div>
      <PanelHeader title="매매사례 관리" description="실제 거래 사례를 매물 가격 비교 자료로 활용합니다." />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="지역 · 단지명 검색" className="pl-9" />
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-2 pr-3 font-medium">거래일</th>
              <th className="py-2 pr-3 font-medium">주소</th>
              <th className="py-2 pr-3 font-medium">단지</th>
              <th className="py-2 pr-3 font-medium">거래유형</th>
              <th className="py-2 pr-3 font-medium">금액</th>
              <th className="py-2 pr-3 font-medium">면적</th>
              <th className="py-2 pr-3 font-medium">층</th>
              <th className="py-2 pr-3 font-medium">담당자</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id} className="border-b border-border/60 hover:bg-secondary/30">
                <td className="py-2.5 pr-3 text-muted-foreground">{d.dealDate}</td>
                <td className="py-2.5 pr-3 font-medium text-foreground">{d.address}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{d.complex}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{d.dealType}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{d.amount}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{d.area}㎡</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{d.floor}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{d.manager}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 거래사례가 없습니다." />}
      </div>
    </div>
  );
}

export function PaymentPayrollView() {
  const { payments, payroll } = useRealEstateAdmin();
  const [tab, setTab] = useState<"payment" | "payroll">("payment");

  return (
    <div>
      <PanelHeader title="입금 및 급여관리" description="중개업소 내부 정산 업무를 관리합니다." />
      <DemoNote>
        <Info className="h-3 w-3" />
        데모 데이터입니다
      </DemoNote>
      <div className="mb-4 inline-flex rounded-lg bg-muted p-1">
        {(["payment", "payroll"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn("rounded-md px-3 py-1.5 text-xs font-medium transition-colors", tab === t ? "bg-background text-foreground shadow" : "text-muted-foreground")}
          >
            {t === "payment" ? "입금 관리" : "급여 관리"}
          </button>
        ))}
      </div>

      {tab === "payment" ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2 pr-3 font-medium">계약번호</th>
                <th className="py-2 pr-3 font-medium">고객</th>
                <th className="py-2 pr-3 font-medium">구분</th>
                <th className="py-2 pr-3 font-medium">금액</th>
                <th className="py-2 pr-3 font-medium">입금일</th>
                <th className="py-2 pr-3 font-medium">상태</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-border/60">
                  <td className="py-2.5 pr-3 text-muted-foreground">{p.contractNo}</td>
                  <td className="py-2.5 pr-3 font-medium text-foreground">{p.customer}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{p.kind}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{p.amount}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{p.paidAt}</td>
                  <td className="py-2.5 pr-3">
                    <StatusBadge label={p.status} tone={p.status === "입금완료" ? "success" : "warning"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2 pr-3 font-medium">직원</th>
                <th className="py-2 pr-3 font-medium">기준월</th>
                <th className="py-2 pr-3 font-medium">기본급</th>
                <th className="py-2 pr-3 font-medium">인센티브</th>
                <th className="py-2 pr-3 font-medium">수당</th>
                <th className="py-2 pr-3 font-medium">공제</th>
                <th className="py-2 pr-3 font-medium">예상지급액</th>
              </tr>
            </thead>
            <tbody>
              {payroll.map((p) => (
                <tr key={p.id} className="border-b border-border/60">
                  <td className="py-2.5 pr-3 font-medium text-foreground">{p.staff}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{p.month}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{p.base}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{p.incentive}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{p.allowance}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{p.deduction}</td>
                  <td className="py-2.5 pr-3 font-medium text-foreground">{p.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function ProvisionalContractView() {
  const { provisionalContracts, moveInOut } = useRealEstateAdmin();
  const [tab, setTab] = useState<"provisional" | "movein">("provisional");

  return (
    <div>
      <PanelHeader title="가계약 / 입실퇴거 관리" description="가계약 진행 현황과 입주/퇴거 일정을 관리합니다." />
      <div className="mb-4 inline-flex rounded-lg bg-muted p-1">
        {(["provisional", "movein"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn("rounded-md px-3 py-1.5 text-xs font-medium transition-colors", tab === t ? "bg-background text-foreground shadow" : "text-muted-foreground")}
          >
            {t === "provisional" ? "가계약" : "입실 / 퇴거"}
          </button>
        ))}
      </div>

      {tab === "provisional" ? (
        <div className="space-y-2">
          {provisionalContracts.map((c) => (
            <Row key={c.id}>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{c.property}</p>
                <p className="mt-0.5 text-xs text-muted-foreground break-keep">
                  {c.customer} · 가계약금 {c.deposit} · 예정일 {c.scheduledDate} · 담당 {c.manager}
                  {c.note && ` · ${c.note}`}
                </p>
              </div>
              <StatusBadge
                label={c.status}
                tone={c.status === "본계약완료" ? "success" : c.status === "취소" ? "danger" : "warning"}
              />
            </Row>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {moveInOut.map((m) => (
            <Row key={m.id}>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{m.property}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {m.customer} · 입주 {m.moveInDate || "-"} · 퇴거예정 {m.moveOutDate || "-"} · 담당 {m.manager}
                </p>
              </div>
              <StatusBadge label={m.settled ? "정산완료" : "정산대기"} tone={m.settled ? "success" : "warning"} />
            </Row>
          ))}
        </div>
      )}
    </div>
  );
}

export function BoardView() {
  const { notices, setNotices, logActivity } = useRealEstateAdmin();
  const [draft, setDraft] = useState("");

  const addNotice = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setNotices((prev) => [{ id: Date.now(), title: draft.trim(), published: true }, ...prev]);
    toast.success("공지사항이 등록되었습니다.");
    logActivity("공지 등록", draft.trim());
    setDraft("");
  };

  return (
    <div>
      <PanelHeader title="게시판 관리" description="공지사항, 뉴스, FAQ 등 홈페이지 게시판을 관리합니다." />
      <form onSubmit={addNotice} className="flex gap-2">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="새 공지사항 제목" className="flex-1" />
        <Button type="submit" size="sm" className="shrink-0 gap-1.5 font-bold">
          <Plus className="h-3.5 w-3.5" />
          등록
        </Button>
      </form>
      <div className="mt-4 space-y-2">
        {notices.map((n) => (
          <Row key={n.id}>
            <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
            <StatusBadge
              label={n.published ? "게시중" : "비공개"}
              tone={n.published ? "success" : "neutral"}
              onClick={() => {
                setNotices((prev) => prev.map((p) => (p.id === n.id ? { ...p, published: !p.published } : p)));
                logActivity(n.published ? "공지 비공개 전환" : "공지 게시", n.title);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function EtcView() {
  const cards = [
    { icon: MessageSquareText, title: "문자 발송", desc: "고객에게 안내 문자를 발송합니다." },
    { icon: HardDrive, title: "데이터 백업", desc: "전체 데이터를 백업 파일로 저장합니다." },
    { icon: FileSpreadsheet, title: "엑셀 다운로드", desc: "매물/고객 데이터를 엑셀로 내려받습니다." },
    { icon: Database, title: "저장공간 관리", desc: "이미지·파일 저장공간 사용량을 확인합니다." },
  ];
  return (
    <div>
      <PanelHeader title="기타 기능" description="여러 유틸리티 기능을 모아둔 설정 화면입니다." />
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.title}
              type="button"
              onClick={() =>
                toast("데모 페이지입니다", { description: "실제 서비스에서는 이 기능이 실제로 동작합니다." })
              }
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{c.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground break-keep">{c.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PartnersView() {
  const { partners, setPartners, logActivity } = useRealEstateAdmin();
  const [category, setCategory] = useState("전체");
  const categories = ["전체", ...new Set(partners.map((p) => p.category))];
  const filtered = partners.filter((p) => category === "전체" || p.category === category);

  return (
    <div>
      <PanelHeader title="제휴 업체" description="이사, 청소, 법무사 등 제휴 업체를 관리합니다." />
      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              category === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.category} · {p.manager}</p>
              </div>
              <span className="flex shrink-0 items-center gap-0.5 text-xs font-medium text-amber-500">
                <Star className="h-3 w-3 fill-current" />
                {p.rating}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{p.phone}</p>
            <div className="mt-3">
              <StatusBadge
                label={p.active ? "제휴중" : "제휴중지"}
                tone={p.active ? "success" : "neutral"}
                onClick={() => {
                  setPartners((prev) => prev.map((x) => (x.id === p.id ? { ...x, active: !x.active } : x)));
                  logActivity(p.active ? "제휴 중지" : "제휴 재개", p.name);
                }}
              />
            </div>
          </div>
        ))}
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 업체가 없습니다." />}
      </div>
    </div>
  );
}
