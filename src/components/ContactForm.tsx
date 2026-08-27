"use client";

import { useState } from "react";

export default function ContactForm({ listingId }: { listingId?: number }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [agreed, setAgreed] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          content: data.get("content"),
          listingId,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center text-sm text-zinc-600">
        상담 문의가 접수되었습니다. 빠르게 연락드리겠습니다.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        required
        type="text"
        name="name"
        placeholder="이름을 입력해주세요"
        className="rounded border border-zinc-300 px-3 py-2 text-sm"
      />
      <input
        required
        type="text"
        name="contact"
        placeholder="연락처를 입력해주세요"
        className="rounded border border-zinc-300 px-3 py-2 text-sm"
      />
      <textarea
        required
        name="content"
        rows={3}
        placeholder="상담 내용을 입력해주세요"
        className="rounded border border-zinc-300 px-3 py-2 text-sm"
      />
      <label className="flex items-center gap-2 text-xs text-zinc-500">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        개인정보 수집·이용에 동의합니다
      </label>
      {status === "error" && (
        <p className="text-xs text-red-500">
          접수에 실패했습니다. 잠시 후 다시 시도해주세요.
        </p>
      )}
      <button
        type="submit"
        disabled={!agreed || status === "sending"}
        className="rounded-full bg-blue-900 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-blue-800 hover:shadow-lg disabled:pointer-events-none disabled:opacity-40"
      >
        {status === "sending" ? "전송 중..." : "상담문의 남기기"}
      </button>
    </form>
  );
}
