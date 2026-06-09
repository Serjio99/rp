import type { NextApiRequest, NextApiResponse } from "next";
import type { RowDataPacket } from "mysql2";
import { execute, queryRows, type DbUser } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { createSession, publicUser } from "@/lib/session";

type RegisterResponse = {
  ok: boolean;
  user?: ReturnType<typeof publicUser>;
  error?: string;
};

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<RegisterResponse>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  try {
    const email = normalize(req.body.email).toLowerCase() || null;
    const username = normalize(req.body.username).toLowerCase() || null;
    const telegramUsername = normalize(req.body.telegramUsername).replace(/^@/, "") || null;
    const password = normalize(req.body.password);

    if (!email && !username) return res.status(400).json({ ok: false, error: "login_required" });
    if (password.length < 8) return res.status(400).json({ ok: false, error: "weak_password" });

    const duplicate = await queryRows<RowDataPacket & { id: number }>(
      "SELECT id FROM users WHERE (:email IS NOT NULL AND email = :email) OR (:username IS NOT NULL AND username = :username) LIMIT 1",
      { email, username },
    );

    if (duplicate[0]) return res.status(409).json({ ok: false, error: "user_exists" });

    const displayName = username || email?.split("@")[0] || telegramUsername || "RP Player";
    const result = await execute(
      `
        INSERT INTO users (email, username, telegram_username, password_hash, display_name)
        VALUES (:email, :username, :telegramUsername, :passwordHash, :displayName)
      `,
      {
        email,
        username,
        telegramUsername,
        passwordHash: await hashPassword(password),
        displayName,
      },
    );

    const rows = await queryRows<DbUser>("SELECT * FROM users WHERE id = :id LIMIT 1", { id: result.insertId });
    await createSession(res, result.insertId);

    return res.status(201).json({ ok: true, user: publicUser(rows[0]) });
  } catch (error: unknown) {
    console.error("[auth register]", error instanceof Error ? error.message : error);
    return res.status(500).json({ ok: false, error: "internal_error" });
  }
}
