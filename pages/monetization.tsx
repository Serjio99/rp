import { Banknote, Store } from "lucide-react";
import { ContactSection, PageHero, PageNavigator, PageShell, SectionKicker, SeoHead, VisualStory } from "@/components/SiteChrome";
import { monetizationBlocks, packages, seoTexts } from "@/data/siteContent";

export default function MonetizationPage() {
  return (
    <>
      <SeoHead
        title="Монетизация GTA 5 RP сервера: донат, VIP, кейсы, Tebex"
        description="Как спроектировать монетизацию GTA 5 RP сервера: донат-витрина, VIP, подписки, кейсы, косметика, приоритет, Discord-роли и баланс экономики."
        path="/monetization"
      />
      <PageShell>
        <PageHero
          eyebrow="монетизация"
          icon={Banknote}
          title={
            <>
              Донат, который <span className="text-lime">зарабатывает</span>, но не убивает RP
            </>
          }
          description="Правильная монетизация продаёт статус, удобство и участие в проекте, а не ломает доверие игроков."
        />

        <VisualStory
          eyebrow="донат-витрина"
          icon={Store}
          image="/rp-economy-ops.png"
          alt="Иллюстрация монетизации и экономики GTA RP сервера"
          title={
            <>
              Монетизация начинается не с кнопки оплаты, а с <span className="text-pink">ценности для игрока</span>
            </>
          }
          text="Витрина должна объяснять, что покупает игрок, как это выдается, почему это честно и как покупка вписывается в жизнь RP-города."
          points={["Tebex как платежный контур", "Пакеты без грубого pay-to-win", "Авто-выдача и история покупок"]}
          reverse
        />

        <section className="section">
          <div className="shell feature-grid">
            {monetizationBlocks.map((block) => (
              <article className="feature-card" key={block.title}>
                <block.icon size={30} />
                <h3>{block.title}</h3>
                <p>{block.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--raised">
          <div className="shell package-grid">
            {packages.map((item) => (
              <article className="package-card" key={item.name}>
                <span className="package-card__eyebrow">{item.tier}</span>
                <item.icon size={32} />
                <h3>{item.name}</h3>
                <strong>{item.price}</strong>
                <p>{item.text}</p>
                <div className="package-card__meta">
                  <span>Для кого</span>
                  <b>{item.forWhom}</b>
                </div>
                <ul className="package-card__list">
                  {item.options.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
                <div className="package-card__result">
                  <span>Результат</span>
                  <p>{item.result}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--dark">
          <div className="shell seo-panel">
            <SectionKicker icon={Store}>SEO / донат</SectionKicker>
            <h2>
              Донат-пакеты должны быть частью <span className="text-cyan">экономики RP-города</span>
            </h2>
            <p>{seoTexts.monetization}</p>
            <p>
              Для GTA 5 RP сервера можно проектировать разные уровни монетизации: стартовые наборы, VIP-статусы,
              приоритет в очереди, косметику, кастомные номера, роли Discord, доступ к событиям, сезонные
              наборы и кейсы. Но каждый пакет нужно проверять на баланс, иначе краткосрочная прибыль испортит
              онлайн и репутацию проекта.
            </p>
            <p>
              Важно заранее продумать refund-логику, выдачу покупок, роли Discord, ограничения привилегий,
              сезонные предложения и то, как донат будет выглядеть для обычного игрока, который не платит.
              Это напрямую влияет на доверие к проекту.
            </p>
          </div>
        </section>

        <PageNavigator />

        <ContactSection
          title="Хотите продуманную донат-систему?"
          text="Разберу вашу идею и предложу структуру монетизации, которая выглядит честно для игроков и понятно для владельца сервера."
        />
      </PageShell>
    </>
  );
}
