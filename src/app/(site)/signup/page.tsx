"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/mock-auth";

const FIELD_CLASS =
  "rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus-visible:border-blue-900 focus-visible:ring-1 focus-visible:ring-blue-900";

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
      <h1 className="mb-6 text-center text-xl font-bold text-zinc-900">회원가입</h1>
      <div className="rounded-lg border border-zinc-200 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-medium text-zinc-600">이름</label>
            <input required id="name" type="text" name="name" placeholder="홍길순" className={FIELD_CLASS} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="signup-email" className="text-xs font-medium text-zinc-600">이메일</label>
            <input required id="signup-email" type="email" name="email" placeholder="you@example.com" className={FIELD_CLASS} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-xs font-medium text-zinc-600">휴대폰</label>
            <input required id="phone" type="tel" name="phone" placeholder="- 빼고 입력" className={FIELD_CLASS} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="signup-password" className="text-xs font-medium text-zinc-600">비밀번호</label>
            <input required id="signup-password" type="password" name="password" placeholder="••••••••" className={FIELD_CLASS} />
          </div>
          <label className="flex items-center gap-2 text-xs text-zinc-500">
            <input type="checkbox" name="agree" className="h-3.5 w-3.5 accent-blue-900" />
            이용약관 및 개인정보처리방침에 동의합니다
          </label>
          {error && (
            <p role="alert" className="text-xs text-red-500">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-1 rounded-md bg-blue-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            가입하기
          </button>
        </form>
      </div>
      <p className="mt-6 text-center text-xs text-zinc-400">
        * 데모용 회원가입입니다. 이 브라우저에만 저장됩니다.
      </p>
    </div>
  );
}
