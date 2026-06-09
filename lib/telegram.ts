import { createHash, createHmac, timingSafeEqual } from "crypto";

type TelegramAuthPayload = Record<string, string | number | undefined>;

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a, "hex");
  const right = Buffer.from(b, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
}

export function verifyTelegramAuth(payload: TelegramAuthPayload) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const hash = String(payload.hash || "");
  const authDate = Number(payload.auth_date || 0);

  if (!botToken || !hash || !authDate) return false;
  if (Date.now() / 1000 - authDate > 24 * 60 * 60) return false;

  const checkString = Object.entries(payload)
    .filter(([key, value]) => key !== "hash" && value !== undefined && value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secret = createHash("sha256").update(botToken).digest();
  const expected = createHmac("sha256", secret).update(checkString).digest("hex");

  return safeEqual(expected, hash);
}
