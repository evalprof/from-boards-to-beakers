import { NextResponse } from "next/server";
import { getServerSupabase, type SubmissionInsert } from "@/lib/supabase";
import { sendNewSubmissionEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { submitter_text?: unknown; email?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (typeof body.submitter_text !== "string") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const text = body.submitter_text.trim();
  if (!text) {
    return NextResponse.json({ error: "empty" }, { status: 400 });
  }
  if (text.length > 2000) {
    return NextResponse.json({ error: "too long" }, { status: 400 });
  }

  const email =
    typeof body.email === "string" && body.email.trim() ? body.email.trim() : null;

  try {
    const supabase = getServerSupabase();
    const payload: SubmissionInsert = { submitter_text: text, email };
    const { error } = await supabase.from("submissions").insert(payload as never);
    if (error) {
      console.error("[submissions] supabase insert error", error);
      return NextResponse.json({ error: "save failed" }, { status: 500 });
    }
  } catch (err) {
    console.error("[submissions] supabase client error", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }

  // Fire-and-forget email — never fail the request because email broke.
  sendNewSubmissionEmail(text).catch((err) =>
    console.error("[submissions] email error (non-fatal)", err)
  );

  return NextResponse.json({ ok: true });
}
