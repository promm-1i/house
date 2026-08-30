"use client";

import { usePathname } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { COMPANY_OFFICE } from "@/lib/config";

export default function FloatingContact() {
  const pathname = usePathname();
  // 매물 상세 페이지는 자체 문의 바(MobileListingCta)가 모바일 하단을
  // 이미 차지하므로, 겹치지 않도록 이 위젯은 모바일에서 숨긴다.
  const isListingDetail = pathname?.startsWith("/item/");

  return (
    <div
      className={`fixed bottom-20 right-4 z-30 flex-col items-end gap-2 md:bottom-6 md:flex ${
        isListingDetail ? "hidden" : "flex"
      }`}
    >
      <span
        title="준비 중인 기능입니다 — 카카오톡 채널 상담 연동 예정"
        className="flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-full bg-yellow-400/60 text-yellow-900/60 shadow"
        aria-label="카카오톡 상담 (준비 중)"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
      </span>
      <a
        href={`tel:${COMPANY_OFFICE.phone}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-white shadow-lg transition-colors hover:bg-blue-800"
        aria-label="전화 문의"
      >
        <Phone className="h-5 w-5" aria-hidden />
      </a>
    </div>
  );
}
