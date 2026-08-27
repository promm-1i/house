"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function QuickSearch() {
  const router = useRouter();
  const [dealType, setDealType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [theme, setTheme] = useState("");
  const [keyword, setKeyword] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (dealType) params.set("dealType", dealType);
    if (propertyType) params.set("propertyType", propertyType);
    if (theme) params.set("theme", theme);
    if (keyword) params.set("keyword", keyword);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
        <select
          value={dealType}
          onChange={(e) => setDealType(e.target.value)}
          className="rounded border border-zinc-300 px-2 py-2 text-sm"
        >
          <option value="">거래유형</option>
          {DEAL_TYPES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="rounded border border-zinc-300 px-2 py-2 text-sm"
        >
          <option value="">매물 종류</option>
          {PROPERTY_TYPES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="rounded border border-zinc-300 px-2 py-2 text-sm"
        >
          <option value="">테마 종류</option>
          {THEMES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="지역명, 지하철역, 키워드"
          className="rounded border border-zinc-300 px-2 py-2 text-sm"
        />
      </div>
      <button
        onClick={handleSearch}
        className="mt-3 w-full rounded-full bg-blue-900 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-blue-800 hover:shadow-lg sm:w-auto sm:px-10"
      >
        매물 검색
      </button>
    </div>
  );
}
