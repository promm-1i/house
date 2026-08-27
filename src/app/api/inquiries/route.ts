import { NextRequest, NextResponse } from "next/server";
import { CONTACT_WEBHOOK_URL, hasContactWebhook } from "@/lib/config";

interface InquiryPayload {
  name: string;
  contact: string;
  content: string;
  listingId?: number;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<InquiryPayload>;

  if (!body.name || !body.contact || !body.content) {
    return NextResponse.json(
      { ok: false, error: "필수 항목이 누락되었습니다." },
      { status: 400 }
    );
  }

  if (hasContactWebhook) {
    // 슬랙/디스코드 Incoming Webhook 형식(text 필드)에 맞춘 알림.
    // 다른 서비스의 웹훅이면 이 payload 형식만 바꾸면 된다.
    await fetch(CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `[상담문의]${body.listingId ? ` 매물 ${body.listingId}` : ""}\n이름: ${body.name}\n연락처: ${body.contact}\n내용: ${body.content}`,
      }),
    }).catch((err) => {
      console.error("문의 웹훅 전송 실패:", err);
    });
  } else {
    console.log("[문의 접수 - 웹훅 미설정]", body);
  }

  return NextResponse.json({ ok: true });
}
