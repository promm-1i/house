import { useState, type FormEvent } from "react";
import { Sparkles, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRealEstateAdmin } from "../store";
import { PanelHeader, DemoNote, EmptyResult, PropertyPhoto } from "../components";
import type { Listing } from "../types";

function parseQuery(query: string, listings: Listing[]): Listing[] {
  const q = query.toLowerCase();
  const priceMatch = q.match(/(\d+)\s*만/);
  const maxMonthly = priceMatch ? Number(priceMatch[1]) : null;

  return listings.filter((l) => {
    const text = `${l.title} ${l.region} ${l.type} ${l.price}`.toLowerCase();
    const regionWords = q.match(/[가-힣]+동|[가-힣]+구|[가-힣]+역/g) ?? [];
    const matchesRegion = regionWords.length === 0 || regionWords.some((w) => text.includes(w.replace("역", "")));
    const matchesType =
      !["사무실", "상가", "오피스텔", "지식산업센터", "근린생활시설", "업무시설", "토지"].some((t) => q.includes(t)) ||
      ["사무실", "상가", "오피스텔", "지식산업센터", "근린생활시설", "업무시설", "토지"].some((t) => q.includes(t) && l.type === t);
    const monthlyMatch = l.price.match(/월\s*(\d+)/);
    const monthly = monthlyMatch ? Number(monthlyMatch[1]) : null;
    const matchesPrice = maxMonthly === null || monthly === null || monthly <= maxMonthly;
    return matchesRegion && matchesType && matchesPrice;
  });
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-secondary">
        <PropertyPhoto image={listing.image} type={listing.type} title={listing.title} iconClassName="h-4.5 w-4.5 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{listing.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {listing.region} · {listing.type} · {listing.price}
        </p>
      </div>
    </div>
  );
}

export function AiSearchView() {
  const { listings } = useRealEstateAdmin();
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const results = submitted ? parseQuery(submitted, listings) : [];

  const EXAMPLES = ["문정동 월세 150만원 이하", "문정동 사무실 매매", "가락동 오피스텔 전세"];

  return (
    <div>
      <PanelHeader title="AI 매물 탐색" description="자연어로 원하는 조건을 입력하면 실제 매물 데이터에서 검색합니다." />
      <DemoNote>
        <Sparkles className="h-3 w-3" />
        AI 데모 — 키워드 기반 간이 파서로 동작하며, 이 데모에 등록된 매물 데이터만 결과로 보여줍니다
      </DemoNote>

      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          setSubmitted(query);
        }}
        className="flex gap-2"
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="예: 문정역 도보 10분 이내 월세 150만원 이하 사무실 찾아줘"
          className="h-11 flex-1 text-sm"
        />
        <Button type="submit" className="h-11 gap-1.5 font-bold">
          <Send className="h-3.5 w-3.5" />
          검색
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => {
              setQuery(ex);
              setSubmitted(ex);
            }}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            {ex}
          </button>
        ))}
      </div>

      {submitted && (
        <div className="mt-6">
          <p className="text-xs text-muted-foreground">
            &quot;{submitted}&quot; 조건에 맞는 매물 {results.length}건을 찾았습니다.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.slice(0, 6).map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
          {results.length === 0 && <EmptyResult message="조건에 맞는 매물을 찾지 못했습니다." />}
        </div>
      )}
    </div>
  );
}

const CHATBOT_CHIPS = ["문정동 월세", "사무실 추천", "주차 가능한 매물", "즉시입주"];

type ChatMessage = { id: number; from: "user" | "bot"; text: string; listings?: Listing[] };

export function ChatbotView() {
  const { listings } = useRealEstateAdmin();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, from: "bot", text: "안녕하세요! 원하시는 매물 조건을 말씀해 주세요. 예: '문정동 사무실 있어요?'" },
  ]);
  const [input, setInput] = useState("");

  const respond = (text: string) => {
    const found = parseQuery(text, listings).slice(0, 3);
    const botText =
      found.length > 0
        ? `현재 조건에 맞는 매물 ${found.length}건이 있습니다.`
        : "조건에 맞는 매물을 찾지 못했습니다. 다른 조건으로 다시 문의해 주세요.";
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "user", text },
      { id: Date.now() + 1, from: "bot", text: botText, listings: found },
    ]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    respond(input.trim());
    setInput("");
  };

  return (
    <div>
      <PanelHeader title="매물 챗봇" description="고객용 부동산 챗봇 미리보기입니다." />
      <DemoNote>
        <Bot className="h-3 w-3" />
        AI 데모 — 실제 공개 매물만 노출하며, 비공개 매물은 절대 표시하지 않습니다
      </DemoNote>

      <div className="flex h-[440px] flex-col overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
              <div className={m.from === "user" ? "flex flex-row-reverse items-start gap-2" : "flex items-start gap-2"}>
                <div
                  className={
                    m.from === "user"
                      ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                      : "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground"
                  }
                >
                  {m.from === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>
                <div>
                  <div
                    className={
                      m.from === "user"
                        ? "max-w-xs rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2 text-xs text-primary-foreground"
                        : "max-w-xs rounded-2xl rounded-tl-sm bg-secondary px-3.5 py-2 text-xs text-foreground"
                    }
                  >
                    {m.text}
                  </div>
                  {m.listings && m.listings.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {m.listings.map((l) => (
                        <ListingCard key={l.id} listing={l} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {CHATBOT_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => respond(chip)}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {chip}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="궁금한 매물을 물어보세요"
              className="flex-1"
            />
            <Button type="submit" size="icon" aria-label="전송">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
