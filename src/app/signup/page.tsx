"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/mock-auth";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!data.get("agree")) {
      setError("이용약관에 동의해주세요.");
      return;
    }
    const result = signUp({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      password: String(data.get("password") ?? ""),
    });
    if (!result.ok) {
      setError(result.error ?? "가입에 실패했습니다.");
      return;
    }
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-6 text-center text-xl font-bold">회원가입</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          required
          type="text"
          name="name"
          placeholder="이름"
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="이메일"
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          required
          type="tel"
          name="phone"
          placeholder="휴대폰 (-빼고 입력)"
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="비밀번호"
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
        />
        <label className="flex items-center gap-2 text-xs text-zinc-500">
          <input type="checkbox" name="agree" />
          이용약관 및 개인정보처리방침에 동의합니다
        </label>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          className="rounded bg-blue-900 py-2 text-sm font-medium text-white"
        >
          가입하기
        </button>
      </form>
      <p className="mt-8 text-center text-xs text-zinc-400">
        * 데모용 회원가입입니다. 이 브라우저에만 저장됩니다.
      </p>
    </div>
  );
}
