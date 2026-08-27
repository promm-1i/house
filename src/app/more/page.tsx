import Link from "next/link";
import { SITE_TITLE_SUFFIX } from "@/lib/config";

export const metadata = { title: `더보기 | ${SITE_TITLE_SUFFIX}` };

const LINKS = [
  { label: "부동산 소식", href: "/news" },
  { label: "질문과 답변", href: "/qna" },
  { label: "공지사항", href: "/notice" },
  { label: "회사소개", href: "/intro" },
  { label: "로그인", href: "/login" },
  { label: "회원가입", href: "/signup" },
];

export default function MorePage() {
  return (
    <div className="mx-auto max-w-md px-4 py-6 pb-24">
      <h1 className="mb-4 text-lg font-bold">더보기</h1>
      <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center justify-between px-4 py-3 text-sm text-zinc-700"
            >
              {link.label}
              <span className="text-zinc-300">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
