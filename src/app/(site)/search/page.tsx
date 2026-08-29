import { Suspense } from "react";
import SearchFilters from "@/components/SearchFilters";
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

  return (
    <div className="flex flex-col">
      <Suspense fallback={null}>
        <SearchFilters />
      </Suspense>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 lg:flex-row">
        <div className="h-64 shrink-0 lg:h-auto lg:w-1/2">
          <KakaoMap
            markers={filtered.map((listing) => ({
              id: listing.id,
              lat: listing.lat,
              lng: listing.lng,
              title: listing.title,
              href: `/item/${listing.id}`,
            }))}
            heightClassName="h-64 lg:h-full"
          />
        </div>

        <div className="flex-1">
          <p className="mb-3 text-sm text-zinc-500">
            검색된 매물 : {filtered.length}개
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full py-12 text-center text-sm text-zinc-400">
                조건에 맞는 매물이 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
