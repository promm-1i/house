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
      <h1 className="mb-6 text-center text-xl font-bold text-zinc-900">로그인</h1>
      <div className="rounded-lg border border-zinc-200 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-zinc-600">
              이메일
            </label>
            <input
              required
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus-visible:border-blue-900 focus-visible:ring-1 focus-visible:ring-blue-900"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-medium text-zinc-600">
              비밀번호
            </label>
            <input
              required
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus-visible:border-blue-900 focus-visible:ring-1 focus-visible:ring-blue-900"
            />
          </div>
          {error && (
            <p role="alert" className="text-xs text-red-500">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-1 rounded-md bg-blue-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            로그인
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-zinc-500">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="font-medium text-blue-900 hover:underline">
            가입하기
          </Link>
        </p>
      </div>
      <p className="mt-6 text-center text-xs text-zinc-400">
        * 데모용 로그인입니다. 이 브라우저에 저장된 계정으로만 동작합니다.
      </p>
    </div>
  );
}
