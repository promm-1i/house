"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/mock-auth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = login(
      String(data.get("email") ?? ""),
      String(data.get("password") ?? "")
    );
    if (!result.ok) {
      setError(result.error ?? "로그인에 실패했습니다.");
      return;
    }
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-6 text-center text-xl font-bold">로그인</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          required
          type="email"
          name="email"
          placeholder="이메일"
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="비밀번호"
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          className="rounded bg-blue-900 py-2 text-sm font-medium text-white"
        >
          로그인
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-zinc-500">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="font-medium text-blue-900">
          가입하기
        </Link>
      </p>
      <p className="mt-8 text-center text-xs text-zinc-400">
        * 데모용 로그인입니다. 이 브라우저에 저장된 계정으로만 동작합니다.
      </p>
    </div>
  );
}
