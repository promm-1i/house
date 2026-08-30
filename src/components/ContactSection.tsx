"use client";

import { useState } from "react";
import { Search, FileSignature, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const PURPOSES = [
  {
    key: "find",
    label: "매물 찾기",
    icon: Search,
    placeholder: "예: 문정동 인근 사무실 30평대, 즉시입주 가능한 매물 찾습니다.",
  },
  {
    key: "request",
    label: "임대·매매 의뢰",
    icon: FileSignature,
    placeholder: "예: 보유 중인 상가를 임대로 내놓고 싶습니다. 층수·면적 등을 적어주세요.",
  },
  {
    key: "general",
    label: "일반 상담",
    icon: MessageCircle,
    placeholder: "궁금하신 내용을 편하게 남겨주세요.",
  },
] as const;

export default function ContactSection() {
  const [purpose, setPurpose] = useState<(typeof PURPOSES)[number]["key"]>("find");
  const active = PURPOSES.find((p) => p.key === purpose) ?? PURPOSES[0];

  return (
    <div>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {PURPOSES.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setPurpose(p.key)}
            aria-pressed={purpose === p.key}
            className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
              purpose === p.key
                ? "border-blue-900 bg-blue-50 text-blue-900"
                : "border-zinc-200 text-zinc-500 hover:border-blue-900 hover:text-blue-900"
            }`}
          >
            <p.icon className="h-4 w-4" aria-hidden />
            {p.label}
          </button>
        ))}
      </div>
      <ContactForm contentPlaceholder={active.placeholder} />
    </div>
  );
}
