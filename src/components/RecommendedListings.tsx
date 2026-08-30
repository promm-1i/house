"use client";

import { useState } from "react";
import { Listing, PropertyType } from "@/types/listing";
import ListingCard from "@/components/ListingCard";

const TABS: { label: string; value: PropertyType | "전체" }[] = [
  { label: "전체", value: "전체" },
  { label: "사무실", value: "사무실" },
  { label: "상가", value: "상가" },
  { label: "오피스텔", value: "오피스텔" },
];

export default function RecommendedListings({
  listings,
}: {
  listings: Listing[];
}) {
  const [tab, setTab] = useState<PropertyType | "전체">("전체");
  const filtered =
    tab === "전체" ? listings : listings.filter((l) => l.propertyType === tab);

  return (
    <div>
      <div className="mb-4 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            aria-pressed={tab === t.value}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
              tab === t.value
                ? "bg-blue-900 text-white"
                : "border border-zinc-300 text-zinc-600 hover:border-blue-900 hover:text-blue-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((listing, index) => (
          <ListingCard key={listing.id} listing={listing} priority={index === 0} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-zinc-400">
            해당 종류의 매물이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
