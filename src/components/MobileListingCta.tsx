import Link from "next/link";
import { Phone } from "lucide-react";
import { COMPANY_OFFICE } from "@/lib/config";

export default function MobileListingCta({
  priceLabel,
  listingId,
}: {
  priceLabel: string;
  listingId: number;
}) {
  return (
    <div className="fixed inset-x-0 bottom-14 z-30 flex items-center gap-2 border-t border-zinc-200 bg-white/95 px-3 py-2.5 shadow-[0_-2px_8px_rgba(0,0,0,0.06)] backdrop-blur-sm lg:hidden">
      <p className="min-w-0 flex-1 truncate text-sm font-bold text-blue-900">{priceLabel}</p>
      <a
        href={`tel:${COMPANY_OFFICE.phone}`}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-blue-900"
        aria-label="전화 문의"
      >
        <Phone className="h-4 w-4" aria-hidden />
      </a>
      <Link
        href={`#contact-${listingId}`}
        className="flex h-10 shrink-0 items-center justify-center rounded-lg bg-blue-900 px-4 text-sm font-semibold text-white"
      >
        매물 문의하기
      </Link>
    </div>
  );
}
