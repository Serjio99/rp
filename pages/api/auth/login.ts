import type { NextApiRequest, NextApiResponse } from "next";
import { queryRows, type DbUser } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { createSession, publicUser } from "@/lib/session";

type LoginResponse = {
  ok: boolean;
  user?: ReturnType<typeof publicUser>;
  error?: string;
};

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginResponse>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  try {
    const login = normalize(req.body.login).toLowerCase();
    const password = normalize(req.body.password);

    if (!login || !password) return res.status(400).json({ ok: false, error: "credentials_required" });

    const rows = await queryRows<DbUser>(
      `
        SELECT * FROM users
        WHERE email = :login OR username = :login OR telegram_username = :telegramLogin
        LIMIT 1
      `,
      { login, telegramLogin: login.replace(/^@/, "") },
    );
    const user = rows[0];

    if (!user?.password_hash || !(await verifyPassword(password, user.password_hash))) {
      return res.status(401).json({ ok: false, error: "invalid_credentials" });
    }

    await createSession(res, user.id);
    return res.status(200).json({ ok: true, user: publicUser(user) });
  } catch (error: unknown) {
    console.error("[auth login]", error instanceof Error ? error.message : error);
    return res.status(500).json({ ok: false, error: "internal_error" });
  }
}
