import { COMPANY_OFFICE } from "@/lib/config";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-20 right-4 z-30 flex flex-col gap-2 md:bottom-6">
      <span
        title="샘플 데모입니다 — 실제 카카오톡 채널로 교체 예정"
        className="flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-full bg-yellow-400 text-xl shadow-lg"
        aria-label="카카오톡 상담 (샘플, 비활성)"
      >
        💬
      </span>
      <a
        href={`tel:${COMPANY_OFFICE.phone}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-xl text-white shadow-lg"
        aria-label="전화 문의"
      >
        📞
      </a>
    </div>
  );
}
