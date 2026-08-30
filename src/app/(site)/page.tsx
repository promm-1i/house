import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Building2, MessagesSquare, Smartphone } from "lucide-react";
import QuickSearch from "@/components/QuickSearch";
import ContactSection from "@/components/ContactSection";
import RecentInquiries from "@/components/RecentInquiries";
import RecommendedListings from "@/components/RecommendedListings";
import ScrollReveal from "@/components/ScrollReveal";
import { listings } from "@/lib/mock-listings";

const FEATURES = [
  {
    icon: MapPin,
    title: "지도 기반 매물 검색",
    description: "지역과 조건에 맞는 매물을 지도와 목록에서 동시에 확인합니다.",
  },
  {
    icon: Building2,
    title: "매물 통합 관리",
    description: "등록·수정·상태 관리까지 관리자 화면에서 일괄 처리합니다.",
  },
  {
    icon: MessagesSquare,
    title: "상담·문의 관리",
    description: "고객 문의와 매물 요청을 한 화면에서 확인하고 응대합니다.",
  },
  {
    icon: Smartphone,
    title: "반응형 지원",
    description: "PC·태블릿·모바일 어떤 환경에서도 동일하게 이용할 수 있습니다.",
  },
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
          <h1
            className="animate-fade-in-up break-keep font-display text-3xl font-bold leading-tight sm:text-5xl"
            style={{ animationDelay: "0ms" }}
          >
            사무실·상가 매물 검색부터
            <br />
            상담·관리까지, 하나의 플랫폼에서
          </h1>
          <p
            className="animate-fade-in-up mt-4 max-w-xl break-keep text-sm text-blue-100 sm:text-base"
            style={{ animationDelay: "160ms" }}
          >
            문정동을 중심으로 한 상업용 부동산 매물을 지도 기반으로 검색하고,
            고객 문의와 매물 관리까지 한 화면에서 이어갑니다.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-32 w-full max-w-6xl px-4 sm:-mt-36">
        <div
          className="animate-fade-in-up rounded-2xl bg-white p-4 shadow-2xl sm:p-6"
          style={{ animationDelay: "280ms" }}
        >
          <QuickSearch />
        </div>
      </section>

      <ScrollReveal className="mx-auto w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-2">
              <feature.icon className="h-6 w-6 text-blue-900" aria-hidden />
              <h3 className="font-display text-base font-bold text-zinc-900">{feature.title}</h3>
              <p className="break-keep text-sm text-zinc-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto w-full max-w-6xl border-t border-zinc-100 px-4 pt-16">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-display text-xl font-bold">추천 매물</h2>
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
          <h2 className="font-display text-xl font-bold">상담 문의</h2>
          <p className="mb-4 mt-1 text-sm text-zinc-500">
            원하시는 목적을 선택하고 문의를 남겨보세요.
          </p>
          <ContactSection />
        </div>
        <div>
          <h2 className="mb-4 font-display text-xl font-bold">최근 문의</h2>
          <RecentInquiries />
        </div>
      </ScrollReveal>
    </div>
  );
}
