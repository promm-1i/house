"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "sample_demo_favorites";
const CHANGE_EVENT = "sample_demo_favorites_change";

function readFavorites(): number[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export default function FavoriteButton({
  listingId,
  className,
}: {
  listingId: number;
  className?: string;
}) {
  // 서버 렌더링과 하이드레이션 시점에는 항상 false로 시작한다(로컬스토리지는
  // 브라우저에만 있어 SSR 결과와 불일치가 생기지 않도록). useSyncExternalStore가
  // 하이드레이션 이후 실제 저장된 값으로 안전하게 동기화한다.
  const active = useSyncExternalStore(
    subscribe,
    () => readFavorites().includes(listingId),
    () => false,
  );

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const favorites = readFavorites();
    const next = active
      ? favorites.filter((id) => id !== listingId)
      : [...favorites, listingId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
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
