import type { NextApiRequest, NextApiResponse } from "next";
import { getCurrentUser, publicUser } from "@/lib/session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ ok: false, error: "unauthorized" });

  return res.status(200).json({ ok: true, user: publicUser(user) });
}
