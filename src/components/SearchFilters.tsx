"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X, ArrowUpDown } from "lucide-react";

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

const SORT_OPTIONS = [
  { value: "", label: "최신순" },
  { value: "priceAsc", label: "가격 낮은순" },
  { value: "priceDesc", label: "가격 높은순" },
  { value: "areaDesc", label: "면적 넓은순" },
];

const FILTER_LABELS: Record<string, (value: string) => string> = {
  dealType: (v) => v,
  propertyType: (v) => v,
  theme: (v) => v,
  keyword: (v) => `"${v}"`,
  priceBand: (v) => PRICE_BANDS.find((b) => b.value === v)?.label ?? v,
  areaBand: (v) => AREA_BANDS.find((b) => b.value === v)?.label ?? v,
};

function useParamUpdater() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  };
}

export function SortControl() {
  const searchParams = useSearchParams();
  const updateParam = useParamUpdater();

  return (
    <label className="flex items-center gap-1.5 text-sm text-zinc-500">
      <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
      <span className="sr-only">정렬 기준</span>
      <select
        value={searchParams.get("sort") ?? ""}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="cursor-pointer rounded border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-700 outline-none focus-visible:border-blue-900 focus-visible:ring-1 focus-visible:ring-blue-900"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateParam = useParamUpdater();

  const filterKeys = ["dealType", "propertyType", "keyword", "theme", "priceBand", "areaBand"];
  const activeFilters = filterKeys
    .map((key) => ({ key, value: searchParams.get(key) ?? "" }))
    .filter((f) => f.value);
  const hasAnyFilter = activeFilters.length > 0;

  return (
    <div className="flex flex-col gap-2.5 border-b border-zinc-200 bg-white p-3">
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-1.5">
          <span className="sr-only">거래 유형</span>
          <select
            value={searchParams.get("dealType") ?? ""}
            onChange={(e) => updateParam("dealType", e.target.value)}
            className="rounded border border-zinc-300 px-2 py-1.5 text-sm outline-none focus-visible:border-blue-900 focus-visible:ring-1 focus-visible:ring-blue-900"
          >
            <option value="">거래 유형</option>
            {DEAL_TYPES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1.5">
          <span className="sr-only">매물 종류</span>
          <select
            value={searchParams.get("propertyType") ?? ""}
            onChange={(e) => updateParam("propertyType", e.target.value)}
            className="rounded border border-zinc-300 px-2 py-1.5 text-sm outline-none focus-visible:border-blue-900 focus-visible:ring-1 focus-visible:ring-blue-900"
          >
            <option value="">매물 종류</option>
            {PROPERTY_TYPES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1.5">
          <span className="sr-only">테마 종류</span>
          <select
            value={searchParams.get("theme") ?? ""}
            onChange={(e) => updateParam("theme", e.target.value)}
            className="rounded border border-zinc-300 px-2 py-1.5 text-sm outline-none focus-visible:border-blue-900 focus-visible:ring-1 focus-visible:ring-blue-900"
          >
            <option value="">테마 종류</option>
            {THEMES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center">
          <span className="sr-only">매물번호, 제목, 주소 검색</span>
          <input
            defaultValue={searchParams.get("keyword") ?? ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateParam("keyword", e.currentTarget.value);
              }
            }}
            placeholder="매물번호, 제목, 주소 검색"
            className="w-56 rounded border border-zinc-300 px-2 py-1.5 text-sm outline-none focus-visible:border-blue-900 focus-visible:ring-1 focus-visible:ring-blue-900"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <div className="flex items-center gap-1">
          <span className="text-xs text-zinc-400">가격</span>
          {PRICE_BANDS.map((band) => (
            <button
              key={band.value}
              onClick={() => updateParam("priceBand", band.value)}
              aria-pressed={(searchParams.get("priceBand") ?? "") === band.value}
              className={`rounded-full px-2.5 py-1 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
                (searchParams.get("priceBand") ?? "") === band.value
                  ? "bg-blue-900 text-white"
                  : "border border-zinc-300 text-zinc-600 hover:border-blue-900 hover:text-blue-900"
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
              aria-pressed={(searchParams.get("areaBand") ?? "") === band.value}
              className={`rounded-full px-2.5 py-1 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
                (searchParams.get("areaBand") ?? "") === band.value
                  ? "bg-blue-900 text-white"
                  : "border border-zinc-300 text-zinc-600 hover:border-blue-900 hover:text-blue-900"
              }`}
            >
              {band.label}
            </button>
          ))}
        </div>
      </div>

      {hasAnyFilter && (
        <div className="flex flex-wrap items-center gap-1.5 border-t border-zinc-100 pt-2.5">
          <span className="text-xs text-zinc-400">적용된 조건</span>
          {activeFilters.map(({ key, value }) => (
            <button
              key={key}
              onClick={() => updateParam(key, "")}
              className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-900 transition-colors hover:bg-blue-100"
            >
              {FILTER_LABELS[key]?.(value) ?? value}
              <X className="h-3 w-3" aria-hidden />
            </button>
          ))}
          <button
            onClick={() => router.push("/search")}
            className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-600"
          >
            전체 초기화
          </button>
        </div>
      )}
    </div>
  );
}
