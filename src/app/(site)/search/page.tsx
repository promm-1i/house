import { Suspense } from "react";
import { SearchX } from "lucide-react";
import SearchFilters, { SortControl } from "@/components/SearchFilters";
import ListingCard from "@/components/ListingCard";
import KakaoMap from "@/components/KakaoMap";
import { listings } from "@/lib/mock-listings";
import { SITE_TITLE_SUFFIX } from "@/lib/config";

export const metadata = {
  title: `매물검색 | ${SITE_TITLE_SUFFIX}`,
};

function priceOf(listing: (typeof listings)[number]) {
  return listing.dealType === "매매" ? listing.salePrice ?? 0 : listing.deposit;
}

function matchesPriceBand(listing: (typeof listings)[number], band: string) {
  const priceEok = priceOf(listing) / 10000;
  if (band === "under1") return priceEok <= 1;
  if (band === "1to3") return priceEok > 1 && priceEok <= 3;
  if (band === "over3") return priceEok > 3;
  return true;
}

function matchesAreaBand(listing: (typeof listings)[number], band: string) {
  const pyeong = listing.areaExclusive / 3.3058;
  if (band === "under20") return pyeong <= 20;
  if (band === "20to50") return pyeong > 20 && pyeong <= 50;
  if (band === "over50") return pyeong > 50;
  return true;
}

export default async function SearchPage(props: PageProps<"/search">) {
  const params = await props.searchParams;
  const dealType = typeof params.dealType === "string" ? params.dealType : "";
  const propertyType =
    typeof params.propertyType === "string" ? params.propertyType : "";
  const theme = typeof params.theme === "string" ? params.theme : "";
  const keyword = typeof params.keyword === "string" ? params.keyword : "";
  const priceBand = typeof params.priceBand === "string" ? params.priceBand : "";
  const areaBand = typeof params.areaBand === "string" ? params.areaBand : "";
  const sort = typeof params.sort === "string" ? params.sort : "";

  const filtered = listings.filter((listing) => {
    if (dealType && listing.dealType !== dealType) return false;
    if (propertyType && listing.propertyType !== propertyType) return false;
    if (theme && !listing.themes.includes(theme)) return false;
    if (!matchesPriceBand(listing, priceBand)) return false;
    if (!matchesAreaBand(listing, areaBand)) return false;
    if (
      keyword &&
      !`${listing.title}${listing.address}${listing.id}`.includes(keyword)
    ) {
      return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "priceAsc") return priceOf(a) - priceOf(b);
    if (sort === "priceDesc") return priceOf(b) - priceOf(a);
    if (sort === "areaDesc") return b.areaExclusive - a.areaExclusive;
    return b.id - a.id; // 최신순(기본값) — 매물번호가 클수록 최근 등록
  });

  return (
    <div className="flex flex-col">
      <Suspense fallback={null}>
        <SearchFilters />
      </Suspense>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-start">
        <div className="h-64 shrink-0 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:w-1/2">
          <KakaoMap
            markers={sorted.map((listing) => ({
              id: listing.id,
              lat: listing.lat,
              lng: listing.lng,
              title: listing.title,
              href: `/item/${listing.id}`,
            }))}
            heightClassName="h-64 lg:h-full"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-500">
              검색된 매물 <span className="font-semibold text-zinc-800">{sorted.length}</span>개
            </p>
            <Suspense fallback={null}>
              <SortControl />
            </Suspense>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {sorted.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          {sorted.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-zinc-200 py-16 text-center">
              <SearchX className="h-8 w-8 text-zinc-300" aria-hidden />
              <p className="text-sm text-zinc-500">조건에 맞는 매물이 없습니다.</p>
              <p className="text-xs text-zinc-400">필터를 초기화하거나 조건을 완화해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
