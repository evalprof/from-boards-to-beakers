import { Resend } from "resend";
import { SITE_URL } from "@/lib/site-config";

/**
 * Sends a notification email to one or more recipients when a new
 * submission lands. SUBMISSIONS_NOTIFY_EMAIL may be a single address
 * or a comma-separated list (whitespace ignored).
 *
 * Returns silently with `{ skipped: true }` if either RESEND_API_KEY
 * or SUBMISSIONS_NOTIFY_EMAIL is unset — the form should never break
 * because email config is missing.
 */
export async function sendNewSubmissionEmail(submitterText: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const rawTo = process.env.SUBMISSIONS_NOTIFY_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !rawTo) {
    console.warn(
      "[email] skipped — RESEND_API_KEY or SUBMISSIONS_NOTIFY_EMAIL not set"
    );
    return { skipped: true };
  }

  // Allow a comma-separated list so notifications can fan out to
  // multiple addresses. Trim each entry and drop empties.
  const recipients = rawTo
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    console.warn("[email] skipped — SUBMISSIONS_NOTIFY_EMAIL had no addresses");
    return { skipped: true };
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: recipients,
    subject: "New submission — From Boards to Beakers",
    text:
      `Someone just submitted an idea on ${SITE_URL}:\n\n` +
      `${submitterText}\n\n` +
      `Sent: ${new Date().toISOString()}`,
  });
  if (result.error) {
    console.error("[email] resend error", result.error);
    return { error: result.error };
  }
  return { ok: true, id: result.data?.id };
}
