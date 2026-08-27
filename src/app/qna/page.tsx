import Link from "next/link";
import { SITE_TITLE_SUFFIX } from "@/lib/config";

export const metadata = { title: `질문과 답변 | ${SITE_TITLE_SUFFIX}` };

const POSTS: { id: number; title: string; author: string; createdAt: string; answered: boolean }[] =
  [];

export default function QnaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">질문과 답변</h1>
        <Link
          href="/login"
          className="rounded bg-blue-900 px-3 py-1.5 text-sm text-white"
        >
          글쓰기
        </Link>
      </div>

      <p className="mb-3 text-sm text-zinc-500">전체 게시물 {POSTS.length}건</p>

      <table className="w-full border-t border-zinc-300 text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-zinc-500">
            <th className="py-2 text-left font-medium">번호</th>
            <th className="py-2 text-left font-medium">제목</th>
            <th className="py-2 text-left font-medium">답변상태</th>
            <th className="py-2 text-left font-medium">작성자</th>
            <th className="py-2 text-left font-medium">등록일</th>
          </tr>
        </thead>
        <tbody>
          {POSTS.map((post) => (
            <tr key={post.id} className="border-b border-zinc-100">
              <td className="py-2 text-zinc-400">{post.id}</td>
              <td className="py-2">{post.title}</td>
              <td className="py-2 text-zinc-500">
                {post.answered ? "답변완료" : "답변대기"}
              </td>
              <td className="py-2 text-zinc-500">{post.author}</td>
              <td className="py-2 text-zinc-400">{post.createdAt}</td>
            </tr>
          ))}
          {POSTS.length === 0 && (
            <tr>
              <td colSpan={5} className="py-12 text-center text-zinc-400">
                등록된 게시물이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
