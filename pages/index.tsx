/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Banknote,
  Bot,
  CheckCircle2,
  DatabaseZap,
  Gamepad2,
  Gauge,
  Mail,
  Map,
  MessageCircle,
  Phone,
  Radar,
  ServerCog,
  ShieldCheck,
  Store,
  TerminalSquare,
  Trophy,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";
import { PageNavigator, SiteFooter, SiteHeader, VisualStory } from "@/components/SiteChrome";
import { ownerQuestions, packages, productPrinciples, seoFaq } from "@/data/siteContent";

type FormStatus = "idle" | "loading" | "success" | "error";

const maxHref = "https://max.ru/u/f9LHodD0cOJw2F5E_nJod4xIhl0KVOG_TYTrOPiTZYmz5ggBSNMogpDpbyA";

const stats = [
  ["от 90 000 ₽", "старт серьезного проекта"],
  ["FiveM", "ESX / QBCore / Lua / JS"],
  ["под ключ", "сервер, сайт, Discord, донат"],
];

const features = [
  {
    icon: Map,
    title: "Город с лором",
    text: "Фракции, криминал, госструктуры, бизнесы, квесты, точки конфликта и причины возвращаться.",
  },
  {
    icon: WalletCards,
    title: "Экономика и донат",
    text: "Баланс валюты, профессий, подписок, VIP-ролей, кейсов, косметики и привилегий без разрушения RP.",
  },
  {
    icon: ServerCog,
    title: "Технический запуск",
    text: "VDS/VPS, txAdmin, база данных, ресурсы, античит-логика, оптимизация и стабильный production-старт.",
  },
  {
    icon: Users,
    title: "Комьюнити-контур",
    text: "Discord, whitelist, правила, роли, заявки, модерация и сценарии, которые удерживают игроков.",
  },
  {
    icon: Store,
    title: "Магазин и платежи",
    text: "Интеграция Tebex, структура пакетов, выдача покупок, история платежей и понятная витрина.",
  },
  {
    icon: Bot,
    title: "Сайт и автоматизация",
    text: "Лендинг, личный кабинет, бот, авторизация, CRM-учет заявок и связка с Discord.",
  },
];

const successRules = [
  {
    icon: Trophy,
    title: "Не набор модов, а продукт",
    text: "Игрок платит за эмоцию, статус, удобство и принадлежность к городу. Поэтому проектируется весь путь: первый заход, whitelist, первые деньги, первые конфликты, первая покупка.",
  },
  {
    icon: ShieldCheck,
    title: "Монетизация без самострела",
    text: "Донат должен быть понятным и аккуратным: косметика, подписки, приоритет, роли, доступы и сервисные улучшения. Грубый pay-to-win убивает доверие и удержание.",
  },
  {
    icon: Gauge,
    title: "Стабильность важнее шума",
    text: "Оптимизация ресурсов, база, логи, перезапуски, нагрузка, защита и админ-панель продумываются до рекламы, чтобы старт не сгорел на первом онлайне.",
  },
];

const buildSteps = [
  "Разбираю идею, бюджет и целевую аудиторию",
  "Проектирую лор, фракции, экономику и донат",
  "Собираю ядро FiveM на ESX/QBCore или кастомной логике",
  "Подключаю Discord, сайт, Tebex, базу и админ-контур",
  "Тестирую баланс, нагрузку, выдачу покупок и сценарии",
  "Помогаю запустить город и план обновлений",
];

const techStack = [
  "Lua",
  "JavaScript",
  "SQL / MySQL",
  "txAdmin",
  "ESX",
  "QBCore",
  "FiveM",
  "Java 21",
  "Discord",
  "VDS / VPS",
];

const contactLinks = [
  {
    label: "+7 906 634-66-33",
    href: "tel:+79066346633",
    icon: Phone,
  },
  {
    label: "rp@prom-logic.ru",
    href: "mailto:rp@prom-logic.ru",
    icon: Mail,
  },
  {
    label: "Telegram",
    href: "https://t.me/Serge_CodeCrafter",
    icon: MessageCircle,
  },
];

