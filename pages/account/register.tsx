import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { ArrowRight, BadgeCheck, UserPlus } from "lucide-react";
import { PageShell, SectionKicker } from "@/components/SiteChrome";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, telegramUsername, password }),
    });
    const data = await response.json();

    if (!response.ok || !data.ok) {
      setLoading(false);
      setError(errorText(data.error));
      return;
    }

    await router.push("/account");
  }

  return (
    <>
      <Head>
        <title>Регистрация в личном кабинете RP Forge</title>
        <meta name="description" content="Регистрация заказчика GTA 5 RP сервера в личном кабинете." />
      </Head>

      <PageShell className="account-shell">
        <main className="account-auth">
          <section className="account-auth__card">
            <SectionKicker icon={UserPlus}>регистрация</SectionKicker>
            <h1>Создать аккаунт</h1>
            <p>Аккаунт нужен, чтобы оформить заказ, видеть статусы разработки и писать в поддержку по серверу.</p>

            <form className="account-form" onSubmit={onSubmit}>
              <div className="account-form__grid">
                <label>
                  <span>E-mail</span>
                  <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email@example.ru" type="email" />
                </label>
                <label>
                  <span>Логин</span>
                  <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="rp-owner" />
                </label>
              </div>
              <label>
                <span>Telegram</span>
                <input value={telegramUsername} onChange={(event) => setTelegramUsername(event.target.value)} placeholder="@username" />
              </label>
              <label>
                <span>Пароль</span>
                <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Минимум 8 символов" type="password" />
              </label>
              <button disabled={loading} type="submit">
                {loading ? "Создаю..." : "Зарегистрироваться"}
                <ArrowRight size={16} />
              </button>
              {error ? <div className="account-alert">{error}</div> : null}
            </form>

            <div className="account-auth__footer">
              <span>Уже есть аккаунт?</span>
              <Link href="/account/login">Войти</Link>
            </div>
          </section>

          <aside className="account-auth__side">
            <BadgeCheck size={30} />
            <h2>После регистрации</h2>
            <p>Вы сможете выбрать формат сервера, оставить вводные, открыть тикет и отслеживать статус запуска.</p>
          </aside>
        </main>
      </PageShell>
    </>
  );
}

function errorText(error?: string) {
  if (error === "weak_password") return "Пароль должен быть не короче 8 символов.";
  if (error === "user_exists") return "Пользователь с таким e-mail или логином уже существует.";
  if (error === "login_required") return "Укажите e-mail или логин.";
  return "Не удалось создать аккаунт. Попробуйте еще раз.";
}
