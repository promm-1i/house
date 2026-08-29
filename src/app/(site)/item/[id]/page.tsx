import { notFound } from "next/navigation";
import {
  getListingById,
  getRelatedListings,
  NEARBY_SUBWAY,
  NEARBY_BUS,
} from "@/lib/mock-listings";
import { getBuildingRegistryInfo } from "@/lib/building-registry";
import { formatManwon, formatArea } from "@/lib/format";
import ListingCard from "@/components/ListingCard";
import ContactForm from "@/components/ContactForm";
import KakaoMap from "@/components/KakaoMap";
import ImageGallery from "@/components/ImageGallery";
import FavoriteButton from "@/components/FavoriteButton";
import { COMPANY_OFFICE } from "@/lib/config";

function parseId(id: string): number | null {
  const n = Number(id);
  return Number.isInteger(n) ? n : null;
}

export async function generateMetadata(props: PageProps<"/item/[id]">) {
  const { id } = await props.params;
  const numericId = parseId(id);
  const listing = numericId ? getListingById(numericId) : undefined;
  if (!listing) return { title: "매물을 찾을 수 없습니다" };

  return {
    title: `${listing.title} | ${listing.district} ${listing.dealType} ${listing.propertyType}`,
    description: listing.description,
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: [listing.thumbnail],
    },
  };
}

