import type { NextApiRequest, NextApiResponse } from "next";
import type { RowDataPacket } from "mysql2";
import { execute, queryRows } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

type TicketRow = RowDataPacket & {
  id: number;
  order_id: number | null;
  order_title: string | null;
  subject: string;
  message: string;
  status: string;
  priority: string;
  created_at: Date;
};

function serialize(row: TicketRow) {
  return {
    id: row.id,
    orderId: row.order_id,
    orderTitle: row.order_title,
    subject: row.subject,
    message: row.message,
    status: row.status,
    priority: row.priority,
    createdAt: row.created_at,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ ok: false, error: "unauthorized" });

  if (req.method === "GET") {
    const rows = await queryRows<TicketRow>(
      `
        SELECT support_tickets.*, orders.title AS order_title
        FROM support_tickets
        LEFT JOIN orders ON orders.id = support_tickets.order_id
        WHERE support_tickets.user_id = :userId
        ORDER BY support_tickets.created_at DESC
      `,
      { userId: user.id },
    );
    return res.status(200).json({ ok: true, tickets: rows.map(serialize) });
  }

  if (req.method === "POST") {
    const subject = typeof req.body.subject === "string" ? req.body.subject.trim().slice(0, 190) : "";
    const message = typeof req.body.message === "string" ? req.body.message.trim().slice(0, 4000) : "";
    const orderId = Number(req.body.orderId) || null;

    if (!subject || !message) return res.status(400).json({ ok: false, error: "ticket_required" });

    if (orderId) {
      const allowed = await queryRows<RowDataPacket & { id: number }>(
        "SELECT id FROM orders WHERE id = :orderId AND user_id = :userId LIMIT 1",
        { orderId, userId: user.id },
      );
      if (!allowed[0]) return res.status(403).json({ ok: false, error: "order_forbidden" });
    }

    const result = await execute(
      `
        INSERT INTO support_tickets (user_id, order_id, subject, message)
        VALUES (:userId, :orderId, :subject, :message)
      `,
      { userId: user.id, orderId, subject, message },
    );

    const rows = await queryRows<TicketRow>(
      `
        SELECT support_tickets.*, orders.title AS order_title
        FROM support_tickets
        LEFT JOIN orders ON orders.id = support_tickets.order_id
        WHERE support_tickets.id = :id
        LIMIT 1
      `,
      { id: result.insertId },
    );
    return res.status(201).json({ ok: true, ticket: serialize(rows[0]) });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ ok: false, error: "method_not_allowed" });
}
