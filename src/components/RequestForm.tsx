"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DEAL_TYPES = ["월세", "매매", "전세", "분양", "경매"];
const PROPERTY_TYPES = ["사무실", "상가", "오피스텔"];

export default function RequestForm({
  initialType,
}: {
  initialType: "sell" | "buy";
}) {
  const router = useRouter();
  const [type, setType] = useState<"sell" | "buy">(initialType);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (captchaAnswer.trim() !== "7") {
      setError("자동 등록 방지 문자가 올바르지 않습니다. (3 + 4 = ?)");
      return;
    }

    const data = new FormData(e.currentTarget);
    if (!data.get("agreeTerms") || !data.get("agreePrivacy")) {
      setError("약관에 모두 동의해주세요.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          dealType: data.get("dealType"),
          propertyType: data.get("propertyType"),
          region: data.get("region"),
          budget: data.get("budget"),
          name: data.get("name"),
          contact: data.get("contact"),
          title: data.get("title"),
          content: data.get("content"),
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      router.push("/request");
    } catch {
      setError("등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-2">
        {(["sell", "buy"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`rounded px-4 py-1.5 text-sm font-medium ${
              type === t
                ? "bg-blue-900 text-white"
                : "border border-zinc-300 text-zinc-600"
            }`}
          >
            {t === "sell" ? "팔아요" : "구해요"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <select
          name="dealType"
          required
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
        >
          <option value="">거래 유형</option>
          {DEAL_TYPES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <select
          name="propertyType"
          required
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
        >
          <option value="">매물 종류</option>
          {PROPERTY_TYPES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <input
        required
        name="region"
        placeholder="위치 (예: 서울 송파구 문정동)"
        className="rounded border border-zinc-300 px-3 py-2 text-sm"
      />
      <input
        name="budget"
        placeholder="희망금액"
        className="rounded border border-zinc-300 px-3 py-2 text-sm"
      />
      <input
        required
        name="title"
        placeholder="제목"
        className="rounded border border-zinc-300 px-3 py-2 text-sm"
      />
      <textarea
        required
        name="content"
        rows={4}
        placeholder="상세내용"
        className="rounded border border-zinc-300 px-3 py-2 text-sm"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          required
          name="name"
          placeholder="이름"
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          required
          name="contact"
          placeholder="연락처"
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-xs text-zinc-500">
        <input type="checkbox" name="agreePrivacy" />
        개인정보 수집 이용에 동의합니다
      </label>
      <label className="flex items-center gap-2 text-xs text-zinc-500">
        <input type="checkbox" name="agreeTerms" />
        이용약관에 동의합니다
      </label>

      <label className="flex items-center gap-2 text-sm">
        자동등록방지: 3 + 4 =
        <input
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
          className="w-16 rounded border border-zinc-300 px-2 py-1 text-sm"
        />
      </label>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/request")}
          className="rounded border border-zinc-300 px-4 py-2 text-sm"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={sending}
          className="rounded bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          {sending ? "등록 중..." : "의뢰하기"}
        </button>
      </div>
    </form>
  );
}
