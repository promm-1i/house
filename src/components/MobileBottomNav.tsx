"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { label: "홈", href: "/" },
  { label: "매물검색", href: "/search" },
  { label: "의뢰하기", href: "/request" },
  { label: "더보기", href: "/more" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-zinc-200 bg-white md:hidden">
      {ITEMS.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex-1 py-3 text-center text-xs font-medium transition-colors ${
              isActive ? "text-blue-900" : "text-zinc-600"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
