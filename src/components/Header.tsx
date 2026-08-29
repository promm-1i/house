import Link from "next/link";
import { COMPANY_OFFICE, SITE_NAME } from "@/lib/config";

const NAV_ITEMS = [
  { label: "매물검색", href: "/search" },
  { label: "매물 의뢰하기", href: "/request" },
  { label: "부동산 소식", href: "/news" },
  { label: "질문과 답변", href: "/qna" },
  { label: "공지사항", href: "/notice" },
  { label: "회사소개", href: "/intro" },
];

export default function Header() {
  return (
    <>
      <div className="bg-amber-400 py-1 text-center text-xs font-medium text-amber-950">
        SAMPLE DEMO — 실제 매물·업체 정보가 아닌 샘플 데이터로 만든 데모 사이트입니다
      </div>
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-zinc-500">
          <a href={`tel:${COMPANY_OFFICE.phone}`} className="font-medium text-zinc-700">
            문의 {COMPANY_OFFICE.phone}
          </a>
          <div className="flex gap-3">
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
            <Link href="/admin" className="font-medium text-blue-900">
              관리자페이지
            </Link>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-blue-900"
          >
            {SITE_NAME}
            <span className="rounded bg-blue-900 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">
              SAMPLE
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm font-medium text-zinc-700 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-blue-900">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
