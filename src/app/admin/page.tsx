import type { Metadata } from "next";
import AdminAppLoader from "./AdminAppLoader";

export const metadata: Metadata = {
  title: "부동산 관리자 데모",
  description: "부동산 매물관리 웹 솔루션의 관리자 기능을 체험해볼 수 있는 데모 페이지입니다.",
};

export default function AdminPage() {
  return <AdminAppLoader />;
}
