import RequestForm from "@/components/RequestForm";
import { SITE_TITLE_SUFFIX } from "@/lib/config";

export const metadata = { title: `매물 의뢰 작성 | ${SITE_TITLE_SUFFIX}` };

export default async function RequestWritePage(
  props: PageProps<"/request/write">
) {
  const params = await props.searchParams;
  const initialType = params.type === "buy" ? "buy" : "sell";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-xl font-bold">매물 의뢰 작성</h1>
      <RequestForm initialType={initialType} />
    </div>
  );
}
