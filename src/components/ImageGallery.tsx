"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  function go(delta: number) {
    setIndex((prev) => (prev + delta + total) % total);
  }

  return (
    <div className="relative mb-4 h-80 w-full overflow-hidden rounded-lg bg-zinc-100">
      <Image
        key={images[index]}
        src={images[index]}
        alt={`${alt} 사진 ${index + 1}`}
        fill
        className="object-cover"
        priority
      />
      {total > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="이전 사진"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            aria-label="다음 사진"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
          >
            ›
          </button>
          <span className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-0.5 text-xs text-white">
            {index + 1} / {total}
          </span>
        </>
      )}
    </div>
  );
}
