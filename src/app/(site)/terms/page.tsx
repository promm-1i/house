import { SITE_TITLE_SUFFIX } from "@/lib/config";

export const metadata = { title: `이용약관 | ${SITE_TITLE_SUFFIX}` };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed text-zinc-700">
      <h1 className="mb-6 text-xl font-bold">이용약관</h1>
      <p className="mb-4">
        본 페이지는 시연용 샘플이며, 실제 운영 시에는 해당 사업자의 정보와
        정책에 맞춘 정식 이용약관이 제공됩니다.
      </p>
      <p>제1조 (목적) 본 약관은 회사가 제공하는 서비스 이용에 관한 조건을 규정합니다.</p>
    </div>
  );
}
