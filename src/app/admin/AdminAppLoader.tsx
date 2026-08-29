"use client";

import dynamic from "next/dynamic";

const AdminApp = dynamic(() => import("./AdminApp"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center text-sm text-zinc-500">
      관리자 데모 불러오는 중...
    </div>
  ),
});

export default function AdminAppLoader() {
  return <AdminApp />;
}
