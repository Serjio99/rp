import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, LockKeyhole, Mail, Send } from "lucide-react";
import { PageShell, SectionKicker } from "@/components/SiteChrome";

type AuthStatus = "idle" | "loading" | "error";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    const data = await response.json();

    if (!response.ok || !data.ok) {
      setStatus("error");
      setError("Проверьте логин и пароль.");
      return;
    }

    await router.push("/account");
  }

  return (
    <>
      <Head>
        <title>Вход в личный кабинет RP Forge</title>
        <meta name="description" content="Вход в личный кабинет заказчика GTA 5 RP сервера." />
      </Head>

      <PageShell className="account-shell">
        <main className="account-auth">
          <section className="account-auth__card">
            <SectionKicker icon={LockKeyhole}>личный кабинет</SectionKicker>
            <h1>Вход в кабинет</h1>
            <p>Авторизуйтесь по e-mail, логину или Telegram, чтобы заказать сервер и видеть статус работ.</p>

            <form className="account-form" onSubmit={onSubmit}>
              <label>
                <span>E-mail, логин или Telegram</span>
                <input value={login} onChange={(event) => setLogin(event.target.value)} placeholder="rp-owner или email@example.ru" />
              </label>
              <label>
                <span>Пароль</span>
                <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Ваш пароль" type="password" />
              </label>
              <button disabled={status === "loading"} type="submit">
                {status === "loading" ? "Вхожу..." : "Войти"}
                <ArrowRight size={16} />
              </button>
              {status === "error" ? <div className="account-alert">{error}</div> : null}
            </form>

            <TelegramLogin />

            <div className="account-auth__footer">
              <span>Еще нет аккаунта?</span>
              <Link href="/account/register">Зарегистрироваться</Link>
            </div>
          </section>

          <aside className="account-auth__side">
            <Mail size={30} />
            <h2>Что будет внутри</h2>
            <p>Заказ сервера, статусы разработки, поддержка, история обращений и быстрый старт проекта.</p>
          </aside>
        </main>
      </PageShell>
    </>
  );
}

function TelegramLogin() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!botUsername || !containerRef.current) return;

    const windowWithTelegram = window as Window & {
      onRpTelegramAuth?: (user: Record<string, string | number>) => void;
    };

    windowWithTelegram.onRpTelegramAuth = async (user) => {
      setMessage("Проверяю Telegram...");
      const response = await fetch("/api/auth/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setMessage("Telegram-вход не прошел. Проверьте настройки бота.");
        return;
      }
      await router.push("/account");
    };

    containerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "4");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "onRpTelegramAuth(user)");
    containerRef.current.appendChild(script);
  }, [botUsername, router]);

  return (
    <div className="telegram-auth">
      <div className="telegram-auth__head">
        <Send size={17} />
        <span>Telegram вход</span>
      </div>
      {botUsername ? <div ref={containerRef} /> : <p>Будет доступен после настройки Telegram-бота в env.</p>}
      {message ? <p>{message}</p> : null}
    </div>
  );
}
