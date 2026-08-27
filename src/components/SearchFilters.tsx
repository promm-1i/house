"use client";

import { useRouter, useSearchParams } from "next/navigation";

const DEAL_TYPES = ["월세", "매매", "전세"];
const PROPERTY_TYPES = ["사무실", "상가", "오피스텔"];
const THEMES = [
  "소형 사무실",
  "중형 사무실",
  "대형 사무실",
  "주차가능",
  "즉시입주 가능",
  "초역세권",
  "풀인테리어",
  "코너호실",
  "급매물",
];

export const PRICE_BANDS = [
  { value: "", label: "가격 전체" },
  { value: "under1", label: "1억 이하" },
  { value: "1to3", label: "1억~3억" },
  { value: "over3", label: "3억 이상" },
];

export const AREA_BANDS = [
  { value: "", label: "면적 전체" },
  { value: "under20", label: "20평 이하" },
  { value: "20to50", label: "20~50평" },
  { value: "over50", label: "50평 이상" },
];

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  }

  const hasAnyFilter = [
    "dealType",
    "propertyType",
    "keyword",
    "theme",
    "priceBand",
    "areaBand",
  ].some((key) => searchParams.get(key));

  return (
    <div className="flex flex-col gap-2 border-b border-zinc-200 bg-white p-3">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={searchParams.get("dealType") ?? ""}
          onChange={(e) => updateParam("dealType", e.target.value)}
          className="rounded border border-zinc-300 px-2 py-1.5 text-sm"
        >
          <option value="">거래 유형</option>
          {DEAL_TYPES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={searchParams.get("propertyType") ?? ""}
          onChange={(e) => updateParam("propertyType", e.target.value)}
          className="rounded border border-zinc-300 px-2 py-1.5 text-sm"
        >
          <option value="">매물 종류</option>
          {PROPERTY_TYPES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={searchParams.get("theme") ?? ""}
          onChange={(e) => updateParam("theme", e.target.value)}
          className="rounded border border-zinc-300 px-2 py-1.5 text-sm"
        >
          <option value="">테마 종류</option>
          {THEMES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <input
          defaultValue={searchParams.get("keyword") ?? ""}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateParam("keyword", e.currentTarget.value);
            }
          }}
          placeholder="매물번호, 제목, 주소 검색"
          className="w-56 rounded border border-zinc-300 px-2 py-1.5 text-sm"
        />
        {hasAnyFilter && (
          <button
            onClick={() => router.push("/search")}
            className="text-sm text-zinc-400 underline"
          >
            초기화
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <div className="flex items-center gap-1">
          <span className="text-xs text-zinc-400">가격</span>
          {PRICE_BANDS.map((band) => (
            <button
              key={band.value}
              onClick={() => updateParam("priceBand", band.value)}
              className={`rounded-full px-2.5 py-1 text-xs ${
                (searchParams.get("priceBand") ?? "") === band.value
                  ? "bg-blue-900 text-white"
                  : "border border-zinc-300 text-zinc-600"
              }`}
            >
              {band.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-zinc-400">면적</span>
          {AREA_BANDS.map((band) => (
            <button
              key={band.value}
              onClick={() => updateParam("areaBand", band.value)}
              className={`rounded-full px-2.5 py-1 text-xs ${
                (searchParams.get("areaBand") ?? "") === band.value
                  ? "bg-blue-900 text-white"
                  : "border border-zinc-300 text-zinc-600"
              }`}
            >
              {band.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
