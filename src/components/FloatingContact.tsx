import { MessageCircle, Phone } from "lucide-react";
import { COMPANY_OFFICE } from "@/lib/config";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-20 right-4 z-30 flex flex-col items-end gap-2 md:bottom-6">
      <span
        title="샘플 데모입니다 — 실제 서비스에서는 카카오톡 채널 상담으로 연동됩니다"
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
