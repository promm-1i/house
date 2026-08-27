import { SITE_TITLE_SUFFIX } from "@/lib/config";

export const metadata = { title: `이용약관 | ${SITE_TITLE_SUFFIX}` };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed text-zinc-700">
      <h1 className="mb-6 text-xl font-bold">이용약관</h1>
      <p className="mb-4">
        이 페이지는 데모 프로젝트용 자리표시자입니다. 실제 서비스 오픈 전
        변호사 검토를 거친 정식 이용약관으로 교체해야 합니다.
      </p>
      <p>제1조 (목적) 본 약관은 회사가 제공하는 서비스 이용에 관한 조건을 규정합니다.</p>
    </div>
  );
}
