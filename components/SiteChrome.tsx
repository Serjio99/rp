/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  Gamepad2,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Главная" },
  { href: "/stages", label: "Этапы" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/problems", label: "Проблемы RP" },
  { href: "/monetization", label: "Монетизация" },
  { href: "/support", label: "Поддержка" },
];

const maxHref = "https://max.ru/u/f9LHodD0cOJw2F5E_nJod4xIhl0KVOG_TYTrOPiTZYmz5ggBSNMogpDpbyA";

type FormStatus = "idle" | "loading" | "success" | "error";

export function SeoHead({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}) {
  const url = `https://rp.prom-logic.ru${path === "/" ? "/" : path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#070708" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://rp.prom-logic.ru/hero-rp-city.png" />
    </Head>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="RP Forge">
        <span className="brand__logo">
          <img src="/rp-logo.svg" alt="RP Forge" />
        </span>
        <span>
          <span className="brand__name">RP Forge</span>
          <span className="brand__sub">FiveM • донат • живой город</span>
        </span>
      </Link>

      <nav className="nav nav--pages">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <a className="topbar__cta" href="https://t.me/Serge_CodeCrafter" target="_blank" rel="noreferrer">
        Обсудить проект
        <ArrowRight size={16} />
      </a>
    </header>
  );
}

export function PageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rp-site rp-page ${className}`}>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  icon: Icon = Gamepad2,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <section className="page-hero">
      <div className="shell page-hero__grid">
        <div>
          <SectionKicker icon={Icon}>{eyebrow}</SectionKicker>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="page-hero__actions">
            <a className="btn btn--primary" href="#contacts">
              Обсудить сервер
              <ArrowRight size={17} />
            </a>
            <a className="btn btn--ghost" href="tel:+79066346633">
              <Phone size={17} />
              Позвонить
            </a>
          </div>
        </div>

        <div className="page-hero__panel">
          <b>RP PROJECT MAP</b>
          <span>идея → экономика → сервер → сайт → запуск</span>
          <i />
        </div>
      </div>
    </section>
  );
}

export function SectionKicker({ children, icon: Icon }: { children: React.ReactNode; icon: LucideIcon }) {
  return (
    <div className="section-kicker">
      <Icon size={15} />
      {children}
    </div>
  );
}

export function ContactSection({
  title = "Готовы обсудить RP-сервер?",
  text = "Опишите идею, примерный бюджет и желаемую механику. Если ТЗ нет, помогу собрать его после разговора.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section id="contacts" className="section contacts">
      <div className="shell contacts__grid">
        <div>
          <SectionKicker icon={CheckCircle2}>контакт</SectionKicker>
          <h2>{title}</h2>
          <p className="lead">{text}</p>

          <div className="contact-links">
            <a href="tel:+79066346633">
              <span>
                <Phone size={20} />
                +7 906 634-66-33
              </span>
              <ArrowRight size={16} />
            </a>
            <a href="mailto:rp@prom-logic.ru">
              <span>
                <Mail size={20} />
                rp@prom-logic.ru
              </span>
              <ArrowRight size={16} />
            </a>
            <a href="https://t.me/Serge_CodeCrafter" target="_blank" rel="noreferrer">
              <span>
                <MessageCircle size={20} />
                Telegram
              </span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="max-card">
            <span>
              <img src="/max-qr.png" alt="QR-код MAX" />
            </span>
            <div>
              <b>MAX</b>
              <a href={maxHref} target="_blank" rel="noreferrer">
                Написать в MAX
              </a>
              <p>Быстрая связь по проекту, ТЗ, бюджету и запуску.</p>
            </div>
          </div>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}

export function LeadForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const canSend = useMemo(() => {
    if (status === "loading") return false;
    return name.trim().length > 1 && phone.trim().length >= 6;
  }, [status, name, phone]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          budget,
          message,
          page: window.location.pathname,
          ua: navigator.userAgent,
        }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Ошибка отправки");

      setStatus("success");
      setName("");
      setPhone("");
      setBudget("");
      setMessage("");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Не удалось отправить заявку");
    }
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <div>
        <span>brief</span>
        <h3>Заявка на RP-сервер</h3>
        <p>Достаточно контакта и пары слов об идее. Если ТЗ еще нет, составлю его сам после разговора.</p>
      </div>

      <div className="form-grid">
        <Field label="Имя" value={name} onChange={setName} placeholder="Как к Вам обращаться" />
        <Field label="Телефон" value={phone} onChange={setPhone} placeholder="+7 ..." />
      </div>

      <Field label="Ориентир по бюджету" value={budget} onChange={setBudget} placeholder="от 80 000 ₽ / больше / хочу обсудить" />

      <label>
        <span>Идея сервера</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="RP-город, криминал, фракции, бизнесы, донат, Discord, сайт, whitelist..."
        />
      </label>

      <button disabled={!canSend} type="submit">
        {status === "loading" ? "Отправляю..." : "Хочу сервер под монетизацию"}
        <ArrowRight size={16} />
      </button>

      {status === "success" ? (
        <div className="form-note form-note--ok">
          <CheckCircle2 size={16} />
          Заявка принята. Свяжусь с Вами и помогу быстро собрать понятное ТЗ.
        </div>
      ) : null}

      {status === "error" ? (
        <div className="form-note form-note--error">Ошибка: {error}. Можно написать напрямую на rp@prom-logic.ru</div>
      ) : null}
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label>
      <span>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <b>RP Forge</b>
          <p>Разработка GTA 5 RP серверов под монетизацию: FiveM, ESX, QBCore, экономика, донат, Discord, сайт и запуск.</p>
        </div>
        <div className="site-footer__links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
