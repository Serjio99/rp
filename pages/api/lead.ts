import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type LeadResponse = {
  ok: boolean;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<LeadResponse>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  try {
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_SECURE,
      LEADS_TO,
      LEADS_FROM,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !LEADS_TO) {
      return res.status(500).json({ ok: false, error: "smtp_env_missing" });
    }

    const data = req.body || {};
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: (SMTP_SECURE || "").toLowerCase() === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `RP-сервер: ${data.name || "новая заявка"}`;
    const text = [
      "Новая заявка с rp.prom-logic.ru",
      `Имя: ${data.name || "-"}`,
      `Телефон: ${data.phone || "-"}`,
      `Бюджет: ${data.budget || "-"}`,
      `Идея: ${data.message || "-"}`,
      `Страница: ${data.page || "-"}`,
      `User-Agent: ${data.ua || "-"}`,
      `Дата: ${new Date().toISOString()}`,
    ].join("\n");

    await transporter.sendMail({
      from: LEADS_FROM || SMTP_USER,
      to: LEADS_TO,
      subject,
      text,
    });

    return res.status(200).json({ ok: true });
  } catch (error: unknown) {
    console.error("[rp lead] error:", error instanceof Error ? error.message : error);
    return res.status(500).json({ ok: false, error: "internal_error" });
  }
}
