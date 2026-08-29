import { useState } from "react";
import { toast } from "sonner";
import { Globe, ShieldCheck, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PanelHeader, DemoNote } from "../components";

export function SiteScreenSettingsView() {
  const [form, setForm] = useState({
    siteName: "부동산에 기술을 더하는 사람들",
    mainTitle: "믿을 수 있는 부동산 파트너",
    subTitle: "매물 검색부터 상담까지 한 번에",
    phone: "070-8098-8054",
    address: "서울특별시 구로구 디지털로26길 111",
    hours: "평일 09:00 - 18:00",
    showInquiryButton: true,
    showSns: true,
  });

  return (
    <div>
      <PanelHeader title="홈페이지 화면 설정" description="고객 홈페이지에 표시되는 내용을 관리합니다. 값을 바꾸면 오른쪽 미리보기에 즉시 반영됩니다." />
      <DemoNote>
        <Info className="h-3 w-3" />
        데모 화면 — 실제 홈페이지 데이터는 변경되지 않습니다
      </DemoNote>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">사이트명</label>
            <Input className="mt-1.5" value={form.siteName} onChange={(e) => setForm((f) => ({ ...f, siteName: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">메인 타이틀</label>
            <Input className="mt-1.5" value={form.mainTitle} onChange={(e) => setForm((f) => ({ ...f, mainTitle: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">서브 타이틀</label>
            <Input className="mt-1.5" value={form.subTitle} onChange={(e) => setForm((f) => ({ ...f, subTitle: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">대표 전화</label>
            <Input className="mt-1.5" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">주소</label>
            <Input className="mt-1.5" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">영업시간</label>
            <Input className="mt-1.5" value={form.hours} onChange={(e) => setForm((f) => ({ ...f, hours: e.target.value }))} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <span className="text-xs font-medium text-foreground">문의 버튼 표시</span>
            <Switch checked={form.showInquiryButton} onCheckedChange={(v) => setForm((f) => ({ ...f, showInquiryButton: v }))} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <span className="text-xs font-medium text-foreground">SNS 아이콘 표시</span>
            <Switch checked={form.showSns} onCheckedChange={(v) => setForm((f) => ({ ...f, showSns: v }))} />
          </div>
          <Button
            size="sm"
            className="font-bold"
            onClick={() => toast.success("변경사항이 저장되었습니다. (데모)")}
          >
            저장하기
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-secondary/20 p-5">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">미리보기</p>
          <div className="mt-3 overflow-hidden rounded-lg border border-border bg-background">
            <div className="bg-primary/90 px-4 py-6 text-center text-primary-foreground">
              <p className="text-xs opacity-80">{form.siteName}</p>
              <p className="mt-2 text-lg font-bold">{form.mainTitle}</p>
              <p className="mt-1 text-xs opacity-90">{form.subTitle}</p>
              {form.showInquiryButton && (
                <span className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary">
                  상담 문의하기
                </span>
              )}
            </div>
            <div className="px-4 py-3 text-[11px] text-muted-foreground">
              <p>{form.address}</p>
              <p className="mt-0.5">{form.phone} · {form.hours}</p>
              {form.showSns && <p className="mt-1">📷 🎥 💬</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteAdvancedSettingsView() {
  const [form, setForm] = useState({
    seoTitle: "EstateSample — 문정동 부동산 전문 플랫폼",
    metaDescription: "매물 검색, 상담, 계약까지 한 곳에서 처리하는 부동산 플랫폼입니다.",
    domain: "demo1.estatesample.co.kr",
    ga: "",
    naverAuth: "",
    indexable: true,
  });

  return (
    <div>
      <PanelHeader title="홈페이지 고급 설정" description="SEO, 애널리틱스, 도메인 설정을 관리합니다." />
      <DemoNote>
        <Info className="h-3 w-3" />
        데모 화면 — 실제 설정은 변경되지 않습니다
      </DemoNote>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Globe className="h-4 w-4 text-primary" />
            SEO
          </h3>
          <div className="mt-3 space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">사이트 제목</label>
              <Input className="mt-1.5" value={form.seoTitle} onChange={(e) => setForm((f) => ({ ...f, seoTitle: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Meta Description</label>
              <Textarea className="mt-1.5" rows={2} value={form.metaDescription} onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
              <span className="text-xs font-medium text-foreground">검색엔진 노출</span>
              <Switch checked={form.indexable} onCheckedChange={(v) => setForm((f) => ({ ...f, indexable: v }))} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Domain · Analytics
          </h3>
          <div className="mt-3 space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">현재 도메인</label>
              <Input className="mt-1.5" value={form.domain} disabled />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Google Analytics ID</label>
              <Input className="mt-1.5" value={form.ga} onChange={(e) => setForm((f) => ({ ...f, ga: e.target.value }))} placeholder="G-XXXXXXXXXX" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">네이버 사이트 인증</label>
              <Input className="mt-1.5" value={form.naverAuth} onChange={(e) => setForm((f) => ({ ...f, naverAuth: e.target.value }))} placeholder="인증 메타태그 값" />
            </div>
          </div>
        </div>
      </div>

      <Button
        size="sm"
        className="mt-6 font-bold"
        onClick={() => toast.success("설정이 저장되었습니다. (데모)")}
      >
        저장하기
      </Button>
    </div>
  );
}

export function AiSettingsView() {
  const [form, setForm] = useState({
    aiEnabled: true,
    recommend: true,
    chatbot: true,
    autoExtract: true,
    accuracy: 80,
    dailyLimit: 500,
  });

  return (
    <div>
      <PanelHeader title="AI 고급 설정" description="AI 매물추천, 챗봇 등 AI 기능을 제어합니다." />
      <DemoNote>
        <Info className="h-3 w-3" />
        데모 화면 — API Key 입력란은 제공하지 않습니다 (실제 연동 시 서버 환경변수로 관리)
      </DemoNote>

      <div className="space-y-3">
        {[
          { key: "aiEnabled" as const, label: "AI 기능 사용" },
          { key: "recommend" as const, label: "AI 매물추천" },
          { key: "chatbot" as const, label: "AI 챗봇" },
          { key: "autoExtract" as const, label: "검색조건 자동추출" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <span className="text-xs font-medium text-foreground">{item.label}</span>
            <Switch checked={form[item.key]} onCheckedChange={(v) => setForm((f) => ({ ...f, [item.key]: v }))} />
          </div>
        ))}

        <div className="rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
          <div className="flex items-center justify-between text-xs font-medium text-foreground">
            <span>추천 정확도 (데모)</span>
            <span>{form.accuracy}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={form.accuracy}
            onChange={(e) => setForm((f) => ({ ...f, accuracy: Number(e.target.value) }))}
            className="mt-2 w-full"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground">일일 사용량 제한 (건)</label>
          <Input
            type="number"
            className="mt-1.5"
            value={form.dailyLimit}
            onChange={(e) => setForm((f) => ({ ...f, dailyLimit: Number(e.target.value) }))}
          />
        </div>
      </div>

      <Button size="sm" className="mt-5 font-bold" onClick={() => toast.success("AI 설정이 저장되었습니다. (데모)")}>
        저장하기
      </Button>
    </div>
  );
}
