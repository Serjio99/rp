import { Gauge, LifeBuoy, ServerCog, Wrench } from "lucide-react";
import { ContactSection, PageHero, PageShell, SeoHead } from "@/components/SiteChrome";

const supportItems = [
  {
    icon: ServerCog,
    title: "Техническая поддержка сервера",
    text: "Обновления ресурсов, исправление ошибок, контроль логов, работа с базой данных, txAdmin и настройками VDS/VPS.",
  },
  {
    icon: Gauge,
    title: "Оптимизация и нагрузка",
    text: "Поиск тяжелых скриптов, снижение лагов, проверка SQL-запросов, порядок рестартов и подготовка к росту онлайна.",
  },
  {
    icon: Wrench,
    title: "Развитие механик",
    text: "Добавление профессий, фракций, ивентов, бизнесов, интерфейсов, новых донат-пакетов и сезонных обновлений.",
  },
];

export default function SupportPage() {
  return (
    <>
      <SeoHead
        title="Поддержка и развитие GTA 5 RP сервера после запуска"
        description="Поддержка RP-сервера после запуска: исправление багов, оптимизация FiveM, обновления, развитие экономики, доната, фракций и комьюнити."
        path="/support"
      />
      <PageShell>
        <PageHero
          eyebrow="поддержка"
          icon={LifeBuoy}
          title={
            <>
              Запуск - это старт. Дальше нужно <span className="text-cyan">развивать сервер</span>
            </>
          }
          description="RP-проект живёт обновлениями, событиями, исправлениями и вниманием к игрокам. Без поддержки даже хороший старт быстро выгорает."
        />

        <section className="section">
          <div className="shell feature-grid">
            {supportItems.map((item) => (
              <article className="feature-card" key={item.title}>
                <item.icon size={30} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--dark">
          <div className="shell seo-panel">
            <h2>
              Поддержка GTA 5 RP сервера помогает <span className="text-lime">удерживать онлайн</span>
            </h2>
            <p>
              После запуска серверу нужны регулярные обновления, работа с багами, улучшение экономики,
              контроль доната, новые события, настройка Discord-процессов и анализ обратной связи игроков.
              Поддержка превращает разовый запуск в долгосрочный игровой проект.
            </p>
            <p>
              Для владельца сервера это особенно важно: реклама может дать первый онлайн, но удержание зависит
              от стабильности, модерации, прозрачных правил, быстрого исправления проблем и ощущения, что город
              развивается.
            </p>
          </div>
        </section>

        <ContactSection
          title="Нужна поддержка после запуска?"
          text="Можно договориться о развитии сервера, регулярных обновлениях, исправлениях, оптимизации и новых механиках."
        />
      </PageShell>
    </>
  );
}
