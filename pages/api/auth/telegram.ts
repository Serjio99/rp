import type { NextApiRequest, NextApiResponse } from "next";
import { execute, queryRows, type DbUser } from "@/lib/db";
import { createSession, publicUser } from "@/lib/session";
import { verifyTelegramAuth } from "@/lib/telegram";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  try {
    if (!verifyTelegramAuth(req.body || {})) {
      return res.status(401).json({ ok: false, error: "telegram_auth_failed" });
    }

    const telegramId = String(req.body.id);
    const telegramUsername = String(req.body.username || "").replace(/^@/, "") || null;
    const displayName = [req.body.first_name, req.body.last_name].filter(Boolean).join(" ") || telegramUsername || "Telegram user";

    let rows = await queryRows<DbUser>("SELECT * FROM users WHERE telegram_id = :telegramId LIMIT 1", { telegramId });
    if (!rows[0]) {
      const result = await execute(
        `
          INSERT INTO users (telegram_id, telegram_username, display_name)
          VALUES (:telegramId, :telegramUsername, :displayName)
        `,
        { telegramId, telegramUsername, displayName },
      );
      rows = await queryRows<DbUser>("SELECT * FROM users WHERE id = :id LIMIT 1", { id: result.insertId });
    }

    await createSession(res, rows[0].id);
    return res.status(200).json({ ok: true, user: publicUser(rows[0]) });
  } catch (error: unknown) {
    console.error("[auth telegram]", error instanceof Error ? error.message : error);
    return res.status(500).json({ ok: false, error: "internal_error" });
  }
}
