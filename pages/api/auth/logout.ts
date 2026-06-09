import type { NextApiRequest, NextApiResponse } from "next";
import { clearSession } from "@/lib/session";

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ ok: boolean }>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  await clearSession(req, res);
  return res.status(200).json({ ok: true });
}
