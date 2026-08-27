import Image from "next/image";
import Link from "next/link";
import { Listing } from "@/types/listing";
import { formatManwon } from "@/lib/format";
import FavoriteButton from "@/components/FavoriteButton";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/item/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-40 w-full overflow-hidden bg-zinc-100">
        <Image
          src={listing.thumbnail}
          alt={listing.title}
          fill
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
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-xs text-zinc-400">
          {listing.id} · {listing.district}
        </p>
        <h3 className="line-clamp-2 text-sm font-medium text-zinc-800 group-hover:text-blue-900">
          {listing.title}
        </h3>
        <p className="text-xs text-zinc-500">
          {listing.propertyType} · 전용 {listing.areaExclusive.toLocaleString("ko-KR")}㎡
        </p>
        <div className="mt-auto pt-2 text-sm font-semibold text-zinc-900">
          {listing.dealType === "매매" ? (
            <span>매매 {formatManwon(listing.salePrice ?? 0)}</span>
          ) : (
            <span>
              보증금 {formatManwon(listing.deposit)} / 월세{" "}
              {formatManwon(listing.rent ?? 0)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