export default function RpLandingPage() {
  return (
    <>
      <Head>
        <title>GTA 5 RP сервер под монетизацию - разработка под ключ</title>
        <meta
          name="description"
          content="Разработка GTA 5 RP серверов на FiveM, ESX и QBCore: экономика, фракции, донат, Tebex, Discord, сайт, хостинг, оптимизация и запуск комьюнити."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#070708" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href="https://rp.prom-logic.ru/" />
        <meta property="og:title" content="GTA 5 RP сервер под монетизацию" />
        <meta
          property="og:description"
          content="Соберу RP-сервер как прибыльный онлайн-проект: лор, экономика, донат, Discord, сайт, хостинг и техподдержка."
        />
        <meta property="og:url" content="https://rp.prom-logic.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rp.prom-logic.ru/hero-rp-city.png" />
      </Head>

      <main className="rp-site">
        <SiteHeader />
        <Hero />
        <FeaturesSection />
        <MoneySection />
        <VisualStory
          eyebrow="экономика как продукт"
          icon={WalletCards}
          image="/rp-economy-ops.png"
          alt="Неоновая иллюстрация экономики и донат-системы RP-сервера"
          title={
            <>
              Донат, jobs и бизнесы должны работать как <span className="text-lime">единая экономика</span>
            </>
          }
          text="Игроки покупают не просто предметы. Они покупают статус, удобство, принадлежность к городу и ощущение прогресса, поэтому монетизация проектируется вместе с правилами, профессиями и балансом."
          points={["Tebex и выдача покупок", "VIP, роли, кейсы и подписки", "Баланс валюты, jobs и бизнесов"]}
        />
        <PackagesSection />
        <ExploreSection />
        <ProductPrinciplesSection />
        <TestimonialsSection />
        <FaqSection />
        <PageNavigator />
        <ContactsSection />
        <SiteFooter />
      </main>
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <img className="hero__image" src="/hero-rp-city.png" alt="Пустынная GTA RP трасса с неоновым городом и серверной инфраструктурой" />
      <div className="hero__shade" />
      <div className="hero__grid" />

      <div className="shell hero__content">
        <div className="hero__layout">
          <div className="hero__copy">
            <div className="kicker">
              <Radar size={15} />
              GTA 5 RP server development
            </div>

            <h1>
              Создам <span className="text-cyan">GTA 5 RP</span> сервер
              <span className="text-pink"> под монетизацию</span>
            </h1>
            <p>
              Не “сборка скриптов”, а запуск игрового продукта: экономика, фракции, донат-витрина,
              Discord, сайт, хостинг, правила и roadmap роста комьюнити в дорогой Arizona/GTA-эстетике.
            </p>

            <div className="offer-strip">
              <span>ТЗ помогу составить</span>
              <span>от 90 000 ₽</span>
              <span>FiveM / ESX / QBCore</span>
            </div>

            <div className="hero__actions">
              <a className="btn btn--primary" href="#contacts">
                Заказать сервер
                <ArrowRight size={17} />
              </a>
              <a className="btn btn--ghost" href="tel:+79066346633">
                <Phone size={17} />
                Позвонить
              </a>
            </div>

            <div className="stats">
              {stats.map(([value, label]) => (
                <div className="stat" key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__side">
            <EconomyPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

function EconomyPanel() {
  return (
    <aside className="cockpit">
      <div className="cockpit__head">
        <div>
          <span>server economy</span>
          <strong>Monetization cockpit</strong>
        </div>
        <b>online-ready</b>
      </div>

      <div className="cockpit__rows">
        {[
          ["VIP / Priority", "подписки, очередь, роли", "92%"],
          ["Cases / Cosmetics", "кейсы, скины, кастом", "78%"],
          ["Whitelist / Jobs", "профессии, доступы, заявки", "86%"],
        ].map(([name, desc, value]) => (
          <div className="cockpit__row" key={name}>
            <div>
              <strong>{name}</strong>
              <span>{desc}</span>
            </div>
            <em>{value}</em>
            <i>
              <span style={{ width: value }} />
            </i>
          </div>
        ))}
      </div>

      <div className="cockpit__chips">
        {[
          [Banknote, "донат"],
          [DatabaseZap, "SQL"],
          [TerminalSquare, "txAdmin"],
        ].map(([Icon, label]) => (
          <div key={label as string}>
            <Icon size={22} />
            <span>{label as string}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="section section--raised">
      <div className="shell section__grid">
        <div>
          <SectionKicker icon={Gamepad2}>Что вы получаете</SectionKicker>
          <h2>
            Не просто сервер. <span className="text-lime">Машина для комьюнити</span> и дохода.
          </h2>
          <p className="lead">
            Успешный RP-проект держится на трех вещах: игрокам интересно жить в мире, администрации удобно
            управлять городом, монетизация встроена аккуратно и прозрачно.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MoneySection() {
  return (
    <section id="money" className="section section--dark">
      <div className="shell">
        <div className="section__intro">
          <SectionKicker icon={Store}>Удачный опыт рынка</SectionKicker>
          <h2>
            Монетизация вокруг <span className="text-pink">ценности</span>, а не хаоса.
          </h2>
        </div>

        <div className="rule-grid">
          {successRules.map((item) => (
            <RuleCard key={item.title} {...item} />
          ))}
        </div>

        <div className="roadmap">
          <div>
            <span>roadmap</span>
            <h3>Путь от идеи до запуска</h3>
            <p>
              Я уже проходил типовые ошибки игровых проектов, поэтому сразу собираю короткий путь: от идеи
              и ТЗ до production-запуска и обновлений.
            </p>
          </div>
          <div className="roadmap__steps">
            {buildSteps.map((step, index) => (
              <div key={step}>
                <b>{index + 1}</b>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  return (
    <section id="packages" className="section section--raised">
      <div className="shell">
        <div className="packages-head">
          <div>
            <SectionKicker icon={Zap}>Форматы работы</SectionKicker>
            <h2>
              Проект под бюджет, но с <span className="text-cyan">серьезной экономикой</span>.
            </h2>
          </div>
          <p>
            На сайте уже собрана продуктовая линейка из трех концепций: стартовый запуск, средний
            сервер под рост и флагманский RP-проект под сильную монетизацию.
          </p>
        </div>

        <div className="package-grid">
          {packages.map((item) => (
            <PackageCard key={item.name} {...item} />
          ))}
        </div>

        <div className="stack">
          {techStack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExploreSection() {
  const pages = [
    {
      href: "/stages",
      title: "Этапы разработки",
      text: "Путь от идеи и ТЗ до FiveM-ядра, сайта, доната, тестов и запуска.",
    },
    {
      href: "/portfolio",
      title: "Портфолио проектов",
      text: "Примеры игровых серверов и логики: GTA 5 RP, Minecraft, Rust, PvP-арены.",
    },
    {
      href: "/problems",
      title: "Проблемы RP-серверов",
      text: "Экономика, лаги, донат, модерация, удержание и типовые ошибки запуска.",
    },
    {
      href: "/monetization",
      title: "Монетизация",
      text: "VIP, подписки, кейсы, косметика, Tebex, Discord-роли и баланс доната.",
    },
    {
      href: "/support",
      title: "Поддержка",
      text: "Развитие сервера после запуска: обновления, оптимизация, новые механики.",
    },
  ];

  return (
    <section className="section section--dark">
      <div className="shell">
        <div className="section__intro">
          <SectionKicker icon={Gamepad2}>разделы сайта</SectionKicker>
          <h2>
            Больше деталей для тех, кто запускает <span className="text-cyan">серьезный RP-проект</span>
          </h2>
        </div>
        <div className="explore-grid">
          {pages.map((page) => (
            <Link className="explore-card" href={page.href} key={page.href}>
              <h3>{page.title}</h3>
              <p>{page.text}</p>
              <span>
                Открыть
                <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductPrinciplesSection() {
  return (
    <section className="section section--raised">
      <div className="shell">
        <div className="section__intro">
          <SectionKicker icon={ShieldCheck}>что делает сервер сильным</SectionKicker>
          <h2>
            Хороший RP-сервер продаёт <span className="text-pink">ощущение живого города</span>
          </h2>
          <p>
            Визуал важен, но игроки остаются там, где есть цели, правила, прогресс, понятная администрация
            и честная монетизация. Поэтому проект собирается вокруг опыта игрока и удобства владельца.
          </p>
        </div>
        <div className="insight-grid">
          {productPrinciples.map((item) => (
            <article className="insight-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="owner-questions">
          {ownerQuestions.map((item) => (
            <article key={item.title}>
              <b>{item.title}</b>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section section--dark">
      <div className="shell">
        <div className="section__intro">
          <SectionKicker icon={MessageCircle}>SEO / вопросы владельца</SectionKicker>
          <h2>
            Частые вопросы перед заказом <span className="text-cyan">RP-сервера</span>
          </h2>
        </div>
        <div className="faq-grid">
          {seoFaq.map((item) => (
            <article className="faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Владелец RP-проекта",
      role: "FiveM / QBCore",
      text: "Наконец-то сервер собирался не как куча скриптов, а как понятный проект: экономика, роли, Discord, донат и запуск. Стало ясно, что делать до рекламы, а что после.",
    },
    {
      name: "Администратор игрового комьюнити",
      role: "Whitelist / Discord",
      text: "Сильно помогла структура правил и заявок. Игроки стали проходить понятный путь, а у модераторов появились роли, порядок и меньше ручного хаоса.",
    },
    {
      name: "Заказчик сервера под монетизацию",
      role: "Донат / сайт / VPS",
      text: "Понравилось, что сразу проговорили ограничения доната и баланс. Не просто поставили магазин, а объяснили, какие пакеты будут продаваться и не испортят RP.",
    },
  ];

  return (
    <section className="section section--raised">
      <div className="shell">
        <div className="section__intro">
          <SectionKicker icon={Trophy}>отзывы</SectionKicker>
          <h2>
            Клиенты ценят <span className="text-lime">понятный запуск</span>, а не магию из скриптов
          </h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.name}>
              <div className="testimonial-card__stars">★★★★★</div>
              <p>{item.text}</p>
              <div>
                <b>{item.name}</b>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactsSection() {
  return (
    <section id="contacts" className="section contacts">
      <div className="shell contacts__grid">
        <div>
          <SectionKicker icon={CheckCircle2}>Готовы запускать город?</SectionKicker>
          <h2>
            Напишите идею. Сделаем сервер, в который <span className="text-lime">хочется возвращаться</span>.
          </h2>

          <div className="contact-links">
            {contactLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span>
                  <item.icon size={20} />
                  {item.label}
                </span>
                <ArrowRight size={16} />
              </a>
            ))}
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

function LeadForm() {
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

      <Field label="Ориентир по бюджету" value={budget} onChange={setBudget} placeholder="90 000 ₽ / 175 000 ₽ / 350 000 ₽" />

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

function SectionKicker({ children, icon: Icon }: { children: React.ReactNode; icon: LucideIcon }) {
  return (
    <div className="section-kicker">
      <Icon size={15} />
      {children}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <article className="feature-card">
      <Icon size={29} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function RuleCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <article className="rule-card">
      <Icon size={32} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function PackageCard({
  icon: Icon,
  name,
  tier,
  price,
  text,
  forWhom,
  result,
  options,
}: {
  icon: LucideIcon;
  name: string;
  tier: string;
  price: string;
  text: string;
  forWhom: string;
  result: string;
  options: readonly string[];
}) {
  return (
    <article className="package-card">
      <span className="package-card__eyebrow">{tier}</span>
      <Icon size={32} />
      <h3>{name}</h3>
      <strong>{price}</strong>
      <p>{text}</p>
      <div className="package-card__meta">
        <span>Для кого</span>
        <b>{forWhom}</b>
      </div>
      <ul className="package-card__list">
        {options.map((option) => (
          <li key={option}>{option}</li>
        ))}
      </ul>
      <div className="package-card__result">
        <span>Результат</span>
        <p>{result}</p>
      </div>
      <a href="#contacts">
        Обсудить
        <ArrowRight size={16} />
      </a>
    </article>
  );
}
