import { SITE_TITLE_SUFFIX } from "@/lib/config";

export const metadata = { title: `개인정보처리방침 | ${SITE_TITLE_SUFFIX}` };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed text-zinc-700">
      <h1 className="mb-6 text-xl font-bold">개인정보처리방침</h1>
      <p className="mb-4">
        이 페이지는 데모 프로젝트용 자리표시자입니다. 실제 서비스 오픈 전
        개인정보보호법에 맞춘 정식 개인정보처리방침으로 교체해야 합니다.
      </p>
      <p>회사는 상담문의, 매물의뢰, 회원가입 시 이름/연락처/이메일을 수집합니다.</p>
    </div>
  );
}
