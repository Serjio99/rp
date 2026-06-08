import { BriefcaseBusiness, Trophy } from "lucide-react";
import { ContactSection, PageHero, PageShell, SectionKicker, SeoHead } from "@/components/SiteChrome";
import { portfolioCases } from "@/data/siteContent";

export default function PortfolioPage() {
  return (
    <>
      <SeoHead
        title="Портфолио игровых серверов: GTA 5 RP, Minecraft, Rust"
        description="Примеры реализованных игровых серверов и задач: RP-город на FiveM, Minecraft-проект с донатом, Rust-сервер, PvP-арена и кастомные механики."
        path="/portfolio"
      />
      <PageShell>
        <PageHero
          eyebrow="портфолио"
          icon={BriefcaseBusiness}
          title={
            <>
              Реализованные <span className="text-pink">игровые проекты</span> и серверная логика
            </>
          }
          description="Опыт в GTA 5 RP, Minecraft, Rust и кастомных игровых режимах помогает не наступать на типовые ошибки новичков."
        />

        <section className="section">
          <div className="shell portfolio-grid">
            {portfolioCases.map((item) => (
              <article className="portfolio-card" key={item.title}>
                <div className="portfolio-card__type">{item.type}</div>
                <h2>{item.title}</h2>
                <p>{item.result}</p>
                <div className="portfolio-card__stack">{item.stack}</div>
                <p>{item.details}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--raised">
          <div className="shell seo-panel">
            <SectionKicker icon={Trophy}>опыт</SectionKicker>
            <h2>
              Портфолио важно, но ещё важнее <span className="text-cyan">понимание игрового продукта</span>
            </h2>
            <p>
              Игровой сервер под монетизацию нельзя оценивать только по количеству установленных ресурсов.
              Важны удержание игроков, экономика, порядок обновлений, донат, комьюнити, модерация и техническая
              стабильность. Опыт разных игровых жанров помогает видеть сервер шире: как систему, где игроки,
              администраторы и владелец проекта должны получать понятную ценность.
            </p>
            <p>
              При разработке GTA 5 RP сервера особенно важно заранее понять, какие сценарии будут приносить
              онлайн: фракции, бизнесы, конфликты, ивенты, прогресс, редкие предметы, социальные статусы и
              внутренние цели. Именно эти элементы превращают сервер в живой город.
            </p>
          </div>
        </section>

        <ContactSection
          title="Хотите проект с похожей логикой?"
          text="Можно взять один из проверенных форматов и адаптировать его под вашу идею, бюджет и аудиторию."
        />
      </PageShell>
    </>
  );
}