export default async function ItemDetailPage(props: PageProps<"/item/[id]">) {
  const { id } = await props.params;
  const numericId = parseId(id);
  const listing = numericId ? getListingById(numericId) : undefined;
  if (!listing) notFound();

  const [registry, related] = await Promise.all([
    getBuildingRegistryInfo(listing),
    Promise.resolve(getRelatedListings(listing)),
  ]);

  const priceLabel =
    listing.dealType === "매매"
      ? `매매 ${formatManwon(listing.salePrice ?? 0)}`
      : `보증금 ${formatManwon(listing.deposit)} / 월세 ${formatManwon(
          listing.rent ?? 0
        )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description,
    image: listing.thumbnail,
    url: `/item/${listing.id}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "KRW",
      price: (listing.dealType === "매매" ? listing.salePrice : listing.rent) ?? 0,
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <nav className="mb-4 flex flex-wrap gap-4 border-b border-zinc-200 pb-3 text-sm text-zinc-500">
        <span className="font-medium text-zinc-800">매물번호 {listing.id}</span>
        <a href="#info" className="hover:text-blue-900">매물 정보</a>
        <a href="#description" className="hover:text-blue-900">매물 설명</a>
        <a href="#transit" className="hover:text-blue-900">주변 교통정보</a>
        <a href="#location" className="hover:text-blue-900">위치 및 주변시설</a>
        <a href="#related" className="hover:text-blue-900">다른 매물</a>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ImageGallery images={listing.images} alt={listing.title} />

          <section id="info" className="mb-8 scroll-mt-20">
            <h2 className="mb-3 text-lg font-bold">매물 정보</h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg border border-zinc-200 p-4 text-sm sm:grid-cols-4">
              <Field label="주소" value={listing.address} span />
              <Field label="거래 유형" value={listing.dealType} />
              <Field label="매물 종류" value={listing.propertyType} />
              <Field
                label={listing.dealType === "매매" ? "매매가" : "보증금"}
                value={
                  listing.dealType === "매매"
                    ? formatManwon(listing.salePrice ?? 0)
                    : formatManwon(listing.deposit)
                }
              />
              {listing.dealType !== "매매" && (
                <Field label="월세" value={`${formatManwon(listing.rent ?? 0)}원`} />
              )}
              <Field
                label="관리비"
                value={
                  listing.maintenanceFee
                    ? `${listing.maintenanceFee.toLocaleString("ko-KR")}원`
                    : "없음(임대료포함)"
                }
              />
              <Field
                label="면적정보"
                value={`공급 ${formatArea(listing.areaSupply)} / 전용 ${formatArea(
                  listing.areaExclusive
                )}`}
                span
              />
              <Field
                label="층정보"
                value={`현재층 :${listing.floorCurrent}층 / 총층 :${listing.floorTotal}층`}
              />
              <Field label="방향" value={listing.direction} />
              <Field label="주용도" value={listing.mainUse} />
              <Field label="주차" value={`가능 (총 주차대수 ${listing.parkingCount}대)`} />
              <Field label="엘리베이터" value={`${listing.elevatorCount}대`} />
              <Field label="입주가능일" value={listing.moveInDate} />
              <Field label="미등기 여부" value={registry.unregisteredStatus} />
              <Field label="위반 여부" value={registry.violationStatus} />
              <Field label="사용승인일" value={registry.useApprovalDate} />
            </dl>
            {registry.source === "mock" && (
              <p className="mt-1 text-xs text-amber-600">
                * 위반/미등기 여부는 현재 목업 데이터입니다. 실연동 시
                공공데이터포털 건축물대장정보 API로 대체됩니다.
              </p>
            )}
          </section>

          <section id="description" className="mb-8 scroll-mt-20">
            <h2 className="mb-3 text-lg font-bold">매물 설명</h2>
            <p className="whitespace-pre-line rounded-lg border border-zinc-200 p-4 text-sm leading-relaxed text-zinc-700">
              {listing.description}
            </p>
          </section>

          <section id="transit" className="mb-8 scroll-mt-20">
            <h2 className="mb-3 text-lg font-bold">주변 교통정보</h2>
            <div className="grid grid-cols-1 gap-4 rounded-lg border border-zinc-200 p-4 text-sm sm:grid-cols-2">
              <div>
                <p className="mb-2 font-medium text-zinc-700">인근 지하철</p>
                <ul className="flex flex-col gap-1 text-zinc-600">
                  {NEARBY_SUBWAY.map((s) => (
                    <li key={s.station} className="flex justify-between">
                      <span>
                        {s.line} {s.station}
                      </span>
                      <span className="text-zinc-400">{s.distance}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 font-medium text-zinc-700">인근 버스</p>
                <ul className="flex flex-col gap-1 text-zinc-600">
                  {NEARBY_BUS.map((b) => (
                    <li key={b.name} className="flex justify-between">
                      <span>{b.name}</span>
                      <span className="text-zinc-400">{b.distance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="location" className="mb-8 scroll-mt-20">
            <h2 className="mb-3 text-lg font-bold">위치 및 주변시설</h2>
            <KakaoMap
              markers={[
                {
                  id: listing.id,
                  lat: listing.lat,
                  lng: listing.lng,
                  title: listing.title,
                },
              ]}
              level={4}
              heightClassName="h-64"
            />
          </section>

          <section id="related" className="scroll-mt-20">
            <h2 className="mb-3 text-lg font-bold">
              {listing.district}의 다른 매물
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
              {related.length === 0 && (
                <p className="col-span-full text-sm text-zinc-400">
                  같은 지역의 다른 매물이 없습니다.
                </p>
              )}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border border-zinc-200 p-4">
            <div className="mb-1 flex items-center justify-between gap-1">
              <div className="flex gap-1">
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
                className="text-xl text-red-500"
              />
            </div>
            <h1 className="mb-2 text-lg font-bold text-zinc-900">
              {listing.title}
            </h1>
            <p className="mb-4 text-lg font-semibold text-blue-900">
              {priceLabel}
            </p>
            <p className="mb-4 text-sm text-zinc-500">
              {listing.district} · {listing.propertyType} · 전용{" "}
              {listing.areaExclusive.toLocaleString("ko-KR")}㎡
            </p>

            <h3 className="mb-2 text-sm font-bold">매물 문의하기</h3>
            <ContactForm listingId={listing.id} />

            <div className="mt-4 border-t border-zinc-200 pt-3 text-xs text-zinc-500">
              <p className="font-medium text-zinc-700">{COMPANY_OFFICE.name}</p>
              <p>대표번호 {COMPANY_OFFICE.phone}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  span,
}: {
  label: string;
  value: string;
  span?: boolean;
}) {
  return (
    <div className={span ? "col-span-2 sm:col-span-4" : undefined}>
      <dt className="text-zinc-400">{label}</dt>
      <dd className="font-medium text-zinc-800">{value}</dd>
    </div>
  );
}
