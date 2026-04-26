import { Resend } from "resend";

export async function sendNewSubmissionEmail(submitterText: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SUBMISSIONS_NOTIFY_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.warn("[email] skipped — RESEND_API_KEY or SUBMISSIONS_NOTIFY_EMAIL not set");
    return { skipped: true };
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: [to],
    subject: "New submission — From Boards to Beakers",
    text:
      `Someone just submitted an idea on fromboardstobeakers.com:\n\n` +
      `${submitterText}\n\n` +
      `Sent: ${new Date().toISOString()}`,
  });
  if (result.error) {
    console.error("[email] resend error", result.error);
    return { error: result.error };
  }
  return { ok: true, id: result.data?.id };
}
