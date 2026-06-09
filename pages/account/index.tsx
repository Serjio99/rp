import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, CircleHelp, ClipboardList, LogOut, ServerCog, ShieldCheck, Sparkles } from "lucide-react";
import { packageById, serverPackages } from "@/lib/catalog";
import { PageShell, SectionKicker } from "@/components/SiteChrome";

type User = {
  displayName: string;
  email?: string | null;
  username?: string | null;
  telegramUsername?: string | null;
};

type Order = {
  id: number;
  serverType: string;
  title: string;
  budget?: string | null;
  description?: string | null;
  status: string;
  statusLabel: string;
  createdAt: string;
};

type Ticket = {
  id: number;
  orderId?: number | null;
  orderTitle?: string | null;
  subject: string;
  message: string;
  status: string;
  priority: string;
  createdAt: string;
};

type ServerPackageId = (typeof serverPackages)[number]["id"];

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverType, setServerType] = useState<ServerPackageId>(serverPackages[0].id);
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketOrderId, setTicketOrderId] = useState("");
  const [notice, setNotice] = useState("");

  async function loadData() {
    const me = await fetch("/api/auth/me");
    if (me.status === 401) {
      await router.push("/account/login");
      return;
    }

    const meData = await me.json();
    const [ordersResponse, supportResponse] = await Promise.all([fetch("/api/orders"), fetch("/api/support")]);
    const ordersData = await ordersResponse.json();
    const supportData = await supportResponse.json();

    setUser(meData.user);
    setOrders(ordersData.orders || []);
    setTickets(supportData.tickets || []);
    setLoading(false);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadData();
    }, 0);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedPackage = useMemo(() => packageById(serverType), [serverType]);

  async function createOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serverType, budget, description }),
    });
    const data = await response.json();
    if (response.ok && data.ok) {
      setOrders((current) => [data.order, ...current]);
      setBudget("");
      setDescription("");
      setNotice("Заказ создан. Статус уже доступен в кабинете.");
    } else {
      setNotice("Не удалось создать заказ. Проверьте данные.");
    }
  }

  async function createTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const response = await fetch("/api/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: ticketSubject, message: ticketMessage, orderId: ticketOrderId }),
    });
    const data = await response.json();
    if (response.ok && data.ok) {
      setTickets((current) => [data.ticket, ...current]);
      setTicketSubject("");
      setTicketMessage("");
      setTicketOrderId("");
      setNotice("Обращение отправлено в техническую поддержку.");
    } else {
      setNotice("Не удалось отправить обращение.");
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    await router.push("/account/login");
  }

  return (
    <>
      <Head>
        <title>Личный кабинет заказчика RP Forge</title>
        <meta name="description" content="Личный кабинет заказчика GTA 5 RP сервера: заказ, статусы, поддержка и документы проекта." />
      </Head>

      <PageShell className="account-shell">
        <main className="account-dashboard shell">
          <section className="account-dashboard__hero">
            <div>
              <SectionKicker icon={ShieldCheck}>личный кабинет</SectionKicker>
              <h1>{loading ? "Загрузка кабинета" : `Здравствуйте, ${user?.displayName || "заказчик"}`}</h1>
              <p>Здесь можно заказать игровой сервер, отслеживать статусы разработки и держать поддержку в одном месте.</p>
            </div>
            <button className="account-link-button" onClick={logout} type="button">
              <LogOut size={16} />
              Выйти
            </button>
          </section>

          {notice ? <div className="account-notice">{notice}</div> : null}

          <section className="account-grid">
            <article className="account-panel account-panel--wide">
              <div className="account-panel__head">
                <SectionKicker icon={ServerCog}>заказать игровой сервер</SectionKicker>
                <h2>Выберите формат запуска</h2>
              </div>

              <div className="account-package-grid">
                {serverPackages.map((item) => (
                  <button
                    className={item.id === serverType ? "account-package is-selected" : "account-package"}
                    key={item.id}
                    onClick={() => setServerType(item.id)}
                    type="button"
                  >
                    <strong>{item.title}</strong>
                    <span>{item.price}</span>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>

              <form className="account-form account-form--inline" onSubmit={createOrder}>
                <div className="account-form__grid">
                  <label>
                    <span>Формат</span>
                    <input readOnly value={`${selectedPackage.title} · ${selectedPackage.price}`} />
                  </label>
                  <label>
                    <span>Бюджет</span>
                    <input value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="Например: 150 000 ₽" />
                  </label>
                </div>
                <label>
                  <span>Что важно в сервере</span>
                  <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Фракции, донат, whitelist, сайт, Discord, сроки запуска..." />
                </label>
                <button type="submit">
                  Создать заказ
                  <ArrowRight size={16} />
                </button>
              </form>
            </article>

            <article className="account-panel">
              <div className="account-panel__head">
                <SectionKicker icon={ClipboardList}>статусы</SectionKicker>
                <h2>Ваши заказы</h2>
              </div>
              <div className="account-list">
                {orders.length ? (
                  orders.map((order) => (
                    <div className="account-list__item" key={order.id}>
                      <strong>{order.title}</strong>
                      <span>{order.statusLabel}</span>
                      <p>{order.description || "Описание проекта можно уточнить через поддержку."}</p>
                    </div>
                  ))
                ) : (
                  <p className="account-empty">Пока нет заказов. Выберите формат сервера слева.</p>
                )}
              </div>
            </article>
          </section>

          <section className="account-grid">
            <article className="account-panel">
              <div className="account-panel__head">
                <SectionKicker icon={CircleHelp}>техническая поддержка</SectionKicker>
                <h2>Обращение по серверу</h2>
              </div>
              <form className="account-form" onSubmit={createTicket}>
                <label>
                  <span>Заказ</span>
                  <select value={ticketOrderId} onChange={(event) => setTicketOrderId(event.target.value)}>
                    <option value="">Без привязки к заказу</option>
                    {orders.map((order) => (
                      <option key={order.id} value={order.id}>
                        #{order.id} · {order.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Тема</span>
                  <input value={ticketSubject} onChange={(event) => setTicketSubject(event.target.value)} placeholder="Например: нужен Discord whitelist" />
                </label>
                <label>
                  <span>Сообщение</span>
                  <textarea value={ticketMessage} onChange={(event) => setTicketMessage(event.target.value)} placeholder="Опишите вопрос, проблему или идею для обновления сервера." />
                </label>
                <button type="submit">
                  Отправить в поддержку
                  <ArrowRight size={16} />
                </button>
              </form>
            </article>

            <article className="account-panel">
              <div className="account-panel__head">
                <SectionKicker icon={Sparkles}>центр проекта</SectionKicker>
                <h2>Следующие шаги</h2>
              </div>
              <div className="account-checklist">
                <div>
                  <b>1</b>
                  <span>Описать идею города и аудиторию</span>
                </div>
                <div>
                  <b>2</b>
                  <span>Выбрать формат экономики и доната</span>
                </div>
                <div>
                  <b>3</b>
                  <span>Подготовить Discord, правила и роли</span>
                </div>
                <div>
                  <b>4</b>
                  <span>Запустить тест, правки и production</span>
                </div>
              </div>

              <div className="account-list account-list--compact">
                {tickets.length ? (
                  tickets.map((ticket) => (
                    <div className="account-list__item" key={ticket.id}>
                      <strong>{ticket.subject}</strong>
                      <span>{ticket.status === "open" ? "Открыто" : ticket.status}</span>
                      <p>{ticket.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="account-empty">Обращений пока нет.</p>
                )}
              </div>
            </article>
          </section>
        </main>
      </PageShell>
    </>
  );
}
