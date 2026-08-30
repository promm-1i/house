"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Handshake, Building2, Sparkles, MapPin, Search, ChevronDown } from "lucide-react";

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

function SearchField({
  label,
  icon: Icon,
  value,
  onChange,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="group relative flex flex-1 items-center gap-2.5 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 transition-colors focus-within:border-blue-900 focus-within:ring-1 focus-within:ring-blue-900 sm:border-0 sm:border-r sm:border-zinc-200 sm:py-1.5 sm:last:border-r-0">
      <span className="sr-only">{label}</span>
      <Icon className="h-4 w-4 shrink-0 text-zinc-400 group-focus-within:text-blue-900" aria-hidden />
      <div className="min-w-0 flex-1">
        <span className="block text-[10px] font-medium leading-tight text-zinc-400">{label}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent text-sm font-medium text-zinc-800 outline-none"
        >
          {children}
        </select>
      </div>
      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-300" aria-hidden />
    </label>
  );
}

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
    <div className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm sm:p-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0 sm:rounded-lg sm:border sm:border-zinc-200">
        <SearchField label="거래유형" icon={Handshake} value={dealType} onChange={setDealType}>
          <option value="">전체</option>
          {DEAL_TYPES.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </SearchField>
        <SearchField label="매물종류" icon={Building2} value={propertyType} onChange={setPropertyType}>
          <option value="">전체</option>
          {PROPERTY_TYPES.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </SearchField>
        <SearchField label="테마" icon={Sparkles} value={theme} onChange={setTheme}>
          <option value="">전체</option>
          {THEMES.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </SearchField>
        <label className="group relative flex flex-[1.4] items-center gap-2.5 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 transition-colors focus-within:border-blue-900 focus-within:ring-1 focus-within:ring-blue-900 sm:border-0 sm:py-1.5">
          <span className="sr-only">지역명, 지하철역, 키워드</span>
          <MapPin className="h-4 w-4 shrink-0 text-zinc-400 group-focus-within:text-blue-900" aria-hidden />
          <div className="min-w-0 flex-1">
            <span className="block text-[10px] font-medium leading-tight text-zinc-400">지역·역명·키워드</span>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="예: 문정역, 사무실"
              className="w-full bg-transparent text-sm font-medium text-zinc-800 outline-none placeholder:text-zinc-300 placeholder:font-normal"
            />
          </div>
        </label>
      </div>
      <button
        onClick={handleSearch}
        className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-900 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 sm:mt-2 sm:w-auto sm:px-10 sm:py-2.5"
      >
        <Search className="h-4 w-4" aria-hidden />
        매물 검색
      </button>
    </div>
  );
}
