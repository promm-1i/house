import { NextRequest, NextResponse } from "next/server";
import { CONTACT_WEBHOOK_URL, hasContactWebhook } from "@/lib/config";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || !body.contact || !body.title) {
    return NextResponse.json(
      { ok: false, error: "필수 항목이 누락되었습니다." },
      { status: 400 }
    );
  }

  if (hasContactWebhook) {
    await fetch(CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `[매물의뢰:${body.type === "sell" ? "팔아요" : "구해요"}]\n제목: ${body.title}\n이름: ${body.name}\n연락처: ${body.contact}\n내용: ${body.content ?? ""}`,
      }),
    }).catch((err) => console.error("의뢰 웹훅 전송 실패:", err));
  } else {
    console.log("[매물의뢰 접수 - 웹훅 미설정]", body);
  }

  return NextResponse.json({ ok: true });
}
