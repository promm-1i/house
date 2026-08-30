import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Search, Check, Calendar as CalendarIcon, List, Send, Inbox, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useRealEstateAdmin } from "../store";
import { PanelHeader, StatusBadge, Modal, Row, EmptyResult, StatCard } from "../components";
import type { Customer, CustomerStatus, ScheduleType } from "../types";

const CUSTOMER_STATUS_TONE: Record<CustomerStatus, "success" | "warning" | "danger" | "neutral" | "info"> = {
  신규: "info",
  상담중: "warning",
  매물추천: "info",
  방문예정: "warning",
  협의중: "warning",
  계약완료: "success",
  보류: "neutral",
};

export function CustomerInquiryView() {
  const { customers, inquiries, toggleInquiryStatus } = useCustomerActions();
  const [tab, setTab] = useState<"customer" | "inquiry">("customer");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = customers.filter(
    (c) => query.trim() === "" || c.name.includes(query) || c.interestRegion.includes(query),
  );

  return (
    <div>
      <PanelHeader title="고객 · 문의 관리" description="CRM 형태로 고객 정보와 문의 상태를 관리합니다." />

      <div className="mb-4 inline-flex rounded-lg bg-muted p-1">
        {(["customer", "inquiry"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              tab === t ? "bg-background text-foreground shadow" : "text-muted-foreground",
            )}
          >
            {t === "customer" ? "고객 목록" : "홈페이지 문의"}
          </button>
        ))}
      </div>

      {tab === "customer" ? (
        <div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="고객명 · 관심지역 검색" className="pl-9" />
          </div>
          <div className="mt-4 space-y-2">
            {filtered.length === 0 && <EmptyResult message="조건에 맞는 고객이 없습니다." />}
            {filtered.map((c) => (
              <Row key={c.id} onClick={() => setSelected(c)}>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {c.name} <span className="font-normal text-muted-foreground">· {c.phone}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {c.interestRegion} · {c.dealType} · {c.budget} · 담당 {c.manager}
                  </p>
                </div>
                <StatusBadge label={c.status} tone={CUSTOMER_STATUS_TONE[c.status]} />
              </Row>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {inquiries.map((i) => (
            <Row key={i.id}>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {i.name} <span className="font-normal text-muted-foreground">· {i.phone}</span>
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">{i.content}</p>
              </div>
              <StatusBadge
                label={i.status}
                tone={i.status === "완료" ? "success" : "warning"}
                onClick={() => toggleInquiryStatus(i.id)}
              />
            </Row>
          ))}
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected ? `${selected.name} 고객 상세` : ""}>
        {selected && (
          <div>
            <dl className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="text-muted-foreground">연락처</dt>
                <dd className="mt-0.5 font-medium text-foreground">{selected.phone}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">담당자</dt>
                <dd className="mt-0.5 font-medium text-foreground">{selected.manager}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">관심지역</dt>
                <dd className="mt-0.5 font-medium text-foreground">{selected.interestRegion}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">예산</dt>
                <dd className="mt-0.5 font-medium text-foreground">{selected.budget}</dd>
              </div>
            </dl>
            <h4 className="mt-5 text-xs font-semibold text-foreground">활동 Timeline</h4>
            <div className="mt-2 space-y-3 border-l border-border pl-4">
              {selected.activities.map((a) => (
                <div key={a.id} className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <p className="text-[11px] text-muted-foreground">{a.at}</p>
                  <p className="text-xs text-foreground">
                    <span className="font-medium">[{a.type}]</span> {a.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function useCustomerActions() {
  const { customers, inquiries, setInquiries, logActivity } = useRealEstateAdmin();
  const toggleInquiryStatus = (id: number) => {
    const target = inquiries.find((i) => i.id === id);
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status: i.status === "상담중" ? "완료" : "상담중" } : i)));
    toast.success("상담 상태가 변경되었습니다.");
    if (target) logActivity("문의 상태 변경", target.name);
  };
  return { customers, inquiries, toggleInquiryStatus };
}

export function HomeRequestView() {
  const { homeRequests } = useRealEstateAdmin();
  return (
    <div>
      <PanelHeader title="매물 요청 관리" description="고객이 원하는 조건을 등록하고 매칭 가능한 매물을 확인합니다." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="전체 요청" value={homeRequests.length} icon={Inbox} />
        <StatCard label="매칭 5건 이상" value={homeRequests.filter((r) => r.matchCount >= 5).length} icon={Check} />
        <StatCard label="매칭 3건 이하" value={homeRequests.filter((r) => r.matchCount <= 3).length} icon={List} />
      </div>
      <div className="mt-5 space-y-2">
        {homeRequests.map((r) => (
          <Row key={r.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{r.customer}</p>
              <p className="mt-0.5 text-xs text-muted-foreground break-keep">
                {r.region} · {r.dealType} · {r.propertyType} · {r.budget} · 방 {r.rooms} · 입주 {r.moveInDate}
              </p>
            </div>
            <StatusBadge label={`매칭 ${r.matchCount}건`} tone={r.matchCount >= 5 ? "success" : "info"} />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function FieldVisitView() {
  const { fieldVisits, setFieldVisits, logActivity } = useRealEstateAdmin();
  const [selected, setSelected] = useState<(typeof fieldVisits)[number] | null>(null);

  const stats = [
    { label: "오늘 임장", value: fieldVisits.filter((v) => v.visitDate === "2026-08-29").length },
    { label: "예정", value: fieldVisits.filter((v) => v.status === "예정").length },
    { label: "완료", value: fieldVisits.filter((v) => v.status === "완료").length },
  ];

  return (
    <div>
      <PanelHeader title="임장 관리" description="현장 방문 일정과 결과를 관리합니다." />
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-xl font-semibold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2">
        {fieldVisits.map((v) => (
          <Row key={v.id} onClick={() => setSelected(v)}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{v.propertyTitle}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {v.visitDate} · {v.manager} · {v.address}
              </p>
            </div>
            <StatusBadge
              label={v.status}
              tone={v.status === "완료" ? "success" : v.status === "진행중" ? "warning" : "info"}
            />
          </Row>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.propertyTitle ?? ""}>
        {selected && (
          <div className="space-y-3 text-xs">
            <p className="text-muted-foreground">
              집주인 {selected.owner} · {selected.ownerPhone}
            </p>
            {selected.memo ? (
              <>
                <div>
                  <p className="font-medium text-foreground">현장 메모</p>
                  <p className="mt-1 text-muted-foreground">{selected.memo}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="font-medium text-foreground">장점</p>
                    <p className="mt-1 text-muted-foreground">{selected.pros}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">단점</p>
                    <p className="mt-1 text-muted-foreground">{selected.cons}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-foreground">고객 반응</p>
                  <p className="mt-1 text-muted-foreground">{selected.reaction}</p>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">아직 방문 보고서가 작성되지 않았습니다.</p>
            )}
            {selected.status !== "완료" && (
              <Button
                size="sm"
                className="mt-2 gap-1.5"
                onClick={() => {
                  setFieldVisits((prev) => prev.map((p) => (p.id === selected.id ? { ...p, status: "완료" } : p)));
                  logActivity("임장 완료 처리", selected.propertyTitle);
                  setSelected(null);
                }}
              >
                <Check className="h-3.5 w-3.5" />
                임장 완료 처리
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

const SCHEDULE_TYPE_TONE: Record<ScheduleType, "success" | "warning" | "danger" | "neutral" | "info"> = {
  상담: "info",
  임장: "warning",
  계약: "success",
  입주: "success",
  퇴거: "neutral",
  전화: "info",
  기타: "neutral",
};

export function ScheduleView() {
  const { schedules, setSchedules, logActivity } = useRealEstateAdmin();
  const [view, setView] = useState<"list" | "calendar">("list");

  const toggleDone = (id: number) => {
    const target = schedules.find((s) => s.id === id);
    setSchedules((prev) => prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
    if (target) logActivity(target.done ? "일정 완료 취소" : "일정 완료 처리", target.title);
  };

  const byDate = schedules.reduce<Record<string, typeof schedules>>((acc, s) => {
    (acc[s.date] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div>
      <PanelHeader title="일정 관리" description="직원과 고객의 업무 일정을 관리합니다." />
      <div className="mb-4 inline-flex rounded-lg bg-muted p-1">
        <button
          type="button"
          onClick={() => setView("list")}
          className={cn("flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors", view === "list" ? "bg-background text-foreground shadow" : "text-muted-foreground")}
        >
          <List className="h-3.5 w-3.5" />
          목록
        </button>
        <button
          type="button"
          onClick={() => setView("calendar")}
          className={cn("flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors", view === "calendar" ? "bg-background text-foreground shadow" : "text-muted-foreground")}
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          캘린더
        </button>
      </div>

      {view === "list" ? (
        <div className="space-y-2">
          {schedules.map((s) => (
            <div key={s.id} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
              <button
                type="button"
                onClick={() => toggleDone(s.id)}
                aria-label={s.done ? "완료 취소" : "완료 처리"}
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                  s.done ? "border-primary bg-primary text-primary-foreground" : "border-border text-transparent",
                )}
              >
                <Check className="h-3 w-3" />
              </button>
              <div className="min-w-0 flex-1">
                <p className={cn("truncate text-sm font-medium", s.done ? "text-muted-foreground line-through" : "text-foreground")}>
                  {s.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {s.date} · {s.customer} · {s.manager}
                </p>
              </div>
              <StatusBadge label={s.type} tone={SCHEDULE_TYPE_TONE[s.type]} />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(byDate)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, items]) => (
              <div key={date}>
                <p className="text-xs font-semibold text-foreground">{date}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <span
                      key={s.id}
                      className={cn(
                        "rounded-md px-2 py-1 text-[11px] font-medium",
                        s.done ? "bg-secondary text-muted-foreground line-through" : "bg-primary/10 text-primary",
                      )}
                    >
                      {s.type} · {s.title}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

function ResultGroup({ label, count, children }: { label: string; count: number; children: ReactNode }) {
  if (count === 0) return null;
  return (
    <div>
      <h4 className="text-xs font-semibold text-foreground">
        {label} <span className="font-normal text-muted-foreground">({count})</span>
      </h4>
      <div className="mt-1.5 space-y-1.5">{children}</div>
    </div>
  );
}

function ResultRow({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs text-foreground">
      {children}
    </div>
  );
}

export function DataSearchView() {
  const { listings, customers, complexes, dealCases, inquiries } = useRealEstateAdmin();
  const [q, setQ] = useState("");
  const query = q.trim();

  const matchedListings = query ? listings.filter((l) => l.title.includes(query) || l.region.includes(query)) : [];
  const matchedCustomers = query ? customers.filter((c) => c.name.includes(query) || c.phone.includes(query)) : [];
  const matchedComplexes = query ? complexes.filter((c) => c.name.includes(query) || c.address.includes(query)) : [];
  const matchedDealCases = query ? dealCases.filter((d) => d.address.includes(query) || d.complex.includes(query)) : [];
  const matchedInquiries = query ? inquiries.filter((i) => i.name.includes(query) || i.content.includes(query)) : [];

  const totalCount =
    matchedListings.length + matchedCustomers.length + matchedComplexes.length + matchedDealCases.length + matchedInquiries.length;

  return (
    <div>
      <PanelHeader title="데이터 검색" description="매물·고객·단지·거래·문의를 하나의 검색창에서 통합검색합니다." />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="매물명, 고객명, 전화번호, 주소, 단지명 등으로 검색"
          className="h-11 pl-9 text-sm"
        />
      </div>

      {query && (
        <div className="mt-5">
          <p className="text-xs text-muted-foreground">&quot;{query}&quot; 검색 결과 {totalCount}건</p>
          <div className="mt-3 space-y-5">
            <ResultGroup label="매물" count={matchedListings.length}>
              {matchedListings.slice(0, 5).map((l) => (
                <ResultRow key={l.id}>{l.title} — {l.region}</ResultRow>
              ))}
            </ResultGroup>
            <ResultGroup label="고객" count={matchedCustomers.length}>
              {matchedCustomers.slice(0, 5).map((c) => (
                <ResultRow key={c.id}>{c.name} — {c.phone}</ResultRow>
              ))}
            </ResultGroup>
            <ResultGroup label="단지" count={matchedComplexes.length}>
              {matchedComplexes.slice(0, 5).map((c) => (
                <ResultRow key={c.id}>{c.name} — {c.address}</ResultRow>
              ))}
            </ResultGroup>
            <ResultGroup label="거래사례" count={matchedDealCases.length}>
              {matchedDealCases.slice(0, 5).map((d) => (
                <ResultRow key={d.id}>{d.address} — {d.amount}</ResultRow>
              ))}
            </ResultGroup>
            <ResultGroup label="문의" count={matchedInquiries.length}>
              {matchedInquiries.slice(0, 5).map((i) => (
                <ResultRow key={i.id}>{i.name} — {i.content}</ResultRow>
              ))}
            </ResultGroup>
            {totalCount === 0 && <EmptyResult message="검색 결과가 없습니다." />}
          </div>
        </div>
      )}
    </div>
  );
}

export function MessageView() {
  const { messages, setMessages, staff, logActivity } = useRealEstateAdmin();
  const [box, setBox] = useState<"받은쪽지" | "보낸쪽지">("받은쪽지");
  const [composeOpen, setComposeOpen] = useState(false);
  const [form, setForm] = useState({ to: staff[0]?.name ?? "", title: "", content: "" });

  const filtered = messages.filter((m) => m.box === box);

  const send = () => {
    if (!form.title.trim()) {
      toast.error("제목을 입력해 주세요.");
      return;
    }
    setMessages((prev) => [
      { id: Date.now(), from: "나 (데모 사용자)", to: form.to, title: form.title, content: form.content, read: true, sentAt: new Date().toLocaleString("ko-KR"), box: "보낸쪽지" },
      ...prev,
    ]);
    logActivity("쪽지 발송", form.title);
    toast.success("쪽지를 보냈습니다.");
    setForm({ to: staff[0]?.name ?? "", title: "", content: "" });
    setComposeOpen(false);
  };

  return (
    <div>
      <PanelHeader title="쪽지 / 문의" description="직원 간 내부 메시지를 주고받습니다." />
      <div className="flex items-center justify-between">
        <div className="inline-flex rounded-lg bg-muted p-1">
          {(["받은쪽지", "보낸쪽지"] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBox(b)}
              className={cn("rounded-md px-3 py-1.5 text-xs font-medium transition-colors", box === b ? "bg-background text-foreground shadow" : "text-muted-foreground")}
            >
              {b}
            </button>
          ))}
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setComposeOpen(true)}>
          <PenSquare className="h-3.5 w-3.5" />
          새 쪽지
        </Button>
      </div>

      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="쪽지가 없습니다." />}
        {filtered.map((m) => (
          <Row
            key={m.id}
            onClick={() => {
              if (!m.read) setMessages((prev) => prev.map((p) => (p.id === m.id ? { ...p, read: true } : p)));
            }}
          >
            <div className="min-w-0">
              <p className={cn("text-sm", !m.read ? "font-semibold text-foreground" : "font-medium text-foreground")}>
                {box === "받은쪽지" ? m.from : m.to} — {m.title}
              </p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{m.content}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {!m.read && box === "받은쪽지" && <StatusBadge label="안읽음" tone="info" />}
              <span className="text-[11px] text-muted-foreground">{m.sentAt}</span>
            </div>
          </Row>
        ))}
      </div>

      <Modal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        title="새 쪽지"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setComposeOpen(false)}>
              취소
            </Button>
            <Button size="sm" className="gap-1.5" onClick={send}>
              <Send className="h-3.5 w-3.5" />
              보내기
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">받는 직원</label>
            <select
              className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
              value={form.to}
              onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}
            >
              {staff.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">제목</label>
            <Input className="mt-1.5" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">내용</label>
            <Textarea className="mt-1.5" rows={3} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
