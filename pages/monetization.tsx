import { Banknote, Store } from "lucide-react";
import { ContactSection, PageHero, PageShell, SectionKicker, SeoHead } from "@/components/SiteChrome";
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
                <item.icon size={32} />
                <h3>{item.name}</h3>
                <strong>{item.price}</strong>
                <p>{item.text}</p>
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
          </div>
        </section>

        <ContactSection
          title="Хотите продуманную донат-систему?"
          text="Разберу вашу идею и предложу структуру монетизации, которая выглядит честно для игроков и понятно для владельца сервера."
        />
      </PageShell>
    </>
  );
}
