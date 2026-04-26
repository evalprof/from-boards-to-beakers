import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body.submitter_text !== "string") {
      return NextResponse.json({ error: "invalid body" }, { status: 400 });
    }
    const text = body.submitter_text.trim();
    if (!text) {
      return NextResponse.json({ error: "empty" }, { status: 400 });
    }
    // Phase 1: log only. Phase 2 will insert into Supabase.
    console.log("[submission]", { text, at: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
