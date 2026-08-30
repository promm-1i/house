import Image from "next/image";
import Link from "next/link";
import { Ruler, Layers, Building2, Store, type LucideIcon } from "lucide-react";
import { Listing } from "@/types/listing";
import { formatManwon } from "@/lib/format";
import FavoriteButton from "@/components/FavoriteButton";

const TYPE_ICON: Record<string, LucideIcon> = {
  사무실: Building2,
  오피스텔: Building2,
  상가: Store,
};

export default function ListingCard({
  listing,
  priority,
}: {
  listing: Listing;
  priority?: boolean;
}) {
  const TypeIcon = TYPE_ICON[listing.propertyType] ?? Building2;

  return (
    <Link
      href={`/item/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg"
    >
      <div className="relative h-40 w-full overflow-hidden bg-zinc-100">
        <Image
          src={listing.thumbnail}
          alt={`${listing.title} 대표 이미지`}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute left-2 top-2 flex gap-1">
          {listing.labels.map((label) => (
            <span
              key={label}
              className="rounded bg-blue-900/90 px-1.5 py-0.5 text-[10px] font-medium text-white"
            >
              {label}
            </span>
          ))}
        </div>
        <FavoriteButton
          listingId={listing.id}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-base text-red-500 shadow"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="text-[15px] font-bold text-blue-900">
          {listing.dealType === "매매" ? (
            <>매매 {formatManwon(listing.salePrice ?? 0)}</>
          ) : (
            <>
              {listing.dealType} {formatManwon(listing.deposit)}
              {listing.rent ? ` / ${formatManwon(listing.rent)}` : ""}
            </>
          )}
        </p>
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-zinc-800 group-hover:text-blue-900">
          {listing.title}
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-1.5 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <TypeIcon className="h-3 w-3 text-zinc-400" aria-hidden />
            {listing.propertyType}
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="h-3 w-3 text-zinc-400" aria-hidden />
            {listing.areaExclusive.toLocaleString("ko-KR")}㎡
          </span>
          <span className="flex items-center gap-1">
            <Layers className="h-3 w-3 text-zinc-400" aria-hidden />
            {listing.floorCurrent}/{listing.floorTotal}층
          </span>
        </div>
        <p className="truncate text-[11px] text-zinc-400">
          {listing.id} · {listing.district}
        </p>
      </div>
    </Link>
  );
}
