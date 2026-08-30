import Link from "next/link";
import { COMPANY_OFFICE, SITE_NAME } from "@/lib/config";

const NAV_ITEMS = [
  { label: "매물검색", href: "/search" },
  { label: "매물 의뢰하기", href: "/request" },
  { label: "부동산 소식", href: "/news" },
  { label: "질문과 답변", href: "/qna" },
  { label: "회사소개", href: "/intro" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-zinc-500">
        <a href={`tel:${COMPANY_OFFICE.phone}`} className="font-medium text-zinc-700">
          문의 {COMPANY_OFFICE.phone}
        </a>
        <div className="flex items-center gap-3">
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
          <span className="text-zinc-300">|</span>
          <Link href="/admin" className="text-zinc-400 hover:text-zinc-600">
            관리자
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="shrink-0 text-xl font-bold tracking-tight text-blue-900">
          {SITE_NAME}
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-zinc-700 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-blue-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/request"
          className="hidden shrink-0 rounded-full bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 md:block"
        >
          매물 의뢰
        </Link>
      </div>
    </header>
  );
}
