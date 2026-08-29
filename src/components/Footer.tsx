import { COMPANY_OFFICE, SITE_NAME } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 pb-20 pt-8 text-sm text-zinc-500 md:pb-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex flex-wrap gap-4 text-zinc-600">
          <a href="/intro">회사소개</a>
          <a href="/request">의뢰하기</a>
          <a href="/terms">이용약관</a>
          <a href="/privacy">개인정보처리방침</a>
        </div>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
          <div>
            <dt className="inline font-medium text-zinc-700">상호 </dt>
            <dd className="inline">{COMPANY_OFFICE.name}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-zinc-700">대표자 </dt>
            <dd className="inline">{COMPANY_OFFICE.representative}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="inline font-medium text-zinc-700">주소 </dt>
            <dd className="inline">{COMPANY_OFFICE.address}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-zinc-700">전화 </dt>
            <dd className="inline">{COMPANY_OFFICE.phone}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-zinc-700">이메일 </dt>
            <dd className="inline">{COMPANY_OFFICE.email}</dd>
          </div>
        </dl>
        <p className="mt-6 text-xs text-zinc-400">
          © {SITE_NAME}. SAMPLE DEMO — 이 사이트의 상호, 매물, 연락처는 전부
          가상의 샘플 데이터이며 실제 업체와 무관합니다.
        </p>
      </div>
    </footer>
  );
}
