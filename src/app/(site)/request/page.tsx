import Link from "next/link";
import { propertyRequests } from "@/lib/mock-requests";
import { SITE_TITLE_SUFFIX } from "@/lib/config";

export const metadata = { title: `매물 의뢰하기 | ${SITE_TITLE_SUFFIX}` };

export default function RequestListPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">매물 의뢰하기</h1>
        <div className="flex gap-2 text-sm">
          <Link
            href="/request/write?type=sell"
            className="rounded bg-blue-900 px-3 py-1.5 text-white"
          >
            팔아요
          </Link>
          <Link
            href="/request/write?type=buy"
            className="rounded border border-blue-900 px-3 py-1.5 text-blue-900"
          >
            구해요
          </Link>
        </div>
      </div>

      <p className="mb-3 text-sm text-zinc-500">
        전체 문의 {propertyRequests.length}건
      </p>

      <table className="w-full border-t border-zinc-300 text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-zinc-500">
            <th className="py-2 text-left font-medium">구분</th>
            <th className="py-2 text-left font-medium">제목</th>
            <th className="py-2 text-left font-medium">작성자</th>
            <th className="py-2 text-left font-medium">등록일</th>
          </tr>
        </thead>
        <tbody>
          {propertyRequests.map((req) => (
            <tr key={req.id} className="border-b border-zinc-100">
              <td className="py-2 text-zinc-500">
                {req.type === "sell" ? "팔아요" : "구해요"}
              </td>
              <td className="py-2">{req.title}</td>
              <td className="py-2 text-zinc-500">{req.author}</td>
              <td className="py-2 text-zinc-400">{req.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
