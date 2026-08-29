import { SITE_TITLE_SUFFIX } from "@/lib/config";

export const metadata = { title: `공지사항 | ${SITE_TITLE_SUFFIX}` };

const POSTS: { id: number; title: string; createdAt: string }[] = [
  {
    id: 1,
    title: "샘플부동산 홈페이지 리뉴얼 안내",
    createdAt: "2026-08-01",
  },
];

export default function NoticePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-xl font-bold">공지사항</h1>
      <p className="mb-3 text-sm text-zinc-500">전체 게시물 {POSTS.length}건</p>

      <table className="w-full border-t border-zinc-300 text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-zinc-500">
            <th className="py-2 text-left font-medium">번호</th>
            <th className="py-2 text-left font-medium">제목</th>
            <th className="py-2 text-left font-medium">등록일</th>
          </tr>
        </thead>
        <tbody>
          {POSTS.map((post) => (
            <tr key={post.id} className="border-b border-zinc-100">
              <td className="py-2 text-zinc-400">{post.id}</td>
              <td className="py-2">{post.title}</td>
              <td className="py-2 text-zinc-400">{post.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
