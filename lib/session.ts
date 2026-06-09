import { createHash, randomBytes } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { execute, queryRows, type DbUser } from "./db";

const COOKIE_NAME = "rp_session";
const SESSION_DAYS = 14;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return index === -1 ? [part, ""] : [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      }),
  );
}

export function getSessionToken(req: NextApiRequest) {
  return parseCookies(req.headers.cookie || "")[COOKIE_NAME] || "";
}

export async function getCurrentUser(req: NextApiRequest) {
  const token = getSessionToken(req);
  if (!token) return null;

  const rows = await queryRows<DbUser>(
    `
      SELECT users.*
      FROM sessions
      INNER JOIN users ON users.id = sessions.user_id
      WHERE sessions.token_hash = :tokenHash AND sessions.expires_at > NOW()
      LIMIT 1
    `,
    { tokenHash: hashToken(token) },
  );

  if (!rows[0]) return null;

  await execute("UPDATE sessions SET last_seen_at = NOW() WHERE token_hash = :tokenHash", { tokenHash: hashToken(token) });
  return rows[0];
}

export async function createSession(res: NextApiResponse, userId: number) {
  const token = randomBytes(32).toString("hex");
  await execute(
    "INSERT INTO sessions (user_id, token_hash, expires_at) VALUES (:userId, :tokenHash, DATE_ADD(NOW(), INTERVAL :days DAY))",
    { userId, tokenHash: hashToken(token), days: SESSION_DAYS },
  );

  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 24 * 60 * 60}`,
  );
}

export async function clearSession(req: NextApiRequest, res: NextApiResponse) {
  const token = getSessionToken(req);
  if (token) {
    await execute("DELETE FROM sessions WHERE token_hash = :tokenHash", { tokenHash: hashToken(token) });
  }

  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

export function publicUser(user: DbUser) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    telegramUsername: user.telegram_username,
    displayName: user.display_name,
    role: user.role,
    createdAt: user.created_at,
  };
}
