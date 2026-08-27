import type { Metadata } from "next";
import { Noto_Serif_KR, Gothic_A1 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import FloatingContact from "@/components/FloatingContact";
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
  title: `${SITE_TITLE_SUFFIX} | 문정동 사무실·상가 임대매매`,
  description:
    "실제 서비스가 아닌 샘플 데이터로 만든 부동산 매물 검색 데모 사이트입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`h-full ${displayFont.variable} ${bodyFont.variable}`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-zinc-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
        <FloatingContact />
      </body>
    </html>
  );
}
