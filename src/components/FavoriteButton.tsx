"use client";

import { useState } from "react";

const STORAGE_KEY = "sample_demo_favorites";

function readFavorites(): number[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function FavoriteButton({
  listingId,
  className,
}: {
  listingId: number;
  className?: string;
}) {
  // 서버 렌더링과 하이드레이션 시점에는 항상 false로 시작한다(로컬스토리지는
  // 브라우저에만 있어 SSR 결과와 불일치가 생기지 않도록). 클릭 시점부터
  // 실제 즐겨찾기 목록에 반영된다.
  const [active, setActive] = useState(false);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const favorites = readFavorites();
    const next = active
      ? favorites.filter((id) => id !== listingId)
      : [...favorites, listingId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setActive(!active);
  }

  return (
    <button
      onClick={toggle}
      aria-label={active ? "관심매물에서 제거" : "관심매물에 추가"}
      className={className}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
