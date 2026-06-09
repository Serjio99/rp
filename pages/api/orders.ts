import type { NextApiRequest, NextApiResponse } from "next";
import type { RowDataPacket } from "mysql2";
import { packageById, serverPackages, statusLabel } from "@/lib/catalog";
import { execute, queryRows } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

type OrderRow = RowDataPacket & {
  id: number;
  server_type: string;
  title: string;
  budget: string | null;
  description: string | null;
  status: string;
  created_at: Date;
  updated_at: Date;
};

function serialize(row: OrderRow) {
  return {
    id: row.id,
    serverType: row.server_type,
    title: row.title,
    budget: row.budget,
    description: row.description,
    status: row.status,
    statusLabel: statusLabel(row.status),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ ok: false, error: "unauthorized" });

  if (req.method === "GET") {
    const rows = await queryRows<OrderRow>(
      "SELECT * FROM orders WHERE user_id = :userId ORDER BY created_at DESC",
      { userId: user.id },
    );
    return res.status(200).json({ ok: true, orders: rows.map(serialize) });
  }

  if (req.method === "POST") {
    const serverType = String(req.body.serverType || "");
    const selected = serverPackages.find((item) => item.id === serverType);
    if (!selected) return res.status(400).json({ ok: false, error: "invalid_server_type" });

    const budget = typeof req.body.budget === "string" ? req.body.budget.trim().slice(0, 120) : null;
    const description = typeof req.body.description === "string" ? req.body.description.trim().slice(0, 4000) : null;
    const title = packageById(serverType).title;

    const result = await execute(
      `
        INSERT INTO orders (user_id, server_type, title, budget, description, status)
        VALUES (:userId, :serverType, :title, :budget, :description, 'ordered')
      `,
      { userId: user.id, serverType, title, budget, description },
    );

    const rows = await queryRows<OrderRow>("SELECT * FROM orders WHERE id = :id LIMIT 1", { id: result.insertId });
    return res.status(201).json({ ok: true, order: serialize(rows[0]) });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ ok: false, error: "method_not_allowed" });
}
