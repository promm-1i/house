import type { Metadata } from "next";
import { Noto_Serif_KR, Gothic_A1 } from "next/font/google";
import "./globals.css";
import { SITE_TITLE_SUFFIX } from "@/lib/config";

const displayFont = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-display",
});

const bodyFont = Gothic_A1({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${SITE_TITLE_SUFFIX} | 문정동 사무실·상가 매물 검색`,
  description:
    "문정동 사무실·상가 매물을 지도 기반으로 검색하고 상담할 수 있는 상업용 부동산 플랫폼",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`h-full ${displayFont.variable} ${bodyFont.variable}`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
