import Link from "next/link";

const ITEMS = [
  { label: "매물검색", href: "/search" },
  { label: "의뢰하기", href: "/request" },
  { label: "홈", href: "/" },
  { label: "본매물", href: "/search" },
  { label: "더보기", href: "/more" },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-zinc-200 bg-white md:hidden">
      {ITEMS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex-1 py-3 text-center text-xs font-medium text-zinc-600"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
