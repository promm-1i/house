import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import QuickSearch from "@/components/QuickSearch";
import ContactForm from "@/components/ContactForm";
import RecentInquiries from "@/components/RecentInquiries";
import RecommendedListings from "@/components/RecommendedListings";
import ScrollReveal from "@/components/ScrollReveal";
import { listings } from "@/lib/mock-listings";
import { SITE_NAME } from "@/lib/config";

const STATS = [
  { label: "등록 매물", value: "220+" },
  { label: "누적 상담", value: "1,200+" },
  { label: "평균 응대", value: "10분" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative overflow-hidden pb-24 pt-20 text-white sm:pb-28">
        <Image
          src="/images/building-04.svg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-950/80 to-blue-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_0%,rgba(217,119,6,0.12),transparent)]" />

        <div className="relative mx-auto max-w-6xl px-4">
          <p
            className="animate-fade-in-up text-sm font-medium tracking-wide text-amber-300"
            style={{ animationDelay: "0ms" }}
          >
            {SITE_NAME} · SAMPLE DEMO
          </p>
          <h1
            className="animate-fade-in-up mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl"
            style={{ animationDelay: "120ms" }}
          >
            문정동 사무실·상가,
            <br />
            믿을 수 있는 전문가와 함께
          </h1>
          <p
            className="animate-fade-in-up mt-4 max-w-xl text-sm text-blue-100 sm:text-base"
            style={{ animationDelay: "260ms" }}
          >
            지도 기반 매물 검색부터 상담까지, 한 화면에서 이어지는 부동산
            중개 경험을 보여주는 샘플 페이지입니다.
          </p>

          <div
            className="animate-fade-in-up mt-8 flex flex-wrap divide-x divide-white/15"
            style={{ animationDelay: "380ms" }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="pr-8 first:pl-0 [&:not(:first-child)]:pl-8">
                <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-xs text-blue-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-32 w-full max-w-6xl px-4 sm:-mt-36">
        <div
          className="animate-fade-in-up rounded-2xl bg-white p-4 shadow-2xl sm:p-6"
          style={{ animationDelay: "480ms" }}
        >
          <QuickSearch />
        </div>
      </section>

      <ScrollReveal className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-900">
              REAL-TIME LISTINGS
            </p>
            <h2 className="mt-1 font-display text-xl font-bold">실시간 추천 매물</h2>
          </div>
          <Link
            href="/search"
            className="flex shrink-0 items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-blue-900"
          >
            전체 매물 보기
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
        <RecommendedListings listings={listings} />
      </ScrollReveal>

      <ScrollReveal className="mx-auto grid w-full max-w-6xl gap-8 border-t border-zinc-100 px-4 pt-16 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900">CONSULTING</p>
          <h2 className="mt-1 font-display text-xl font-bold">간편 상담 문의</h2>
          <p className="mb-4 mt-1 text-sm text-zinc-500">
            보다 쉽고 빠르게 문의를 남겨보세요!
          </p>
          <ContactForm />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900">CASE HISTORY</p>
          <h2 className="mb-4 mt-1 font-display text-xl font-bold">최근 상담 사례</h2>
          <RecentInquiries />
        </div>
      </ScrollReveal>
    </div>
  );
}
