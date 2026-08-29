"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { KAKAO_MAP_APP_KEY, hasKakaoMapKey } from "@/lib/config";

// 카카오맵 SDK는 공식 타입 정의가 없어 실제 사용하는 부분만 최소한으로 타입을 붙인다.
type KakaoLatLng = object;
type KakaoMapInstance = object;
type KakaoMarkerInstance = object;
interface KakaoInfoWindowInstance {
  open: (map: KakaoMapInstance, marker: KakaoMarkerInstance) => void;
  close: () => void;
}
interface KakaoNamespace {
  maps: {
    load: (callback: () => void) => void;
    LatLng: new (lat: number, lng: number) => KakaoLatLng;
    Map: new (
      container: HTMLElement,
      options: { center: KakaoLatLng; level: number }
    ) => KakaoMapInstance;
    Marker: new (options: {
      position: KakaoLatLng;
      map: KakaoMapInstance;
    }) => KakaoMarkerInstance;
    InfoWindow: new (options: { content: string }) => KakaoInfoWindowInstance;
    event: {
      addListener: (
        target: KakaoMarkerInstance,
        type: string,
        handler: () => void
      ) => void;
    };
  };
}

declare global {
  interface Window {
    kakao: KakaoNamespace;
  }
}

export interface MapMarker {
  id: number | string;
  lat: number;
  lng: number;
  title: string;
  href?: string;
}

interface KakaoMapProps {
  markers: MapMarker[];
  center?: { lat: number; lng: number };
  level?: number;
  heightClassName?: string;
}

export default function KakaoMap({
  markers,
  center,
  level = 5,
  heightClassName = "h-64 lg:h-full",
}: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!sdkLoaded || !container || !window.kakao) return;

    window.kakao.maps.load(() => {
      const fallbackCenter = markers[0] ?? { lat: 37.4855, lng: 127.1215 };
      const mapCenter = center ?? fallbackCenter;

      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
        level,
      });

      markers.forEach((marker) => {
        const position = new window.kakao.maps.LatLng(marker.lat, marker.lng);
        const kakaoMarker = new window.kakao.maps.Marker({ position, map });

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:4px 8px;font-size:12px;">${marker.title}</div>`,
        });

        window.kakao.maps.event.addListener(kakaoMarker, "mouseover", () =>
          infoWindow.open(map, kakaoMarker)
        );
        window.kakao.maps.event.addListener(kakaoMarker, "mouseout", () =>
          infoWindow.close()
        );
        if (marker.href) {
          window.kakao.maps.event.addListener(kakaoMarker, "click", () => {
            window.location.href = marker.href!;
          });
        }
      });
    });
  }, [sdkLoaded, markers, center, level]);

  if (!hasKakaoMapKey) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-6 text-center ${heightClassName}`}
      >
        <MapPin className="h-6 w-6 text-zinc-300" aria-hidden />
        <p className="text-sm font-medium text-zinc-500">
          {markers.length > 0 ? `매물 위치 ${markers.length}건` : "지도 준비 중"}
        </p>
        <p className="text-xs text-zinc-400">
          실제 서비스에서는 이 영역에 카카오맵이 실시간으로 연동됩니다.
        </p>
      </div>
    );
  }

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false&libraries=services`}
        strategy="afterInteractive"
        onReady={() => setSdkLoaded(true)}
      />
      <div ref={containerRef} className={`rounded-lg ${heightClassName}`} />
    </>
  );
}
